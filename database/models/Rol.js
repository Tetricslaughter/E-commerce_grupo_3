module.exports = (sequelize, DataTypes) => {
    const Rol = sequelize.define("Roles",{
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        description: { type: DataTypes.STRING(30), allowNull: false }
    },{
        tableName: "roles",
        timestamps: false
    })

    return Rol;
}