var DataTypes = require("sequelize").DataTypes;
var _category = require("./category");
var _product = require("./product");
var _product_category = require("./product_category");
var _user = require("./user");

function initModels(sequelize){
  var category = _category(sequelize, DataTypes);
  var product = _product(sequelize, DataTypes);
  var product_category = _product_category(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);

  category.belongsToMany(product, { as: 'productId_products', through: product_category, foreignKey: "categoryId", otherKey: "productId" });
  product.belongsToMany(category, { as: 'categoryId_categories', through: product_category, foreignKey: "productId", otherKey: "categoryId" });
  category.belongsTo(category, { as: "parent", foreignKey: "parentId"});
  category.hasMany(category, { as: "categories", foreignKey: "parentId"});
  product_category.belongsTo(category, { as: "category", foreignKey: "categoryId"});
  category.hasMany(product_category, { as: "product_categories", foreignKey: "categoryId"});
  product_category.belongsTo(product, { as: "product", foreignKey: "productId"});
  product.hasMany(product_category, { as: "product_categories", foreignKey: "productId"});
  product.belongsTo(user, { as: "user", foreignKey: "userId"});
  user.hasMany(product, { as: "products", foreignKey: "userId"});

  return {
    category,
    product,
    product_category,
    user,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
