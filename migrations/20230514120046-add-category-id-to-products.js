'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

// exports.up =  function(db) {
//   return db.addColumn('products', 'category_id', {
//       type: 'int',
//       defaultValue: 1,
//       unsigned: true,
//       notNull : true,
//   });
// }

exports.up = function (db) {
  return db.addColumn('products', 'category_id', {
    type: 'int',
    defaultValue: 1,
    unsigned: true,
    notNull: true,
  })
    .then(() => {
      return db.addForeignKey(
        'products',
        'categories',
        'product_category_fk',
        {
          category_id: 'id',
        },
        {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT',
        }
      );
    });
};


// exports.down = function(db){
//   return db.removeColumn('products', 'category_id');
// };

exports.down = function (db) {
  return db.removeForeignKey('products', 'product_category_fk')
    .then(() => {
      return db.removeColumn('products', 'category_id');
    });
};

exports._meta = {
  "version": 1
};
