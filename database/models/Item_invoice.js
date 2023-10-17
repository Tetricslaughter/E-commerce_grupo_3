module.exports = (seuqelize, DataTypes) => {
    const ItemInvoice = seuqelize.define("Item_invoices",{
        id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
        invoice_id: { type: DataTypes.BIGINT, allowNull: false },
        product_id: { type: DataTypes.BIGINT, allowNull: false },
        unit_price: { type: DataTypes.DOUBLE(6,2), allowNull: false },
        quantity: { type: DataTypes.INTEGER(2), allowNull: false },
    },{
        tableName: "item_invoices",
        timestamps: false
    });

    ItemInvoice.associate = (models) => {
        ItemInvoice.belongsTo(models.Invoices, {
            as: "invoice",
            foreignKey: "invoice_id"
        })
        ItemInvoice.belongsTo(models.Products, {
            as: "product",
            foreignKey: "product_id"
        })
    }

    return ItemInvoice;
}