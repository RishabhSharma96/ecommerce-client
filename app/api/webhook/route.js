// import Stripe from 'stripe';
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
// import Order from "@models/order.js"
// import { buffer } from 'micro'
// import { connectToDB } from '@utils/database';

// const endpointSecret = "whsec_66c426db4c7d7d6a82ce48057281b04df4428ad9f08c59e3ad4d23bfe4c5f0ca"

// export const POST = async (req) => {
//     console.log("hello")
//     await connectToDB()

//     const sig = req.headers['stripe-signature'];

//     let event;

//     try {
//         event = stripe.webhooks.constructEvent(await buffer(req), sig, endpointSecret);
//     } catch (err) {
//         return new Response(JSON.stringify(err), { status: 400 })
//     }

//     //loal testing
//     // Handle the event
//     switch (event.type) {
//         case 'checkout.session.completed':
//             const paymentIntentSucceeded = event.data.object;
//             const id = paymentIntentSucceeded.metadata.orderId
//             const paid = paymentIntentSucceeded.payment_status === 'paid'

//             if (paid && id) {
//                 await Order.findByIdAndUpdate(id, {
//                     paid: true
//                 })
//             }

//             break;
//         default:
//             console.log(`Unhandled event type ${event.type}`);
//     }


//     return new Response(JSON.stringify('ok'), { status: 200 })


//     //deployment
//     // console.log(`Unhandled event type ${event.type}`)
// }

// export const config = {
//     api: { bodyParser: false }
// }

