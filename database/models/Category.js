module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define("Categories", {
        id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
        name: { type: DataTypes.STRING(30), allowNull: false }
    },{
        tableName: "Categories",
        timestamps: false
    })

    Category.associate = (models) => {
        Category.belongsToMany(models.Products, {
            as: "products",
            through: "product_category",
            foreignKey: "category_id",
            otherKey: "product_id",
            timestamps: false
        })
    }

    return Category;
}