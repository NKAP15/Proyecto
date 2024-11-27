import Branch from "../models/Branch.js";
import Inventory from "../models/Inventory.js";
import Product from "../models/Product.js";
import Sale from "../models/Sale.js";
import PDFDocument from "pdfkit";


export const renderSalesForm = async (req, res) => {
  try {
    const branches = await Branch.find().lean(); // Todas las sucursales
    res.render("sales/new-sale", { branches });
  } catch (error) {
    res.status(500).send("Error al cargar el formulario de ventas");
    res.redirect("/sales");
  }
};

export const fetchInventoryByBranch = async (req, res) => {
  try {
    const { branchId } = req.params;

    // Buscar inventarios de la sucursal
    const inventoryItems = await Inventory.find({ branch: branchId })
      .populate("product")
      .lean();

    if (!inventoryItems.length) {
      return res.json([]);
    }

    res.json(inventoryItems.map((item) => ({
      ...item,
      classification: item.product.classification, // Añadir clasificación desde el producto
      name: item.product.name,
    })));
  } catch (error) {
    res.status(500).send("Error al cargar el inventario");
  }
};

export const createNewSale = async (req, res) => {
  try {
    const {
      branch,
      productId,
      quantity,
      customerName,
      patientName,
      doctorName,
      doctorPhone,
      doctorLicense,
    } = req.body;

    const inventoryItem = await Inventory.findOne({ product: productId, branch })
    .populate("product");

    if (!inventoryItem || inventoryItem.quantity < quantity) {
      req.flash("error_msg", "Producto no disponible o cantidad insuficiente");
      return res.redirect("/sales/new");
    }

    const total = quantity * inventoryItem.price;
    console.log("Clasificación del producto:", inventoryItem.product.classification);
    console.log("Datos de la venta:", {
      branch,
      product: productId,
      quantity,
      total,
      classification: inventoryItem.product.classification,
      customerName,
      date: new Date(),
      ...(inventoryItem.product.classification === "Medicamento controlado" && {
        patientName,
        doctorName,
        doctorPhone,
        doctorLicense,
      }),
    });
    // Crear la venta
    const newSale = new Sale({
      branch,
      product: productId,
      quantity,
      total,
      classification: inventoryItem.product.classification,
      customerName,
      ...(inventoryItem.product.classification === "Medicamento controlado" && {
        patientName,
        doctorName,
        doctorPhone,
        doctorLicense,
      }),
    });

    await newSale.save();

    // Actualizar inventario
    inventoryItem.quantity -= quantity;
    await inventoryItem.save();

    req.flash("success_msg", "Venta registrada exitosamente");
    res.redirect("/sales");
  } catch (error) {
    console.error("Error al guardar la venta:", error);
    res.status(500).send("Error al guardar la venta");
  }
};

export const renderSales = async (req, res) => {
  try {
    const sales = await Sale.find()
      .populate("branch")
      .populate("product")
      .lean();

    // Agregar el precio del inventario a cada venta
    for (let sale of sales) {
      // Obtener el inventario del producto y sucursal correspondientes
      const inventoryItem = await Inventory.findOne({
        product: sale.product._id,
        branch: sale.branch._id,
      });

      // Si se encuentra el inventario, agregar el precio al objeto de la venta
      if (inventoryItem) {
        sale.productPrice = inventoryItem.price;
      }
    }
    res.render("sales/all-sales", { sales });
  } catch (error) {
    res.status(500).send("Error al cargar las ventas");
  }
};


export const downloadSalePdf = async (req, res) => {
  try {
    const saleId = req.params.id;

    // Buscar la venta por ID
    const sale = await Sale.findById(saleId)
      .populate("branch")
      .populate("product")
      .lean();

    if (!sale) {
      return res.status(404).send("Venta no encontrada");
    }

    // Obtener el precio del inventario
    const inventoryItem = await Inventory.findOne({
      product: sale.product._id,
      branch: sale.branch._id,
    });

    const productPrice = inventoryItem ? inventoryItem.price : sale.product.price;

    // Crear un nuevo documento PDF
    const doc = new PDFDocument();

    // Configurar encabezados para la descarga
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=Venta_${sale.customerName.replace(/ /g, '_')}.pdf`
    );

    // Pasa el documento al flujo de respuesta
    doc.pipe(res);

    // **Encabezado**
    doc
      .fontSize(22)
      .fillColor("#4caf50")
      .text("Farmacia La Píldora", { align: "center" })
      .moveDown(1);

    // **Detalles de la venta**
    doc
      .fontSize(16)
      .fillColor("#000000")
      .text("Detalles de la Venta", { align: "center" })
      .moveDown();

    doc.text(`Fecha: ${new Date(sale.date).toLocaleDateString()}`);
    doc.moveDown();

    // **Tabla de productos**
    doc.fontSize(14).text(`${sale.quantity} x ${sale.product.name} - $${productPrice}`);
    doc.moveDown();

    // **Total**
    doc
      .fontSize(14)
      .text(`Total: $${sale.total}`)
      .moveDown();

    // **Información del cliente**
    doc
      .fontSize(14)
      .text(`Cliente: ${sale.customerName}`)
      .moveDown();

      doc.moveDown(4); 
      doc
        .fontSize(10)
        .fillColor("#aaaaaa")
        .text("Gracias por su compra.", { align: "center" });

    // Finalizar el PDF
    doc.end();
  } catch (error) {
    console.error("Error al generar el PDF:", error);
    res.status(500).send("Error al generar el PDF");
  }
};