const fs = require("fs");
const path = require("path");
const productsFilePath = path.join(__dirname, "../data/productsDatabase.json");
const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const { validationResult } = require('express-validator');
const db = require('../../database/models');

const controller = {

    list: async (req, res) => {
        try {
            let products = await db.Products.findAll()
            return res.render('products', { products: products, toThousand: toThousand })

        } catch(e) {
            console.log();
        }
    },

    allProducts: async (req, res) => {
        try {
            let products = await db.Products.findAll()
            return res.render('products', { products: products, toThousand: toThousand })

        } catch(e) {
            console.log();
        }
    },

    listByCategory: (req, res) => {
        let prodBuscados = [];
        for (let i = 0; i < products.length; i++) {
            if (products[i].category == req.params.categoria) {
                prodBuscados.push(products[i])
            }
        }
        res.render('products', { products: prodBuscados, toThousand: toThousand })
    },

    searchProducts: (req, res) => {
        let buscado = req.query.searchBar;
        let userResults = [];
        for (let i=0; i<products.length; i++) {
            if (products[i].name.toLowerCase().includes(buscado.toLowerCase())) {
                userResults.push(products[i]);
            }
        }
        res.render('products', { products: userResults, toThousand: toThousand })
    },

    productHistory: (req, res) => {
        if ( req.session.userSignUp == false ) {
            return res.render('productHistory', { 
                toThousand: toThousand,
                errors: {
                    msg: "Para ver tu historial de compra debes iniciar sesión."
                 }
            });
        } else {
            return res.render('productHistory', { toThousand: toThousand })
        }
    },

    productCart: (req, res) => {
        if ( req.session.userSignUp == false ) {
            return res.render('productCart', {
                errors: {
                    msg: "Para comprar primero debes iniciar sesión."
                }
            })
        } else {
            return res.render('productCart')
        }
    },

    productDetails: (req, res) => {
        let product = products.find((i) => i.id == req.params.idProducto);
        res.render('productDetail', { product: product })
    },

    createProduct: async (req, res) => {
        try {
            let categories = await db.Categories.findAll();
            let brands = await db.Brands.findAll();
            let lifestages = await db.Lifestages.findAll();

            return res.render('productCreate', {
                categories: categories,
                brands: brands,
                lifestages: lifestages,
            })

        } catch(e) {
            console.log(e);
        }
    },

    saveProduct: async (req, res) => {
        // console.log(req.file);
        try {
            let errors = validationResult(req);
            if ( !errors.isEmpty() ) {
                let categories = await db.Categories.findAll();
                let brands = await db.Brands.findAll();
                let lifestages = await db.Lifestages.findAll();
                console.log(req.body)
                return res.render('productCreate', {
                    errors: errors.mapped(),
                    old: req.body,
                    categories: categories,
                    brands: brands,
                    lifestages: lifestages,
                })

            } else {
                let product = await db.Products.create({
                    name: req.body.nameProd,
                    description: req.body.descriptionProd,
                    price: req.body.priceProd,
                    discount: req.body.discountProd,
                    image: req.session.nameProdImage,
                    brand_id: req.body.brandProd,
                    lifestage_id: req.body.lifestageProd
                });
    
                await db.product_category.create({
                    category_id: req.body.categoryProd,
                    product_id: product.id
                });
    
                return res.redirect('/products');
            }

        } catch(e) {
            console.log(e);
        }
    },

    editProduct: async (req, res) => {
        try {
            let product = await db.Products.findByPk(req.params.idProducto,{
                include: [{association: "categories"}]
            });

            req.body.nameProd = product.name;
            req.body.descriptionProd = product.description;
            req.body.priceProd = product.price;
            req.body.discountProd = product.discount;
            req.body.imageProd = product.image;
            req.body.brandProd = product.brand_id;
            req.body.categoryProd = product.categories[0].id
            req.body.lifestageProd = product.lifestage_id;
            req.session.nameProdImage = product.image;

            let categories = await db.Categories.findAll();
            let brands = await db.Brands.findAll();
            let lifestages = await db.Lifestages.findAll();

            return res.render('productEdit', { 
                product: product,
                old: req.body,
                categories: categories,
                brands: brands,
                lifestages: lifestages
            });
            
        } catch(e) {
            console.log(e);
        }
    },

    updateProduct: async (req, res) => {
        try {
            let errors = validationResult(req);

            if ( !errors.isEmpty() ) {
                let categories = await db.Categories.findAll();
                let brands = await db.Brands.findAll();
                let lifestages = await db.Lifestages.findAll();
                let product = await db.Products.findByPk(req.params.idProducto,{
                    include: [{association: "categories"}]
                });

                console.log('el req.body: ');
                console.log(req.body);
                return res.render('productEdit', {
                    errors: errors.mapped(),
                    old: req.body,
                    product: product,
                    categories: categories,
                    brands: brands,
                    lifestages: lifestages
                });
                
            } else {

                // actualiza el producto
                await db.Products.update({
                    name: req.body.nameProd,
                    description: req.body.descriptionProd,
                    price: req.body.priceProd,
                    discount: req.body.discountProd,
                    image: req.session.nameProdImage,
                    brand_id: req.body.brandProd,
                    lifestage_id: req.body.lifestageProd
                },{
                    where: { id: req.params.idProducto }
                });

                // actualiza la tabla pivot
                await db.product_category.update({
                    category_id: req.body.categoryProd
                },{
                    where: {
                        product_id: req.params.idProducto
                    }
                });

                return res.redirect('/products')
            }


        } catch(e) {
            console.log(e);
        }
    },

    deleteProduct: async (req, res) => {
        try {
            console.log("\nreq.params = "+req.params.idProducto+"\n");
            await db.Products.destroy({
                where: { id: req.params.idProducto }
            })
            return res.redirect('/products');

        } catch(e) {
            console.log(e);
        }
    }
}

module.exports = controller;