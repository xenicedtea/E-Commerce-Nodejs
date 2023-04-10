const slugify = require('slugify');
const db = require('../db/models/index')
const { Op } = require('sequelize');

let newProduct = async(newProduct, categoryId = null) => {
    // create slug if null
    if(!newProduct.slug){
        const unique = Date.now();
        const title = newProduct.title;
        const slug = slugify(title, { lower: true }) + '-' + unique ; 
        newProduct.slug = slug;
    }else{
        // check unique slug
        const productSlug = await db.products.findOne({
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
    const product = await db.products.create(newProduct);
    // link product to category
    if(categoryId){
        const categoryFound = await db.categories.findOne({
            where:{
                id:{
                    [Op.eq]: categoryId
                }
            },raw:true
        })
        if(!categoryFound){
            throw new Error("Category not found")
        }
        else{
            await  db.product_categories.create({
                productId:product.id,
                categoryId:categoryFound.id
            })
        }
    }

    return product;
}

let updateProduct = async(newProduct) => {
    //check product exist
    console.log(newProduct.id)
    const prodExist = await db.products.findOne({ where: { id: newProduct.id } });
    if (!prodExist) {
        throw new Error('Product not found.');
    }

    // check unique slug
    if(newProduct.slug){
        const productSlug = await db.products.findOne({
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
    const product = await db.products.update(newProduct, {where: {
        id:{
            [Op.eq]: newProduct.id
        }
    }});
    return product;
}


module.exports = {
    newProduct,
    updateProduct,
}