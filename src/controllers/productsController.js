const controller = {
    
    list: (req, res) => {
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