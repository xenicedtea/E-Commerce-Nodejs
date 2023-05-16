const slugify = require('slugify');
const { Op } = require('sequelize');
const db = require('../db/models/index')



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



let getAllCategory = async() => {
    const categories =  await db.categories.findAll({
        raw:true
    });
    return categories
}

let getCategoryByName = async(search,active=null) => {
    let where = {};
    if(active){
        where = {
            title:{
                [Op.like]:`%${search}%`
            },
            active:{
                [Op.eq]:active
            }
        }
    }
    else{
        where = {
            title:{
                [Op.like]:`%${search}%`
            }
        }
    }
    const categories =  await db.categories.findAll(
        {
            where:where,
            raw:true
        }
    );
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
    getAllCategory, 
    getAllCategoryActive,
    getCategoryByName,
}