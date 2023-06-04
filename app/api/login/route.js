import Customer from "@models/customer";
import { connectToDB } from "@utils/database";
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'

export const POST = async (req) => {

    const { email,
        password } = await req.json()

    try {
        await connectToDB()

        const data = await Customer.find({ email: email })

        const checkHash = await bcrypt.compare(password, data[0].password)

        var token = null
        if (checkHash) {
            token = jwt.sign({ id: data[0]._id }, process.env.JWT_SECRET)
        }

        return new Response(JSON.stringify({ token: token, user: data }), { status: 201 })
    }
    catch (err) {
        console.log(err.message)
        return new Response(JSON.stringify(err), { status: 501 })
    }
}