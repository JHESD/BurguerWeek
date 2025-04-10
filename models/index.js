const { Sequelize, DataTypes } = require("sequelize");
const dbConfig = require("../config/db.config");

const sequelize = new Sequelize({
  dialect: dbConfig.dialect,
  storage: dbConfig.storage
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Restaurante = require("./restaurante")(sequelize, DataTypes);
db.Hamburguesa = require("./hamburguesa")(sequelize, DataTypes);

const { Restaurante, Hamburguesa } = db;

Hamburguesa.belongsTo(Restaurante, { foreignKey: "restaurante_id" });
Restaurante.hasMany(Hamburguesa, { foreignKey: "restaurante_id" });
sequelize.query("PRAGMA foreign_keys = OFF;");

module.exports = db;