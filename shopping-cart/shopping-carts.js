const express =require("express");
const { default: mongoose } = require("mongoose");
const app = express();
const bodyParser = require("body-parser");
const axios = require("axios");


    app.use(bodyParser.json());

    require("./shopping-cart")
    const ShoppingCart = mongoose.model("Shopping-Cart")

    mongoose.connect("mongodb+srv://microservice:nfejjKPFCIy96uYe@microservices.uf4kr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",()=>{
    console.log("Database is connected");
})

app.post('/cart', (req,res) => {

    var newCart = {
        UsersID:req.body.UsersID,
        ProductCatalogId:req.body.ProductCatalogId,
        Quantity:req.body.Quantity
    }

    var cart = new ShoppingCart(newCart)

    cart.save().then(() => {
        console.log("Order created with success!")
    }).catch((err) => {
        if(err){
            throw err
        }
    })
    res.send("New order created with success");
    
})

app.get("/carts", (req,res) => {
    ShoppingCart.find().then((cart) => {
        res.json(cart)
        
    }).catch(err= {
        if(err){
            throw(err)
        }
    })
})

app.get("/carts/:id", (req,res) => {
    ShoppingCart.findById(req.params.id).then((cart) => {
        if(cart){
            axios.get("http://localhost:4548/users/"+ cart.UsersID).then((response) => {
                var cartObject = {
                    userName:response.data.name,
                    productName:'',
                    quantity:cart.Quantity
                }
                axios.get("http://localhost:4546/products/"+cart.ProductCatalogId).then((response) =>{
                    cartObject.productName=response.data.name
                    res.json(cartObject)
                })
            })
        }else{
            res.send("Invalid Order")
        }
    })
})


    app.listen(4547, () => {
        console.log("Up and running! -- This is our Shopping Cart service");
    })