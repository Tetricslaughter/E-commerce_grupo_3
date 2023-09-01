const fs = require("fs");
const path = require("path");

const productsFilePath = path.join(__dirname, "../data/productsDatabase.json");
const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
    
    list: (req, res) => {

        res.render('products', { products: products })
    },

    card: (req, res) => {
        res.render('productCard')
    },

    create: (req, res) => {
        res.render('createProduct')
    },
    
    details: (req, res) => {
        res.render('detailProduct')
    },

    history: (req, res) => {
        res.render('historyProduct')
    }
}


module.exports = controller;