const express =require("express");
const app = express();
const bodyParser = require("body-parser");
const { default: mongoose } = require("mongoose");
const axios = require("axios");
app.use(bodyParser.json());

    require("./Order")
    const Order = mongoose.model("Order")


mongoose.connect("mongodb+srv://microservice:nfejjKPFCIy96uYe@microservices.uf4kr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",()=>{
    console.log("Database is connected");
})


app.post('/order', (req,res) => {

    var newOrder = {
        UsersID:req.body.UsersID,
        ProductCatalogId:req.body.ProductCatalogId,
        date:req.body.Date
    }

    var order = new Order(newOrder)

    order.save().then(() => {
        console.log("Order created with success!")
    }).catch((err) => {
        if(err){
            throw err
        }
    })
    res.send("New order created with success");
    
})

app.get("/order", (req,res) => {
    Order.find().then((order) => {
        res.json(order)
    })
})

app.get("/order/:id", (req,res) => {
    Order.findById(req.params.id).then((order) => {
        if(order){
            axios.get("http://localhost:4548/users/"+ order.UsersID).then((response) => {
                var orderObject = {
                    userName:response.data.name,
                    productName:''
                }
                axios.get("http://localhost:4546/products/"+order.ProductCatalogId).then((response) =>{
                    orderObject.productName=response.data.name
                    res.json(orderObject)
                })
            })
        }else{
            res.send("Invalid Order")
        }
    })
})

app.listen(4549, () => {
    console.log("Up and running! -- This is our Order service");
})
