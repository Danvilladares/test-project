const mongoose = require ("mongoose");

mongoose.model("Order",{
    
    UsersID: {
        type: mongoose.Schema.Types.ObjectId,
        require:true
    },
    ProductCatalogId:{
        type: mongoose.Schema.Types.ObjectId,
        require:true
    },
    date:{
        type: Date,
        require:true
    }

})