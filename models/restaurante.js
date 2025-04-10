module.exports = (sequelize, DataTypes) => {
    const Restaurante = sequelize.define("Restaurante", {
        nombre: {
        type: DataTypes.STRING,
        allowNull: false
        },
        logo: {
        type: DataTypes.STRING,
        allowNull: true
        }
    });
    return Restaurante;
};  