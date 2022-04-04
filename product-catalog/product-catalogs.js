const express =require("express");
const { default: mongoose } = require("mongoose");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());

    require("./Product-Catalog")
    const ProductCatalog = mongoose.model("Product-Catalog")

    mongoose.connect("mongodb+srv://microservice:nfejjKPFCIy96uYe@microservices.uf4kr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",()=>{
        console.log("Database is connected");
    })

    app.get('/', (req,res) => {
        res.send(" This is my main endpointt!");
    })

    app.post("/product", (req,res) => {

        var newProductCatalog = {
            name:req.body.name,
            description:req.body.description,
            price:req.body.price,
            availability:req.body.availability
        }
  
        var product = new ProductCatalog(newProductCatalog)
  
        product.save().then(() => {
            console.log("New product Created")
        }).catch((err) => {
            if(err){
                throw err;
            }
        })
        res.send("New product created with success");
      })

    app.get("/products", (req,res) => {
        ProductCatalog.find().then((product) => {
            res.json(product)
            
        }).catch(err= {
            if(err){
                throw(err)
            }
        })
    })

    app.get("/products/:id", (req,res) => {
        ProductCatalog.findById(req.params.id).then((product) => {
            if(product){
                res.json(product)
            }else{
                res.sendStatus(404);
            }
        }).catch(err = {
            if(err){
                throw err;
            }
        })
       
    })



app.listen(4546, () => {
    console.log("Up and running! -- This is our Product Catalog service");
})
