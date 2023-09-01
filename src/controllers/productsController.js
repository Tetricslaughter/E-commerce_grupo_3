const { log } = require("console");
const fs = require("fs");
const path = require("path");

const productsFilePath = path.join(__dirname, "../data/productsDatabase.json");
const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {

    history: (req, res) => {
        return res.render('historyProduct')
    },
    
    list: (req, res) => {

        res.render('products', { products: products })
    },

    listCategoria: (req, res) => {
        let prodBuscados = [];
        for (let i=0; i<products.length; i++) {
            if (products[i].category == req.params.categoria) {
                prodBuscados.push(products[i])
            }
        }
        // console.log(req.params.categoria);
        res.render('products', { products: prodBuscados }) 
    },

    card: (req, res) => {
        res.render('productCard')
    },

    create: (req, res) => {
        res.render('createProduct')
    },
    
    details: (req, res) => {
        let product = products.filter((i) => i.id == req.params.id);
        console.log(product);
        product = product[0];
        res.render('detailProduct', { product: product})
    },


}


module.exports = controller;