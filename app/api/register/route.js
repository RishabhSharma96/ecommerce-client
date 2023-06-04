import Customer from "@models/customer";
import { connectToDB } from "@utils/database";
import bcrypt from "bcrypt"

export const POST = async (req) => {

    const { email,
        password,
        phoneNumber,
        address } = await req.json()

    try {
        await connectToDB()

        const salt = await bcrypt.genSalt(10);
        const hashPass = await bcrypt.hashSync(password, salt)

        const data = await Customer.create({
            email,
            password: hashPass,
            phoneNumber,
            address
        })
        return new Response(JSON.stringify(data), { status: 201 })
    }
    catch (err) {
        console.log(err.message)
        return new Response(JSON.stringify(err), { status: 501 })
    }
}