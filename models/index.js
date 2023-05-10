const bookshelf = require('../bookshelf')

const Product = bookshelf.model('Product', {
    tableName:'product'
});

module.exports = { Product };