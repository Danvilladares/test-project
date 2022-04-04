const express =require("express");
const { default: mongoose } = require("mongoose");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());

    require("./User")
    const User = mongoose.model("User")

    mongoose.connect("mongodb+srv://microservice:nfejjKPFCIy96uYe@microservices.uf4kr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",()=>{
        console.log("Database is connected");
    })

    app.get('/', (req,res) => {
        res.send(" This is my main endpointt!");
    })

    app.post("/user", (req,res) => {

        var newUser = {
            name:req.body.name,
            age:req.body.age,
            address:req.body.address
        }
  
        var user = new User(newUser)
  
        user.save().then(() => {
            console.log("New user Created")
        }).catch((err) => {
            if(err){
                throw err;
            }
        })
        res.send("New user created with success");
      })

    app.get("/users", (req,res) => {
        User.find().then((user) => {
            res.json(user)
            
        }).catch(err= {
            if(err){
                throw(err)
            }
        })
    })

    app.get("/users/:id", (req,res) => {
        User.findById(req.params.id).then((user) => {
            if(user){
                res.json(user)
            }else{
                res.sendStatus(404);
            }
        }).catch(err = {
            if(err){
                throw err;
            }
        })
       
    })



app.listen(4548, () => {
    console.log("Up and running! -- This is our Product Catalog service");
})
