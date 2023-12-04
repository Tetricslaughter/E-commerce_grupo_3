const db = require('../../../database/models');

const productsAPIController = {

    list: async (req, res) => {
        try {
            let products = await db.Products.findAll({
                include: [
                    { association: "categories" },
                    { association: "brand" }
                ]
            });
            let categories = await db.Categories.findAll();
            await Promise.all(categories.map(async (category) => {
                try {
                    let count = await db.product_category.count({
                        where: { category_id: category.id }
                    })
                    category.dataValues.count = count;
                } catch (error) {
                    console.log(error);
                }
            }));

            products = products.map(({ id, name, description, categories, brand } = product.dataValues) => {
                let arrayCategories = (categories || []).map(({ id, name }) => ({ id, name }));
                return {
                    id,
                    name,
                    description,
                    brand,
                    categories: arrayCategories,
                    detail: `http://localhost:3000/api/products/${id}`
                }
            });

            return res.status(200).json({
                status: 200,
                count: products.length,
                countByCategory: categories,
                products: products
            });
        } catch (error) {
            console.log(error);
            return res.status(400).json({
                status: 400,
                error: "error al obtener productos"
            })
        }
    },

    productDetails: async (req, res) => {
        try {
            let product = await db.Products.findOne({
                where: { id: req.params.id },
                include: [
                    { association: "brand" },
                    { association: "lifestage" },
                    { association: "categories" }
                ]
            });
            product = product.get({ plain: true });
            const { brand_id, lifestage_id, ...rest } = product;
            product = rest;
            product.categories = product.categories.map(category => {
                const { product_category, ...rest } = category;
                return category = rest;
            });

            return res.status(200).json({
                status: 200,
                product: product
            });
        } catch (error) {
            console.log(error);
            return res.status(400).json({
                status: 400,
                error: "error al obtener el producto"
            })
        }
    }

}

module.exports = productsAPIController;