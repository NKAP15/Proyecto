import express from "express";
import exphbs from "express-handlebars";
import Handlebars from "handlebars";
import session from "express-session";
import methodOverride from "method-override";
import flash from "connect-flash";
import MongoStore from "connect-mongo";
import passport from "passport";
import morgan from "morgan";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import dayjs from "dayjs";
import { MONGODB_URI, PORT } from "./config.js";
import { allowInsecurePrototypeAccess } from '@handlebars/allow-prototype-access';

import indexRoutes from "./routes/index.routes.js";
import productsRoutes from "./routes/products.routes.js";
import userRoutes from "./routes/auth.routes.js";
import providersRoutes from "./routes/providers.routes.js";
import branchRoutes from "./routes/branches.routes.js";
import ordersRoutes from "./routes/orders.routes.js";
import receptionsRoutes from './routes/receptions.routes.js';
import inventoryRoutes from "./routes/inventory.routes.js"; 
import salesRoutes from "./routes/sales.routes.js";
import offersRoutes from './routes/offers.routes.js';

import "./config/passport.js";

// Initializations
const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

// settings
app.set("port", PORT);
app.set("views", join(__dirname, "views"));

// config view engine
const hbs = exphbs.create({
  defaultLayout: "main",
  layoutsDir: join(app.get("views"), "layouts"),
  partialsDir: join(app.get("views"), "partials"),
  extname: ".hbs",
  handlebars: allowInsecurePrototypeAccess(Handlebars),

});
hbs.handlebars.registerHelper('formatDate', function(date) {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  return new Date(date).toLocaleDateString('es-MX', options);
});
hbs.handlebars.registerHelper('allowProtoPropertiesByDefault', true);
app.engine(".hbs", hbs.engine);
app.set("view engine", ".hbs");
hbs.handlebars.registerHelper('isExpiringSoon', function (expirationDate) {
  const sixMonthsFromNow = dayjs().add(6, 'month');
  return dayjs(expirationDate).isBefore(sixMonthsFromNow);
});


// middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
    store:MongoStore.create({ mongoUrl: MONGODB_URI }),
  
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(express.json());

// Global Variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  res.locals.user = req.user || null;
  next();
});

// routes
app.use(indexRoutes);
app.use(userRoutes);
app.use(productsRoutes);
app.use(providersRoutes);
app.use(receptionsRoutes);
app.use(branchRoutes);
app.use(ordersRoutes);
app.use(inventoryRoutes);
app.use(salesRoutes);
app.use(offersRoutes);



// static files
app.use(express.static(join(__dirname, "public")));

app.use((req, res, next) => {
  return res.status(404).render("404");
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.render("error", {
    error,
  });
});

export default app;