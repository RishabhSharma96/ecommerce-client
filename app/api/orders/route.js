import Order from "@models/order";
import { connectToDB } from "@utils/database";

export const POST = async (req) => {

    const { email } = await req.json()
    console.log(email)

    try {
        await connectToDB()
        const data = await Order.find({ email: email })
        return new Response(JSON.stringify(data), { status: 201 })
    }
    catch (err) {
        console.log(err.message)
        return new Response(JSON.stringify(err), { status: 501 })
    }
}