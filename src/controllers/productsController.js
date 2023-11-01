const fs = require("fs");
const path = require("path");
const { validationResult } = require('express-validator');
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const db = require('../../database/models');

const controller = {

    /** Pagina mostrando todos los productos */
    allProducts: async (req, res) => {
        try {
            let products = await db.Products.findAll()
            return res.render('products', { products: products, toThousand: toThousand })

        } catch(e) {
            console.log(e);
        }
    },

    /** Todos los productos de una categoria */
    listByCategory: async (req, res) => {
        try {
            let p = await db.product_category.findAll({
                include: [{association: "products"}],
                where: {
                    category_id: req.params.idCategory
                }
            })

            let products = [];
            if (p.length > 0) { 
                for (let i=0; i<p.length; i++) {
                    products.push(p[i].products);
                }
            }
            
            return res.render('products', { products: products, toThousand: toThousand });

        } catch(e) {
            console.log(e);
        }
    },

    /** Buscar productos por la barra de busqueda */
    searchProducts: async (req, res) => {
        try {
            let buscado = req.query.searchBar;
            buscado = buscado.toLowerCase();
            let userResults = [];
            
            userResults = await db.Products.findAll({
                where: {
                    name: {[db.Sequelize.Op.like]: `%${buscado}%`}
                }
            })

            return res.render('products', { products: userResults, toThousand: toThousand })
        } catch(e) {
            console.log(e);
        }
    },

    /** Mostrar la pagina de historial de compras (aun no funciona de acuerdo a un usuario) */
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

    /** Mostrar pagina del carrito de compras (au no funciona de acuerdo a un usuario) */
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

    /** Mostrar detalles de un producto en particular */
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

    /** Mostrar pagina de crear producto */
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

    /** Proceso de la creacion de un producto */
    saveProduct: async (req, res) => {
        try {
            let errors = validationResult(req);

            if ( !errors.isEmpty() ) {
                let categories = await db.Categories.findAll();
                let brands = await db.Brands.findAll();
                let lifestages = await db.Lifestages.findAll();

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

    /** Mostrar pagina de edicion de un producto */
    editProduct: async (req, res) => {
        try {
            let product = await db.Products.findByPk(req.params.idProducto,{
                include: [
                    {association: "categories"},
                    {association: "brand"}
                ]
            });

            req.body.nameProd = product.name;
            req.body.descriptionProd = product.description;
            req.body.priceProd = product.price;
            req.body.discountProd = product.discount;
            req.body.imageProd = product.image;
            req.body.brandProd = product.brand.name;
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

    /** Proceso de la edicion de un producto */
    updateProduct: async (req, res) => {
        try {
            let errors = validationResult(req);

            if ( !errors.isEmpty() ) {
                let categories = await db.Categories.findAll();
                let brands = await db.Brands.findAll();
                let lifestages = await db.Lifestages.findAll();
                let product = await db.Products.findByPk(req.params.idProducto,{
                    include: [
                        {association: "categories"},
                        {association: "brand"},
                        {association: "lifestage"}
                    ]
                });

                return res.render('productEdit', {
                    errors: errors.mapped(),
                    old: req.body,
                    product: product,
                    categories: categories,
                    brands: brands,
                    lifestages: lifestages
                });
                
            } else {

                // si la marca del prod. ingresada no existe, se crea
                let brandName = req.body.brandProd;
                let brandFound = await db.Brands.findOne({
                    where: {
                        name: {[db.Sequelize.Op.like]: `%${brandName}%`}
                    }
                });

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

                // actualizacion del producto
                await db.Products.update({
                    name: req.body.nameProd,
                    description: req.body.descriptionProd,
                    price: req.body.priceProd,
                    discount: req.body.discountProd,
                    image: req.session.nameProdImage,
                    brand_id: brandId,
                    lifestage_id: req.body.lifestageProd,
                    stock: req.body.stockProd
                },{
                    where: { id: req.params.idProducto }
                });

                /** actualiza la tabla pivot */
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

    /** eliminacion de un producto */
    deleteProduct: async (req, res) => {
        try {
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