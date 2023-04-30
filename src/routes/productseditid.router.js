const express = require('express');
const router = express.Router();
const products = require('../products.json');

router.get('/:pid', (req, res) => {
    const productId = Number(req.params.pid);
    const product = products.find((p) => p.id === productId);
    if (product) {
        res.render('productsedit', { product });
    } else {
        res.status(404).send('Producto no encontrado por GET');
    }
});

router.post('/:pid', (req, res) => {
    const productId = Number(req.params.pid);
    res.redirect(`/productsedit/${productId}`);
});

router.put('/:pid', (req, res) => {
    const productId = Number(req.params.pid);
    const updatedProduct = req.body;
    const index = products.findIndex((p) => p.id === productId);
    if (index !== -1) {
        products[index] = { ...products[index], ...updatedProduct };
        res.send(`Producto con id ${productId} actualizado desde PUT`);
    } else {
        res.status(404).send('Producto no encontrado');
    }
});

module.exports = router;
