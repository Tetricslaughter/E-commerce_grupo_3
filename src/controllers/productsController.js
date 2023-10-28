const fs = require("fs");
const path = require("path");
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

    listByCategory: async (req, res) => {
        try {
            let p = await db.product_category.findAll({
                include: [{association: "products"}],
                where: {
                    category_id: req.params.idCategory
                }
            })
            console.log(p.length);
            let products = [];
            if (p.length > 0) { 
                console.log("paso por aca!!!!!!!!!");
                for (let i=0; i<p.length; i++) {
                    products.push(p[i].products);
                    // console.log(p[i].products);
                }
            }
            console.log(products)
            
            return res.render('products', { products: products, toThousand: toThousand });

        } catch(e) {
            console.log(e);
        }
    },

    searchProducts: async (req, res) => {
        let buscado = req.query.searchBar;
        buscado = buscado.toLowerCase();
        let userResults = [];
        
        userResults = await db.Products.findAll({
            where: {
                name: {[db.Sequelize.Op.like]: `%${buscado}%`}
            }
        })

        return res.render('products', { products: userResults, toThousand: toThousand })
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

    productDetails: async (req, res) => {
        try {
            let product = await db.Products.findByPk(req.params.idProducto, {
                include: [
                    {association: "categories"},
                    {association: "lifestage"},
                    {association: "brand"}
                ]
            });

            return res.render('productDetail', { product: product });

        } catch(e) {
            console.log(e);
        }
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
                let brandName = req.body.brandProd;
                let brandFound = await db.Brands.findOne({
                    where: {
                        name: {[db.Sequelize.Op.like]: `%${brandName}%`}
                    }
                });

                console.log("\nla marca: \n");
                console.log(brandFound);
                let brandId;

                if ( brandFound != undefined ) {
                    brandId = brandFound.id;
                } else {
                    await db.Brands.create({
                        name: brandName,
                        country: 'Argentina'
                    });
                    brandFound = await db.Brands.findOne({
                        where:{
                            name: {[db.Sequelize.Op.like]: `%${brandName}%`}
                        }
                    })
                    brandId = brandFound.id;
                }

                let product = await db.Products.create({
                    name: req.body.nameProd,
                    description: req.body.descriptionProd,
                    price: req.body.priceProd,
                    discount: req.body.discountProd,
                    image: req.session.nameProdImage,
                    brand_id: brandId,
                    lifestage_id: req.body.lifestageProd,
                    stock: req.body.stockProd
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
            req.body.stockProd = product.stock;
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
                    lifestage_id: req.body.lifestageProd,
                    stock: req.body.stockProd
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

            let product = await db.Products.findByPk(req.params.idProducto);

            let fileNameToDelete = product.image;

            fs.unlink(`./public/img/productImages/${fileNameToDelete}`, (error) => {
                if (error) {
                    console.log('\nFS: no se pudo borrar la imagen del producto dentro del proyecto\n');
                } else {
                    console.log('\nFS: se borro la imagen del producto dentro del proyecto\n');
                }
            });

            await db.product_category.destroy({
                where: { product_id: req.params.idProducto }
            });

            await db.Products.destroy({
                where: { id: req.params.idProducto }
            });
            
            return res.redirect('/products');

        } catch(e) {
            console.log(e);
        }
    }
}

module.exports = controller;