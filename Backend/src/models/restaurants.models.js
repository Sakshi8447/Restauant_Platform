// 1) 
import mongoose from "mongoose"
import bcrypt from "bcrypt"

const restaurantSchema = new mongoose.Schema({
    tag: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
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
    serves: [
        {
            type: String,
            enums: ["VEG", "NON_VEG"]
        }
    ],
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
}, { timestamps: true })


// middleware to hash (encrypt) the password
restaurantSchema.pre("save", async function (next) {
    // if password field is not modified then return next();
    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10);
    next();
    // if(isModified(password) ) {
    //     this.password = await bcrypt.hash(this.password, 10);
    //     next();
    // }else {
    //     next();
    // }
});

// to compare the password given by the user with the stored password.
// async await 
restaurantSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
}

export const restaurant = mongoose.model("restaurant", restaurantSchema);

// export {restaurant, isPasswordCorrect}