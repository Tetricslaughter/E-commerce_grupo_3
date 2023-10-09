module.exports = (sequelize, DataTypes) => {
    
    const Product = sequelize.define("Products",{
        id: {
            type: DataTypes.BIGINT, 
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING(80),
            allowNull: false
        },
        price: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        category: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        discount: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT
        }, 
        image: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        tableName: "products",
        timestamps: false
    })

    return Product;
}