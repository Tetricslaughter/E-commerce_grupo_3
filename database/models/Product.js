module.exports = (sequelize, DataTypes) => {
    
    const Product = sequelize.define("Products",{
        id: { type: DataTypes.BIGINT, autoIncrement: true,primaryKey: true },
        name: { type: DataTypes.STRING(50), allowNull: false },
        description: { type: DataTypes.TEXT, allowNull: true }, 
        price: { type: DataTypes.DOUBLE, allowNull: false },
        discount: { type: DataTypes.DOUBLE, defaultValue: 0 },
        image: { type: DataTypes.STRING(100), allowNull: false },
        brand_id: { type: DataTypes.BIGINT, allowNull: false },
        lifestage_id: { type: DataTypes.BIGINT, allowNull: false }
    },
    {
        tableName: "products",
        timestamps: false
    });

    Product.associate = (models) => {
        Product.belongsToMany(models.Categories, {
            as: "categories",
            through: "product_category",
            foreignKey: "product_id",
            otherKey: "category_id",
            timestamps: false
        });
        Product.belongsTo(models.Brands, {
            as: "brand",
            foreignKey: "brand_id"
        });
        Product.belongsTo(models.Lifestages, {
            as: "lifestage",
            foreignKey: "lifestage_id"
        });
    }

    return Product;
}