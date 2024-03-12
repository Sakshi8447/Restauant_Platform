import mongoose from "mongoose"

const dishesSchema = new mongoose.Schema({
    dish_type: {
        type: String,
        enum: ['VEG', "NON_VEG"]
    },
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    ratings: {
        type: Number,
        min: 0,
        max: 5,
        default: 0
    },
    breakdown: {
        type: String, // 5 chapati, 1 mix veg, ............
    },
    thumbnail: {
        type: String,
        required: true
    }


}, { timestamps: true });

export const dishes = mongoose.model("dishes", dishesSchema);