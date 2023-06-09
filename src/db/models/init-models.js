var DataTypes = require("sequelize").DataTypes;
var _cart = require("./cart");
var _cart_item = require("./cart_item");
var _categories = require("./categories");
var _inbound_order_items = require("./inbound_order_items");
var _inbound_orders = require("./inbound_orders");
var _product_category = require("./product_category");
var _products = require("./products");
var _suppliers = require("./suppliers");
var _users = require("./users");

function initModels(sequelize) {
  var cart = _cart(sequelize, DataTypes);
  var cart_item = _cart_item(sequelize, DataTypes);
  var categories = _categories(sequelize, DataTypes);
  var inbound_order_items = _inbound_order_items(sequelize, DataTypes);
  var inbound_orders = _inbound_orders(sequelize, DataTypes);
  var product_category = _product_category(sequelize, DataTypes);
  var products = _products(sequelize, DataTypes);
  var suppliers = _suppliers(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

  categories.belongsToMany(products, { as: 'productId_products', through: product_category, foreignKey: "categoryId", otherKey: "productId" });
  products.belongsToMany(categories, { as: 'categoryId_categories', through: product_category, foreignKey: "productId", otherKey: "categoryId" });
  cart_item.belongsTo(cart, { as: "cart", foreignKey: "cartId"});
  cart.hasMany(cart_item, { as: "cart_items", foreignKey: "cartId"});
  categories.belongsTo(categories, { as: "parent", foreignKey: "parentId"});
  categories.hasMany(categories, { as: "categories", foreignKey: "parentId"});
  product_category.belongsTo(categories, { as: "category", foreignKey: "categoryId"});
  categories.hasMany(product_category, { as: "product_categories", foreignKey: "categoryId"});
  inbound_order_items.belongsTo(inbound_orders, { as: "order", foreignKey: "orderId"});
  inbound_orders.hasMany(inbound_order_items, { as: "inbound_order_items", foreignKey: "orderId"});
  cart_item.belongsTo(products, { as: "product", foreignKey: "productId"});
  products.hasMany(cart_item, { as: "cart_items", foreignKey: "productId"});
  inbound_order_items.belongsTo(products, { as: "product", foreignKey: "productId"});
  products.hasMany(inbound_order_items, { as: "inbound_order_items", foreignKey: "productId"});
  product_category.belongsTo(products, { as: "product", foreignKey: "productId"});
  products.hasMany(product_category, { as: "product_categories", foreignKey: "productId"});
  inbound_orders.belongsTo(suppliers, { as: "supplier", foreignKey: "supplierId"});
  suppliers.hasMany(inbound_orders, { as: "inbound_orders", foreignKey: "supplierId"});
  cart.belongsTo(users, { as: "user", foreignKey: "userId"});
  users.hasMany(cart, { as: "carts", foreignKey: "userId"});
  products.belongsTo(users, { as: "user", foreignKey: "userId"});
  users.hasMany(products, { as: "products", foreignKey: "userId"});

  return {
    cart,
    cart_item,
    categories,
    inbound_order_items,
    inbound_orders,
    product_category,
    products,
    suppliers,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
