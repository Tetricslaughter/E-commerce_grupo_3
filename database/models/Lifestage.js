module.exports = (sequelize, DataTypes) => {
    const Lifestage = sequelize.define("Lifestages",{
        id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
        stagename: { type: DataTypes.STRING(30), allowNull: false }
    },{
        tableName: "lifestages",
        timestamps: false
    });

Lifestage.associate = (models) => {
    Lifestage.hasMany(models.Products, {
        as: "products",
        foreignKey: "lifestage_id"
    })
}

    return Lifestage;
}