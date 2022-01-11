const Cart = require("../models/Cart");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken")

const router= require("express").Router();

router.post("/",verifyToken,async (req,res)=>{
    const newCart=new Cart(req.body)

    try{
        const savedCart=await newCart.save()
        res.status(200).json(savedCart)
    }catch(err){
        res.status(500).json(err)
    }
})

//update cart

router.put("/:id",verifyTokenAndAuthorization, async (req,res)=>{
    try{
        const updateCart= await Cart.findByIdAndUpdate(req.params.id,{
            $set: req.body
        },{new:true})
        res.status(200).json(updateCart)
    }catch(err){
        res.status(500).json(err)
    }
})

//Delete cart

router.delete("/:id",verifyTokenAndAuthorization, async (req,res)=>{
    try{
        await Cart.findByIdAndDelete(req.params.id)
        res.status(200).json("Cart has been deleted~")
    }catch(err){
        res.status(500).json(err)
    }
})

//Get user cart

router.get("/find/:userID",verifyTokenAndAuthorization, async (req,res)=>{
    try{
        const cart=await Cart.findOne({userID: req.params.userID})
        res.status(200).json(cart)
    }catch(err){
        res.status(500).json(err)
    }
})

//Get all

router.get("/", verifyTokenAndAdmin, async (req,res)=>{
    try{
        const carts= await Cart.find()
        res.status(200).json(carts)
    }catch(err){
        res.status(500).json(err)
    }
})

module.exports=router