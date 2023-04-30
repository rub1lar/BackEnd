const express = require('express');
const router = express.Router();
const products = require('../products.json');


router.get('/', (req, res) => {
    res.render('productstable', { products: products });
});


module.exports = router;
