const express = require("express");
const app = express();
const path = require("path");
const session = require("express-session");
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");

const db = require("./models");
db.sequelize.sync({ alter: true })
  .then(() => {
    console.log("✅ Base de datos sincronizada correctamente.");
  })
  .catch((err) => {
    console.error("❌ Error al sincronizar la base de datos:", err);
  });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({
  secret: "burgerweeksecret",
  resave: false,
  saveUninitialized: true
}));

app.use(fileUpload());
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));
app.set("view engine", "ejs");

const adminRoutes = require("./routes/admin.routes");
const hamburguesaRoutes = require("./routes/hamburguesa.routes");
const indexRoutes = require("./routes/index");

app.use("/", indexRoutes);
app.use("/admin", adminRoutes);
app.use("/adminH", hamburguesaRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
