module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("Users",{
        id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
        username: { type: DataTypes.STRING(30), allowNull: false },
        name: { type: DataTypes.STRING(30), allowNull: false },
        surname: { type: DataTypes.STRING(30), allowNull: false },
        password: { type: DataTypes.STRING(100), allowNull: false },
        email: { type: DataTypes.STRING(35), allowNull: false, unique: true },
        birthday: { type: DataTypes.DATE, allowNull: false },
        avatar: { type: DataTypes.STRING(100), allowNull: false },
        active: { type: DataTypes.BOOLEAN, allowNull: false },
    },{
        tableName: "users",
        timestamps: false
    });

    User.associate = (models) => {
        User.belongsTo(models.Roles, {
            as: "roles",
            foreignKey: "rol_id"
        });
        User.hasMany(models.Invoices, {
            as: "invoices",
            foreignKey: "user_id"
        });
    };

    return User;
}