module.exports = (seuqelize, DataTypes) => {
    const ItemInvoice = seuqelize.define("Item_invoices",{
        id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
        unit_price: { type: DataTypes.DOUBLE(6,2), allowNull: false },
        quantity: { type: DataTypes.INTEGER(2), allowNull: false },
    },{
        tableName: "item_invoices",
        timestamps: false
    });

    ItemInvoice.associate = (models) => {
        ItemInvoice.belongsTo(models.Invoices, {
            as: "invoices",
            foreignKey: "invoice_id"
        })
        ItemInvoice.belongsTo(models.Products, {
            as: "products",
            foreignKey: "product_id"
        })
    }

    return ItemInvoice;
}