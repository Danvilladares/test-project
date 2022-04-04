const mongoose = require ("mongoose");

mongoose.model("Shopping-Cart",{
    
    UsersID: {
        type: mongoose.Schema.Types.ObjectId,
        require:true
    },
    ProductCatalogId: {
        type:mongoose.Schema.Types.ObjectId,
        require:true
    },
    Quantity:{
        type:Number,
        require:true
    }
   
})