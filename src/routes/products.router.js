const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const upload = multer({ dest: 'public/img' });

const dataFilePath = path.join(__dirname, '..', 'products.json');

router.get('/', (req, res) => {
    const products = JSON.parse(fs.readFileSync(dataFilePath, 'utf-8'));
    res.render('products', { products });
});

router.post('/', upload.single('thumbnail'), (req, res) => {
    const { title, category, size, code, description, price, stock } = req.body;
    if (!title) {
        return res.status(400).send('El campo "title" es obligatorio');
    }

    const products = JSON.parse(fs.readFileSync(dataFilePath, 'utf-8'));
    const productId = products.length > 0 ? products[products.length - 1].id + 1 : 1;
    const newProduct = {
        id: Number(productId),
        title,
        category,
        size,
        status: true,
        code,
        description,
        price: parseInt(price),
        stock,
        thumbnail: `/img/${req.file.filename}`
    };

    products.push(newProduct);
    fs.writeFileSync(dataFilePath, JSON.stringify(products, null, 2));

    const fileStream = fs.createReadStream(req.file.path);
    const newPath = path.join(__dirname, '..', 'public', 'img', req.file.filename);
    const writeStream = fs.createWriteStream(newPath);
    fileStream.pipe(writeStream);

    res.render('agregado');
 /*    res.send(`
    <div >
    <p class="text-center"> Producto agregado exitosamente.</p>
    <a href="/products">Volver</a>
    <div>
  `); */
});

module.exports = router;
