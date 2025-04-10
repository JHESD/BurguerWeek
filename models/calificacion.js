// Calificacion.js
module.exports = (sequelize, DataTypes) => {
    const Calificacion = sequelize.define("Calificacion", {
        puntuacion: DataTypes.INTEGER,
        probado: DataTypes.BOOLEAN,
    });

    Calificacion.associate = models => {
        Calificacion.belongsTo(models.Hamburguesa);
    };

    return Calificacion;
};
