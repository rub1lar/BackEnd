const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const dataFilePath = path.join(__dirname, '..', '..', 'public', 'img');

const upload = multer({ dest: dataFilePath });


router.get('/', (req, res) => {
    res.render('realtimeproducts', {});
});

router.post('/', upload.single('thumbnail'), (req, res) => {    

    const { title, category, size, code, description, price, stock } = req.body;
    const thumbnail = '/img/' + req.file.filename;     
    
    const products = JSON.parse(fs.readFileSync(dataFilePath, 'utf-8'));
    const productId = products.length > 0 ? products[products.length - 1].id + 1 : 1;
console.log(products);
    
    console.log("aca esta el console log");

    const newProduct = {
        title: title,
        id:productId,
        category: category,
        thumbnail: thumbnail,
        size: size,
        code: code,
        description: description,
        price: price,
        stock: stock
    };

console.log(products);

    products.push(newProduct);

 /*    fs.writeFileSync(dataFilePath, JSON.stringify(products));
    const fileStream = fs.createReadStream(req.file.path);
    const newPath = path.join(__dirname, '..', 'public', 'img', req.file.filename);
    const writeStream = fs.createWriteStream(newPath);
    fileStream.pipe(writeStream); */

    res.render('realtimeproducts', { product: newProduct });
});

module.exports = router;
