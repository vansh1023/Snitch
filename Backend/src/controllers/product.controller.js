import productModel from "../models/product.model"
import { uploadFile } from "../service/storage.service.js"



export async function createProductController(req, res){

    const { title, description, priceAmount, priceCurrency} = req.body
    const seller = req.user

    const images = await Promise.all(req.files.map(async (file) => {
        return await uploadFile({
            buffer: file.buffer,
            fileName: file.originalName
        })
    }))

    const product = await productModel.create({
        title,
        description,
        seller: seller._id,
        price: {
            amount: priceAmount,
            currency: priceCurrency || "INR"
        },
        images
    })

    res.status(201).json({
        message: "product created successfully",
        success: true,
        product
    })


}