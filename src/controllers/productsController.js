const controller = {
    
    card: (req, res) => {
        res.render('productCard')
    },
    
    details: (req, res) => {
        res.render('detallesProductos')
    },

    history: (req, res) => {
        res.render('history')
    }
}


module.exports = controller;