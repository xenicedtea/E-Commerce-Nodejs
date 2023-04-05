const catService = require('../service/category.service')
const {handleErrors} = require('../middleware/handleErrors');
let newCategory = async(req,res,next) => {
   try {
        const { parentId, title, metaTitle, slug, content, active } = req.body;
        if (!title) {
            return res.status(400).json({ message: 'Title is required fields' });
        }
        
        const newCategory = {
            parentId:parentId,
            title: title, 
            metaTitle: metaTitle, 
            slug: slug, 
            content: content,
            active:active
        };

const result = await catService.newCategory(newCategory);
        res.json({
            success:true,
            data:{
                product:result
            }
        })
    } catch (error) {
        handleErrors(res,error);
    }
}

let getAllProductsByCategory = async(req,res,next) => {
    try {
        // get category slug and subcategory slug
        const {categorySlug,subCategorySlug} = req.params;

        // get products by category slug and subcategory slug
        const result = await catService.getAllProductsByCategory(categorySlug,subCategorySlug);

        res.json({
            success:true,
            data:{
                products:result
            }
        })
    } catch (error) {
        handleErrors(res,error);
    }
}

let getAllCategory = async (req,res,next) => {
    try {
        const categories = await catService.getAllCategory()
        res.json({
            status:"success",
            data:{
                categories:categories
            }
        })
    } catch (error) {
        next(error)
    }
} 

let getAllCategoryActive = async (req,res,next) => {
    try {
        const categories = await catService.getAllCategoryActive()
        res.json({
            status:"success",
            data:{
                categories:categories
            }
        })
    } catch (error) {
        next(error)
    }
} 

// getAllCategory

module.exports = {
    newCategory,
    getAllProductsByCategory,
    getAllCategory, 
    getAllCategoryActive,
}