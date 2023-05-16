const prodService = require('../service/product.service')
const {handleErrors} = require('../middleware/handleErrors');
const {getUserIdFromToken} = require('../util/getIdUserFromToken');
const newProduct= async(req,res,next) => {
   try {
        let accessToken = req.headers.authorization
        accessToken = accessToken && accessToken.split(" ")[1]
        const userId = await getUserIdFromToken(accessToken);
        const { title, metaTitle,slug, summary, type, sku, price, discount, quantity, shop, content, categoryId } = req.body;
        if (!title || !sku || !price || !quantity) {
            return res.status(400).json({ message: 'Title, SKU, Price, and Quantity are required fields' });
        }
        
        const newProduct = {
            userId: userId,
            title: title || undefined,
            metaTitle: metaTitle || undefined,
            slug: slug || undefined,
            summary: summary || undefined,
            type: type || undefined,
            sku: sku || undefined,
            price: price || undefined,
            discount: discount || undefined,
            quantity: quantity || undefined,
            shop: shop || undefined,
            content: content || undefined,
        };
        const result = await prodService.newProduct(newProduct, categoryId);
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

const updateProduct = async(req,res,next) => {
    try {
        // get user id
        let accessToken = req.headers.authorization
        accessToken = accessToken && accessToken.split(" ")[1]
        const userId = await getUserIdFromToken(accessToken);
        // get data update
        const {id, title, metaTitle,slug, summary, type, sku, price, discount, quantity, shop, content, categoryId } = req.body;
        // check variable not null
        if (!title || !sku || !price || !quantity) {
            return res.status(400).json({ message: 'Title, SKU, Price, and Quantity are required fields' });
        }
        // create new product obj
        const newProduct = {
            id:id,
            userId: userId,
            title: title || undefined,
            metaTitle: metaTitle || undefined,
            slug: slug || undefined,
            summary: summary || undefined,
            type: type || undefined,
            sku: sku || undefined,
            price: price || undefined,
            discount: discount || undefined,
            quantity: quantity || undefined,
            shop: shop || undefined,
            content: content || undefined,
        };
        // update product
        const result = await prodService.updateProduct(newProduct, categoryId);
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

const getAllProductsByCategory = async(req,res,next) => {
    try {
        // get category slug and subcategory slug
        const {categorySlug,subCategorySlug} = req.params;

        // get products by category slug and subcategory slug
        const result = await prodService.getAllProductsByCategory(categorySlug,subCategorySlug);

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

const getAllProducts = async(req,res,next) => {
    try {
        const search = req.query.search
        if(search){
            const result = await prodService.getAllProducts(search);
            res.json({
                success:true,
                data:{
                    products:result
                }
            })
        }else{
            const result = await prodService.getAllProducts();
            res.json({
                success:true,
                data:{
                    products:result
                }
            })
        }
        
    } catch (error) {
        handleErrors(res,error);
    }
}

module.exports = {
    newProduct,
    updateProduct,
    getAllProductsByCategory,
    getAllProducts,
}