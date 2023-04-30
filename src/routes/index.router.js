const { Router } = require('express')
const products = require('../products.json');

const router = Router()


// /products/
router.get('/', (req, res) => {
    const limit = parseInt(req.query.limit);
    if (isNaN(limit)) {
        res.status(200).render('index', { products: products.slice(0, 4) });
    } else {
        res.status(200).render('index', { products: products.slice(0, limit) });
    }
})


module.exports = router
