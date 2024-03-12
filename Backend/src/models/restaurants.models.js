// 1) 
import mongoose from "mongoose"


const variety = new mongoose.Schema({
    name: {
        type: String,
        enum: ['VEG', 'NON_VEG']
    }
})

// 2)
const restaurantSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    ratings: {
        type: Number,
        min: 1,
        max: 5,
        default: 1
    },
    thumbnail: {
        type: String,
        required: true
    },
    serves: {
        type: [variety],
        required: true
    },
    coupons: {
        type: String, // UC50
    },
    isOpen: {
        type: Boolean,
        default: false
    },
    contact: {
        type: String,
        required: true
    },
    dishes: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "dishes"
    }
}, { timestamps: true })

// 3)

export const restaurant = mongoose.model("restaurant", restaurantSchema);