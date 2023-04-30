const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, '..', '/products.json');

router.get('/:id', (req, res) => {
    const product = JSON.parse(fs.readFileSync(dataFilePath, 'utf-8'));
    res.render('productsdeletebyid', { product });
});

router.delete('/:id', (req, res) => {
    const id = Number(req.params.id);

    const products = JSON.parse(fs.readFileSync(dataFilePath, 'utf-8'));
    const productIndex = products.findIndex(product => product.id === parseInt(id));

    if (productIndex >= 0) {
        products.splice(productIndex, 1);
        fs.writeFile(dataFilePath, JSON.stringify(products), err => {
            if (err) throw err;
            res.send(`Producto con ID ${id} eliminado`);
        });
    } else {
        res.status(404).send('Producto no encontrado');
    }
});

module.exports = router;
