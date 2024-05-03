import { connectDB } from "./db/index.js";
import { app } from "./app.js";
import { upload } from "./middleware/multer.middleware.js";
import { uploadFileOnCloudinary } from "./utils/cloudinary.js";
import { restaurant } from "./models/restaurants.models.js";
import { dishes } from "./models/dishes.models.js";
import cors from "cors";
import { ApiError } from "./utils/ApiError.js";


app.use(cors(process.env.CORS_OPTIONS));

const port = process.env.PORT || 3000;

// Connect the DB 
connectDB();

// testing the home route
app.get('/', (req, res) => {
    res.status(200).send("Successfully connected");
})

// post the restaurant information
app.post('/api/newRestaurant', upload.single('file'), async (req, res, next) => {
    try {
        // Check if file is uploaded
        if (!req.file) {
            next(ApiError(400,"File Doesn't exist"))
            // return res.status(400).json({ error: 'No file uploaded.' });
        }
        console.log(req.file);

        const fileName = req.file.originalname;

        // Handling Asynchronous Operations
        // backward slash -> \public\\temp\\${fileName}
        const response = await uploadFileOnCloudinary(`\public\\temp\\${fileName}`);
        console.log("successfully uploaded");

        // Accessing Request Body - destructring the code.
        const { tag, password, title, description, city, state, country, ratings, serves, coupons, isOpen, contact } = req.body;

        // Response from Cloudinary
        const thumbnail = response.url || ''; // Default to empty string if url is not available

        // If thumbnail URL is not generated
        if (!thumbnail) {
            next(ApiError(500, "Failed to upload image"));
            // return res.status(500).json({ error: 'Failed to upload image to Cloudinary.' });
        }

        const result = await restaurant.create({
            tag,
            password,
            title,
            description,
            city,
            state,
            country,
            ratings,
            serves,
            coupons,
            isOpen,
            contact,
            thumbnail
        });

        res.status(201).json(result); // 201 for created
    } catch (error) {
        
        next(error);
    }
})


// get the all restaurant information 
app.get('/api/restaurants', (req, res, next) => {
    // it returns a promise
    // promise has two states -> resolve or reject
    restaurant.find().select("-password").then(result => {
        res.status(200).json({ data: result, success: true });
    }).catch(error => {
        next(error)
    })
})


// add a dish specific to a restaurant


app.post('/api/addNewDish/:tag', upload.single("file"), async (req, res, next) => {
    // if the restaurant is registerd with the tag and password??
    const tag = req.params.tag;
    console.log(tag);

    const { password } = req.body;
    console.log(password);

    if (!req.file) {
        next(ApiError(400, "File not exists"));
        // res.status(400).json({ message: "File not exists", success: false });
    }


    try {
        const result = await restaurant.findOne({ tag });

        // console.log(result.password);

        if (result == null) {
            next(ApiError(404, "No Restaurant exists!"));
            // res.status(404).json({ error: "No Restaurant exists!", success: false });
        }

        // to check the password given by the user and saved by the user
        const isValid = await result.isPasswordCorrect(password);
        console.log(isValid);
        if (!isValid) {
            next(ApiError(400, "Password didn't match"))
            // res.status(400).json({ message: "Password didn't match", success: false })
        }

        // upload the file on cloudinary by the function
        const fileName = req.file.originalname;
        const response = await uploadFileOnCloudinary(`\public\\temp\\${fileName}`);
        console.log("successfully uploaded");

        const thumbnail = response.url || "";
        if (thumbnail == "") {
            next(ApiError(400, "Upload on cloudinary error"))
            // res.status(400).json({ data: "Upload on cloudinary error", success: false });
        }

        // create the dish by the information given by the user
        const { dish_type, title, price, ratings, breakdown } = req.body;

        if (!(title && price)) {
            next(ApiError(400, "Title & Price are mandatory"))
            // res.status(400).json({ data: "Title & Price are mandatory", success: false });
        }

        const dish = await dishes.create({
            tag,
            dish_type,
            title,
            price,
            ratings,
            breakdown,
            thumbnail
        });
        console.log(dish);

        res.status(200).json({ message: "Dish Added Succesfully", data: dish, success: true });

    } catch (error) {
        next(error);
    }

})


// to write the api to fetch the dishes linked with a particular restaurant
app.get('/api/dishes/:tag', async(req,res,next) => {
    // take the tag from params
    const tag = req.params.tag;

    // find if there is any restaurant with the given tag
    const result = await restaurant.findOne({tag});

    // if not then return error
    if(result == null) {
        next(ApiError(404, "No Restaurant Exists"));
    }

    // if exists then return dishes
    await dishes.find({tag}).then(result => {
        res.status(200).json({data: result, success: true})
    }).catch(error => {
        next(error);
    })


})




app.listen(port, () => {
    console.log(`Server is Listening on port ${port}`);
})