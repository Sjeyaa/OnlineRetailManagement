const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name : {
        type: String,
        required: [true,"Please enter product Name"],
        trim: true,
        maxlength: [100,"Product Name cannot exceed 100 chars"]
    },
    price:{
        type: Number,
        required: true,
        default: 0.0,

    },
    description: {
        type: String,
        required: [true,"Please enter product description"]
    },
    ratings:{
        type: String,
        default: 0
    },
    images:[
        {
            image:{
                type: String,
                required:true
            }
        }

    ],
    category:{
        type: String,
        required:[true,"Please enter product Category"],
        enum:{
            values:[
                'Electronics',
                'Mobile Phones',
                'Laptops',
                'Accessories',
                'Headphones',
                'Food',
                'Books',
                'Cloths/Shoes',
                'Beauty/Health',
                'Sports',
                'Outdoor',
                'Home'
            ],
            message: "Please select correct category"
        }
    },
    seller:{
        type: String,
        required: [true,"Please enter product seller"]
    },
    stock:{
        type: Number,
        required:[true,"Please enter product stock"],
        maxlength: [20, 'Stock not exceed 20']
    },
    numberOfReviews:{
        type: Number,
        default:0
    },
    reviews:[
        {
            user: mongoose.Schema.Types.ObjectId,
            rating:{
                type: String,
                required: true
            },
            comment:{
                type: String,
                required:true
            }
        }
    ],
    user:{
        type: mongoose.Schema.Types.ObjectId

    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
})
const schema = mongoose.model('Product',productSchema)

module.exports = schema