const controller = {
    
    card: (req, res) => {
        res.render('productCard')
    },

    create: (req, res) => {
        res.render('createProducts')
    },
    
    details: (req, res) => {
        res.render('detallesProductos')
    },

    history: (req, res) => {
        res.render('history')
    }
}


module.exports = controller;