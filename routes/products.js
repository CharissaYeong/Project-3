const express = require("express");
const router = express.Router(); // #1 - Create a new express Router

// #1 import in the Product model
const {Product} = require('../models')
const { bootstrapField, createProductForm } = require('../forms');

router.get('/', async (req,res)=>{
    // #2 - fetch all the products (ie, SELECT * from products)
    let products = await Product.collection().fetch();
    res.render('products/index', {
        'products': products.toJSON() // #3 - convert collection to JSON
    })
})

router.get('/create', async (req, res) => {
    const productForm = createProductForm();
    res.render('products/create',{
        'form': productForm.toHTML(bootstrapField)
    })
})

router.post('/create', async(req,res)=>{
    const productForm = createProductForm();
    productForm.handle(req, {
        'success': async (form) => {
            const product = new Product();
            product.set('name', form.data.name);
            product.set('base_price', form.data.base_price);
            product.set('description', form.data.description);
            product.set('stock', form.data.stock);
            await product.save();
            res.redirect('/products');
        },
        'empty': async (form) => {
            res.render('products/create', {
                'form': form.toHTML(bootstrapField)
            })
        },
        'error': async (form) => {
            res.render('products/create', {
                'form': form.toHTML(bootstrapField)
            })
        }
    })
})

module.exports = router; // #3 export out the router