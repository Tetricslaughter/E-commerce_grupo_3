module.exports = (sequelize, DataTypes) => {
    const Brand = sequelize.define("Brands", {
        id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
        name: { type: DataTypes.STRING(30), allowNull: false },
        country: { type: DataTypes.STRING(30), allowNull: false }
    },{
        tableName: "brands",
        timestamps: false
    })

    Brand.associate = (models) => {
        Brand.hasMany(models.Products, {
            as: "products",
            foreignKey: "brand_id"
        })
    }

    return Brand;
}