const prodService = require('../service/product.service')
const {handleErrors} = require('../middleware/handleErrors');
const {getUserIdFromToken} = require('../util/getIdUserFromToken');
let newProduct= async(req,res,next) => {
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

let getAllProductsByCategory = async(req,res,next) => {
    try {
        const result = await prodService.getAllProductsByCategory(categoryId);
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

module.exports = {
    newProduct,
    getAllProductsByCategory,
}