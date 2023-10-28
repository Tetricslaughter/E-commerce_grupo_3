module.exports = (sequelize, DataTypes) => {
    const Invoice = sequelize.define("Invoices",{
        id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
        user_id: { type: DataTypes.BIGINT, allowNull: false },
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
            as: "user",
            foreignKey: "user_id"
        })
    }

    return Invoice;
}