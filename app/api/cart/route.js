import Product from "@models/product";
import { connectToDB } from "@utils/database";

export const POST = async (req) => {

    try {
        await connectToDB()
        const { ids } = await req.json()
        const data = await Product.find({ _id: ids }).populate('productCategory')
        return new Response(JSON.stringify(data), { status: 201 })
    }
    catch (err) {
        console.log(err.message)
        return new Response(JSON.stringify(err), { status: 501 })
    }
}