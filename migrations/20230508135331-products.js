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

exports.up = function(db) {
  return db.createTable('product', {
    id: { type: 'int', primaryKey:true, autoIncrement:true, unsigned: true},
    name: { type: 'string', length:100, notNull:true },
    description: 'text',
    base_price: { type: 'string', unsigned: true, notNull:true },
    option_price: 'string',
    stock: { type: 'int', unsigned: true, notNull:true },
    // created: { type: 'timestamp', defaultValue: new String('CURRENT_TIMESTAMP') },
    modified: { type: 'timestamp', defaultValue: new String('CURRENT_TIMESTAMP') },
    last_edit: 'string'
  });
};

exports.down = function(db) {
  return db.dropTable('product');
};

exports._meta = {
  "version": 1
};
