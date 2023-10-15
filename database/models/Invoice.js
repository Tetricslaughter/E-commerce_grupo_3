module.exports = (seuqelize, DataTypes) => {
    const Invoice = seuqelize.define("Invoices",{
        id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
        date_purchase: { type: DataTypes.DATE, allowNull: false }
    },{
        tableName: "invoices",
        timestamps: false
    });

    Invoice.associate = (models) => {
        Invoice.hasMany(models.Item_invoices, {
            as: "item_invoices",
            foreignKey: "invoice_id"
        })
        Invoice.belongsTo(models.Users, {
            as: "users",
            foreignKey: "user_id"
        })
    }

    return Invoice
}