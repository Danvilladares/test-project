const mongoose = require ("mongoose");

mongoose.model("Product-Catalog",{
    
    name: {
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    price:{
        type: Number,
        require:true
    },
    availability:{
        type:String,
        require:true
    }


})