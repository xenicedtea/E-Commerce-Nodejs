var DataTypes = require("sequelize").DataTypes;
var _category = require("./category");
var _inbound_order_items = require("./inbound_order_items");
var _inbound_orders = require("./inbound_orders");
var _product = require("./product");
var _product_category = require("./product_category");
var _supplier = require("./supplier");
var _user = require("./user");

function initModels(sequelize) {
  var category = _category(sequelize, DataTypes);
  var inbound_order_items = _inbound_order_items(sequelize, DataTypes);
  var inbound_orders = _inbound_orders(sequelize, DataTypes);
  var product = _product(sequelize, DataTypes);
  var product_category = _product_category(sequelize, DataTypes);
  var supplier = _supplier(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);

  category.belongsToMany(product, { as: 'productId_products', through: product_category, foreignKey: "categoryId", otherKey: "productId" });
  product.belongsToMany(category, { as: 'categoryId_categories', through: product_category, foreignKey: "productId", otherKey: "categoryId" });
  category.belongsTo(category, { as: "parent", foreignKey: "parentId"});
  category.hasMany(category, { as: "categories", foreignKey: "parentId"});
  product_category.belongsTo(category, { as: "category", foreignKey: "categoryId"});
  category.hasMany(product_category, { as: "product_categories", foreignKey: "categoryId"});
  inbound_order_items.belongsTo(inbound_orders, { as: "order", foreignKey: "orderId"});
  inbound_orders.hasMany(inbound_order_items, { as: "inbound_order_items", foreignKey: "orderId"});
  inbound_order_items.belongsTo(product, { as: "product", foreignKey: "productId"});
  product.hasMany(inbound_order_items, { as: "inbound_order_items", foreignKey: "productId"});
  product_category.belongsTo(product, { as: "product", foreignKey: "productId"});
  product.hasMany(product_category, { as: "product_categories", foreignKey: "productId"});
  inbound_orders.belongsTo(supplier, { as: "supplier", foreignKey: "supplierId"});
  supplier.hasMany(inbound_orders, { as: "inbound_orders", foreignKey: "supplierId"});
  product.belongsTo(user, { as: "user", foreignKey: "userId"});
  user.hasMany(product, { as: "products", foreignKey: "userId"});

  return {
    category,
    inbound_order_items,
    inbound_orders,
    product,
    product_category,
    supplier,
    user,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
