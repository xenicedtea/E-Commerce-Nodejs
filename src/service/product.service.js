const slugify = require('slugify');
const db = require('../db/models/index')
const { Op } = require('sequelize');

let newProduct = async(newProduct) => {
    // create slug if null
    if(!newProduct.slug){
        const unique = Date.now();
        const title = "Áo thun nam";
        const slug = slugify(title, { lower: true }) + '-' + unique ; 
        newProduct.slug = slug;
    }else{
        // check unique slug
        const productSlug = await db.product.findOne({
            where:{
                slug:{
                    [Op.eq]: newProduct.slug
                }
            },raw:true
        })
        if(productSlug){
            throw new Error("Slug already exists")
        }
    }

    //create product
    const product = db.product.create(newProduct);
    return product;
}

module.exports = {
    newProduct,
}