import User from "../models/User.js";

export const createAdminUser = async () => {
  const userFound = await User.findOne({ email: "admin@localhost" });

  if (userFound) return;

  const newUser = new User({
    username: "Admin",
    email: "admin@localhost",
    password: await new User().encryptPassword("admin"),
    role: "admin",
  });

  newUser.password = await newUser.encryptPassword("admin");

  const admin = await newUser.save();

  console.log("Usuario de administrador creado", admin);
};
