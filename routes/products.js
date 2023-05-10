const express = require("express");
const router = express.Router(); // #1 - Create a new express Router

// #1 import in the Product model
const {Product} = require('../models')

//  #2 Add a new route to the Express router
// router.get('/', (req,res)=>{
//     res.render('products/products')
// })

router.get('/', async (req,res)=>{
    // #2 - fetch all the products (ie, SELECT * from products)
    let products = await Product.collection().fetch();
    res.render('products/index', {
        'products': products.toJSON() // #3 - convert collection to JSON
    })
})

router.get('/create', (req,res)=>{
    res.render('products/create')
})

module.exports = router; // #3 export out the router