"use strict";

var dbm;
var type;
var seed;

/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */
exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

// exports.up = function(db) {
//   return db.createTable('products', {
//     id: { type: 'int', primaryKey:true, autoIncrement:true, unsigned: true},
//     name: { type: 'string', length:100, notNull:true },
//     description: 'text',
//     base_price: { type: 'int', unsigned: true, notNull:true },
//     stock: { type: 'int', unsigned: true, notNull:true },
//     modified: { type: 'timestamp', defaultValue: new String('CURRENT_TIMESTAMP') },
//     last_edit: 'string'
//   });
// };

exports.up = function (db) {
  return db
    .createTable("products", {
      id: {
        type: "int",
        primaryKey: true,
        autoIncrement: true,
        unsigned: true,
      },
      name: { type: "string", length: 100, notNull: true },
      description: "text",
      base_price: { type: "int", unsigned: true, notNull: true },
      stock: { type: "int", unsigned: true, notNull: true },
      // modified: {
      //   type: "timestamp",
      // defaultValue: new String("CURRENT_TIMESTAMP"),
      // },
      modified: {
        type: "datetime", // Use DATETIME data type
        // notNull: true,
      },
      last_edit: "string",
    })
    .then(function () {
      return db.insert(
        "products",
        ["name", "description", "base_price", "stock", "last_edit"],
        ["Default Product", "Default Description", 0, 0, "system"]
      );
    });
};

exports.down = function (db) {
  return db.dropTable("products");
};

exports._meta = {
  version: 1,
};
