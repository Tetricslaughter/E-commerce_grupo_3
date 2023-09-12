const fs = require("fs");
const path = require("path");
const productsFilePath = path.join(__dirname, "../data/productsDatabase.json");
const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {

    allProducts: (req, res) => {
        res.render('products', { products: products, toThousand: toThousand })
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
        res.render('productHistory', { toThousand: toThousand })
    },

    card: (req, res) => {
        res.render('productCard')
    },

    productDetails: (req, res) => {
        let product = products.find((i) => i.id == req.params.idProducto);
        res.render('productDetail', { product: product })
    },

    createProduct: (req, res) => {
        res.render('productCreate')
    },

    saveProduct: (req, res) => {
        console.log(req.file);
        if (req.file) {
            let prod = req.body;
            prod.image = req.file.filename;

            let maxId = -1;
            for (let i = 0; i < products.length; i++) {
                if (products[i].id > maxId) {
                    maxId = products[i].id;
                }
            }
            maxId++;
            let nuevoProducto = {
                id: maxId,
                name: req.body.nombreProd,
                price: req.body.precioProd,
                category: req.body.categoriaProd,
                discount: req.body.descuentoProd,
                description: req.body.descripcionProd,
                image: '/img/productImages/' + req.file.filename
            };
            console.log(nuevoProducto);
            products.push(nuevoProducto);
            res.redirect('/products');
        } else {
            res.redirect('/products/create')
        }
    },

    editProduct: (req, res) => {
        let product = products.find((i) => i.id == req.params.idProducto);
        res.render('productEdit', { product: product })
    },

    updateProduct: (req, res) => {
        console.log(req.body);
        let id = req.params.idProducto;
        products.forEach((item) => {
            if (item.id == id) {
                item.name = req.body.nombreProd;
                item.price = parseInt(req.body.precioProd);
                item.category = req.body.categoriaProd;
                item.discount = parseInt(req.body.descuentoProd);
                item.description = req.body.descripcionProd;
            }
        })
        res.redirect('/products');
    },

    deleteProduct: (req, res) => {
        let id = req.params.idProducto;
        let index = products.findIndex(item => item.id == id);
        products.splice(index, 1);
        res.redirect('/products');
    }
}

module.exports = controller;