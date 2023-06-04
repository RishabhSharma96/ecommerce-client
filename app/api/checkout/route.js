import Product from "@models/product";
import Order from "@models/order";
import { connectToDB } from "@utils/database";
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const POST = async (req) => {

    try {
        await connectToDB()
        const { name, pin, city, email, address, country, products } = await req.json()

        const productIds = products.split(",")
        const uniqueIds = [...new Set(productIds)]
        const productsInfo = await Product.find({ _id: uniqueIds })

        let line_items = []

        for (const pid of uniqueIds) {
            const productInfo = productsInfo.find(p => p._id.toString() === pid)
            const qty = productIds.filter(id => id === pid)?.length || 0

            if (qty > 0 && productInfo) {
                line_items.push({
                    quantity: qty,
                    price_data: {
                        currency: 'INR',
                        product_data: { name: productInfo.productName },
                        unit_amount: qty * productInfo.productPrice * 100
                    }
                })
            }
        }

        const newOrder = await Order.create({
            line_items,
            name,
            pin,
            city,
            email,
            address,
            country,
            paid: false
        })

        const session = await stripe.checkout.sessions.create({
            line_items,
            mode: "payment",
            customer_email: email,
            success_url: process.env.SUCCESS_URL + "/payment?success=1",
            cancel_url: process.env.SUCCESS_URL + "/payment?cancelled=1",
            metadata: {
                orderId: newOrder._id.toString()
            }
        })

        const url = session.url

        return new Response(JSON.stringify(url), { status: 201 })

    }
    catch (err) {
        console.log(err.message)
        return new Response(JSON.stringify(err), { status: 501 })

    }
}