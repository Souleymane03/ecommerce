import Stripe from "stripe";
const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY,{apiVersion:"2022-11-15"});

export default async function handler(req, res) {
    //console.log(req.body);
    if (req.method === 'POST') {
        try {
            // Create Checkout Sessions from body params.
            const session = await stripe.checkout.sessions.create({
                submit_type:'pay',
                payment_method_types:['card'],
                billing_address_collection:'auto',
                shipping_options:[
                    {shipping_rate:'shr_1MgBDCDsFFNt0m6mPnhuSOZS'},
                    {shipping_rate:'shr_1Mg39xDsFFNt0m6mvyyydXoS'},
                ],
                line_items:req.body.map((item) => {
                    const img = item.image[0].asset._ref;
                    const newImage = img.replace('image-',`https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANIT_PROJECT_ID}/production/`).replace('-webp',".webp");
                    return {
                        price_data:{
                            currency:'usd',
                            product_data:{
                                name:item.name,
                                images:[newImage]
                            },
                            unit_amount:item.price * 100
                        },
                        adjustable_quantity:{
                            enabled:true,
                            minimum:1
                        },
                        quantity:item.quantity
                    }
                }),
                mode: 'payment',
                success_url: `${req.headers.origin}/success`,
                cancel_url: `${req.headers.origin}/canceled`,
            });
            //res.redirect(303, session.url);
            res.status(200).json(session);
        } catch (err) {
            console.log(err);
            res.status(err.statusCode || 500).json(err.message);
        }
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
    }
}