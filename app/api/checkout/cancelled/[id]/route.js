import Order from "@models/order";
import { connectToDB } from "@utils/database";

export const DELETE = async (req, { params }) => {

    const _id = params.id

    try {
        await connectToDB()
        await Order.deleteOne({ _id })
        return new Response(JSON.stringify("ok"), { status: 201 })
    }
    catch (err) {
        console.log(err.message)
        return new Response(JSON.stringify(err), { status: 501 })
    }
}