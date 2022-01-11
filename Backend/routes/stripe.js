const router= require("express").Router()
const stripe= require("stripe")('sk_test_51JzJlCAwI5qAl4GCuTc9ZhHcfRd5z8wkXHxdXhJ1YzZuJGrT3dYqXCmI7Z57E44lcrNDSbmiMNfr8wh3xnEpsrQ9002fRyPYF6')

router.post("/payment", (req,res)=>{
    stripe.charges.create({
        source:'tok_visa',
        amount:req.body.amount,
        currency:"usd",
    }, (stripeErr, stripeRes)=>{
        if(stripeErr){
            res.status(500).json(stripeErr)
        }else{
            res.status(200).json(stripeRes)
        }
    })
})

module.exports= router

