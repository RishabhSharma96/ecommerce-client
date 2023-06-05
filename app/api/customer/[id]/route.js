import Customer from "@models/customer";
import { connectToDB } from "@utils/database";

export const GET = async (req, { params }) => {

    const _id = params.id

    try {
        await connectToDB()
        const data = await Customer.find({ _id: _id })
        return new Response(JSON.stringify(data), { status: 201 })
    }
    catch (err) {
        console.log(err.message)
        return new Response(JSON.stringify(err), { status: 501 })
    }
}