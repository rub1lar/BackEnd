const express = require('express');
const router = express.Router();
const products = require('../products.json');


router.get('/:pid', (req, res) => {
    const productId = Number(req.params.pid);
    const product = products.find((p) => p.id === productId);

    if (product) {
        res.render('productsid', { product });
    } else {
        res.status(404).send('Producto no encontrado');
    }
});

router.post('/', (req, res) => {
    const newProduct = req.body;
    products.push(newProduct);
    res.redirect('/products');
});




module.exports = router;
