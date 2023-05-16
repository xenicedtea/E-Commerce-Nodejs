const slugify = require('slugify');
const db = require('../db/models/index')
const { Op } = require('sequelize');
const { QueryTypes } = require('sequelize');
// QUERY
const QUERY_PRODUCT_OF_CATEGORY = `SELECT p.*
                                    FROM products p
                                    INNER JOIN product_category pc ON p.id = pc.productId
                                    INNER JOIN categories c ON pc.categoryId = c.id
                                    WHERE c.id = ? OR c.parentId = ? ;`
                                    const newProduct = async(newProduct, categoryId = null) => {
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

const updateProduct = async(newProduct) => {
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


const getAllProductsByCategory = async(categorySlug,subCategorySlug) => {
    // get id of category by slug
    const category = await db.categories.findOne({
        where:{
            slug:{
                [Op.eq]: categorySlug
            }
        },raw:true
    })
    if(!category){
        throw new Error(`Category ${categorySlug} not found`)
    }

    if(!subCategorySlug){
        // find all product by category id
        const products = await db.sequelize.query(
            QUERY_PRODUCT_OF_CATEGORY,
            {
              replacements: [category.id,category.id],
              type: QueryTypes.SELECT
            }
          );
        return products;
    }

    // if subcategory slug is not null
    // get id of subcategory by slug
    const subCategory = await db.categories.findOne({
        where:{
            slug:{
                [Op.eq]: subCategorySlug
            },
            parentId:{
                [Op.eq]: category.id
            }
        },raw:true
    })
    if(!subCategory){
        throw new Error(`Category ${subCategorySlug} not found`)
    }
    // find all product by subcategory id
    const products = await db.products.findAll({
        include:[{
            model:db.product_category,
            as:'categories',
            where:{
                id:{
                    [Op.eq]: subCategory.categoryId
                }
            }
        }],
        raw: true
    })
    return products;
}

const getAllProducts = async(search=null) => {
    let where = {
        title:{
            [Op.like]:`%${search}%`
        }
    }
    if(search){
        const products = await db.products.findAll({
            where:where,
            raw:true
        })
        return products;
    }
    const products = await db.products.findAll({raw:true})
    return products;
}



module.exports = {
    newProduct,
    updateProduct,
    getAllProductsByCategory,
    getAllProducts
}