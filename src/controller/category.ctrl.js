const catService = require('../service/category.service')
const {handleErrors} = require('../middleware/handleErrors');
const { category } = require('../db/models');

let newCategory = async(req,res,next) => {
   try {
        const {parentId, title, metaTitle, slug, content, active } = req.body;
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

let updateCategory  = async(req,res,next) => {
    try {
        const {id, parentId, title, metaTitle, slug, content, active } = req.body;
        if (!title) {
            return res.status(400).json({ message: 'Title is required fields' });
        }

        const CategoryUpdate = {
            id:id,
            parentId:parentId,
            title: title, 
            metaTitle: metaTitle, 
            slug: slug, 
            content: content,
            active:active
        };

        const categoryResult = await catService.updateCategory(CategoryUpdate);

        res.json({
            success: true,
            data:{
                category: categoryResult
            }
        })
    } catch (error) {
        handleErrors(res,error);
    }
}

let getAllCategory = async (req,res,next) => {
    try {
        const search = req.query.search;
        if (search) {
            const categories = await catService.getCategoryByName(search)
            res.json({
                status:"success",
                data:{
                    categories:categories
                }
            })
        } else {
            const categories = await catService.getAllCategory()
            res.json({
                status:"success",
                data:{
                    categories:categories
                }
            })
        }
        
    } catch (error) {
        next(error)
    }
} 

let getAllCategoryActive = async (req,res,next) => {
    try {

        const search = req.query.search;
        if (search) {
            const categories = await catService.getCategoryByName(search,active = true)
            res.json({
                status:"success",
                data:{
                    categories:categories
                }
            })
        } else {
            const categories = await catService.getAllCategoryActive()
            res.json({
                status:"success",
                data:{
                    categories:categories
                }
            })
        }
    } catch (error) {
        next(error)
    }
} 


// getAllCategory

module.exports = {
    newCategory,
    updateCategory,
    getAllCategory, 
    getAllCategoryActive,
}