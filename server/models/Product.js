
const mongoose = require('mongoose');
const Schema= mongoose.Schema;

const productSchema = mongoose.Schema({
    
    writer:{
        type: Schema.Types.ObjectId,
        ref : 'User'
    },
    
    title:{
        type: String,
        maxlength: 100
    },
    
    description:{
        type: String,
        maxlength: 1000000000
    },
    
    price:{
        type:Number,
        default:0
    },

    images:{
        type:Array,
        maxlength:10
    },
    categories:{
        type:Number,
        default:1
    },
    sold:{
        type:Number,
        maxlength:20000,
        default:0
    }

},{timestamps:true})

productSchema.index({
    title:'text',
    description:'text'
},{
    weights:{
        title:5,
        description:1
    }
})

const Product = mongoose.model('Product', productSchema);

module.exports = { Product }



