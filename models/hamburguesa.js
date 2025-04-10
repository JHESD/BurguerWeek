module.exports = (sequelize, DataTypes) => {
    const Hamburguesa = sequelize.define("Hamburguesa", {
        nombre: DataTypes.STRING,
        descripcion: DataTypes.TEXT,
        precio: DataTypes.FLOAT,
        foto: DataTypes.STRING,
        restaurante_id: DataTypes.INTEGER
    });

    Hamburguesa.associate = models => {
        Hamburguesa.belongsTo(models.Restaurante, {
        foreignKey: 'restaurante_id',
        as: 'restaurante'
        });
        Hamburguesa.hasMany(models.Calificacion);
    };

    return Hamburguesa;
};  