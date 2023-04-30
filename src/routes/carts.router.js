const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '..', 'products.json');
const carritoFilePath = path.join(__dirname, '..', 'carrito.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
let carrito = JSON.parse(fs.readFileSync(carritoFilePath, 'utf-8'));

const Handlebars = require('handlebars');
Handlebars.registerHelper('reduce', function (array, prop) {
    return array.reduce((acc, item) => acc + item[prop], 0);
});


Handlebars.registerHelper('multiply', function (a, b) {
    return a * b;
});

router.get('/', (req, res) => {
    let totalPrice = 0;

    carrito.forEach(productoEnCarrito => {
        totalPrice += productoEnCarrito.producto.price * productoEnCarrito.cantidad;
    });

    res.render('carts', { carrito, totalPrice });
});

router.get('/:id', (req, res) => {
    const id = Number(req.params.id);
    const carritoId = carrito.find(productoEnCarrito => productoEnCarrito.id === id);

    if (carritoId) {
        const totalPrice = carritoId.producto.price * carritoId.cantidad;
        res.render('cart', { productoEnCarrito: carritoId, totalPrice });
    } else {
        res.status(404).send('Carrito no encontrado');
    }
});

router.post('/:id', (req, res) => {
    const id = Number(req.params.id);
    const producto = products.find(product => product.id === id);

    if (producto) {
        const productoEnCarritoExistente = carrito.find(producto => producto.producto.id === id);

        if (productoEnCarritoExistente) {
            productoEnCarritoExistente.cantidad++;
        } else {
            const productoEnCarrito = {
                id: carrito.length + 1,
                cantidad: 1,
                producto: {
                    ...producto,
                    price: parseInt(producto.price)
                }
            };
            carrito.push(productoEnCarrito);
        }

        fs.writeFile(carritoFilePath, JSON.stringify(carrito), (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error al agregar producto al carrito');
            }
            res.render('carts', { carrito });
        });

    } else {
        res.status(404).send('Producto no encontrado');
    }
});

module.exports = router;
