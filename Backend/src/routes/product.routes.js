import { Router } from 'express'
import { authenticateSeller } from '../middlewares/auth.middleware.js'
import { createProductController, getSellerProductsController } from '../controllers/product.controller.js'
import { createProductValidator } from '../validator/product.validator.js'
import multer from 'multer'

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 1024 * 1024 * 5
    }
})



const productRouter = Router()



productRouter.post('/', authenticateSeller, upload.array("images", 7) , createProductValidator , createProductController)




productRouter.get('/seller', authenticateSeller, getSellerProductsController)








export default productRouter