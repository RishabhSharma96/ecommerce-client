import Product from "@models/product";
import { connectToDB } from "@utils/database";

export const PATCH = async (req, { params }) => {

    const _id = params.id
    console.log("sdfsdfsffsdf")
    const { comment } = await req.json()
    console.log(_id, comment)

    try {
        await connectToDB()
        const data = await Product.findById(_id)
        const reviewArray = data.reviews
        reviewArray.push(comment)
        const updatedData = await Product.findByIdAndUpdate(_id, {
            reviews: reviewArray
        }, { new: true })
        return new Response(JSON.stringify(updatedData), { status: 201 })
    }
    catch (err) {
        console.log("dfsfsfsf")
        console.log(err.message)
        return new Response(JSON.stringify(err), { status: 501 })
    }
}