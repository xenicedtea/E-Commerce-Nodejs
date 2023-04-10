const slugify = require('slugify');
const { Op } = require('sequelize');
const db = require('../db/models/index')
const { QueryTypes } = require('sequelize');

// QUERY
const QUERY_PRODUCT_OF_CATEGORY = `SELECT p.*
                                    FROM product p
                                    INNER JOIN product_category pc ON p.id = pc.productId
                                    INNER JOIN category c ON pc.categoryId = c.id
                                    WHERE c.id = ? OR c.parentId = ? ;`

let newCategory = async(newCategory) => {
    // create slug if null
    if(!newCategory.slug){
        const unique = Date.now();
        const title = newCategory.title;
        const slug = slugify(title, { lower: true }) + '-' + unique ; 
        newCategory.slug = slug;
    }else{
        // check unique slug
        const categorySlug = await db.categories.findOne({
            where:{
                slug:{
                    [Op.eq]: newCategory.slug
                }
            },raw:true
        })
        if(categorySlug){
            throw new Error("Slug already exists")
        }
    }

    //create category
    const category = db.categories.create(newCategory);
    return category;
}

let updateCategory = async(category) => {
    //check category exist
    let categoryExist = await db.categories.findOne({
        where: {
            id:{
                [Op.eq]:category.id
            }
        }
        ,raw:true
    })

    if(!categoryExist){
        throw new Error('Category Not Found.')
    }

    console.log(categoryExist.id)

    //update
    let categoryUpdate = await db.categories.update(
        category,
        {
            where:{
                id:{
                    [Op.eq]:categoryExist.id
                }
            }
        }
    )
    return categoryUpdate
}

let getAllProductsByCategory = async(categorySlug,subCategorySlug) => {
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

let getAllCategory = async() => {
    const categories =  await db.categories.findAll({
        raw:true
    });
    return categories
}

let getAllCategoryActive = async() => {
    const categories = await db.categories.findAll({
        where:{
            active:{
                [Op.eq]: true
            }
        }, 
        raw:true
    })
    return categories
}

module.exports = {
    newCategory,
    updateCategory,
    getAllProductsByCategory,
    getAllCategory, 
    getAllCategoryActive,
}