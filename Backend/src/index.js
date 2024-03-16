import { connectDB } from "./db/index.js";
import { app } from "./app.js";
import { upload } from "./middlewares/multer.middleware.js"
import { uploadFileOnCloudinary } from "./utils/cloudinary.js";
import { restaurant } from "./models/restaurant.models.js";
import { dishes } from "./models/dishes.models.js";

const port = process.env.PORT || 3000;

// Connect the DB 
connectDB();

// testing the home route
app.get('/', (req, res) => {
    res.status(200).send("Successfully connected");
})

// post the restaurant information
app.post('/api/newRestaurant', upload.single('file'), async (req, res) => {
    try {
        // Check if file is uploaded
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded.' });
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
            return res.status(500).json({ error: 'Failed to upload image to Cloudinary.' });
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
        console.error(error);
        res.status(400).json({ error: 'An error occurred while processing the request.' }); // 400 for bad request
    }
})


// get the all restaurant information 
app.get('/api/restaurants', (req, res) => {
    // it returns a promise
    // promise has two states -> resolve or reject
    restaurant.find().then(result => {
        res.status(200).json({ data: result, success: true });
    }).catch(error => {
        res.status(404).json({ error: error, success: false });
    })
})


// add a dish specific to a restaurant

app.post('/api/addNewDish/:tag', upload.single('file'), async (req, res) => {
    const restaurant_tag = req.params.tag;
    if (!req.file) {
        res.status(400).json({ error: 'Please Select an Image' });
    }

    console.log(req.file);

    const fileName = req.file.originalname;

    // const response = await uploadFileOnCloudinary(`\public\\temp\\${fileName}`);
    console.log("Successfully uploaded");

    const thumbnail = "";

    // if (!thumbnail) {
    //     res.status(500).json({ error: "File uploading error on cloudinary" });
    // }


    const { rest_password, dish_type, title, price, ratings, breakdown } = req.body;

    console.log(dish_type);
    dishes.create({
        restaurant_tag,
        rest_password,
        dish_type,
        title,
        price,
        ratings,
        breakdown,
        thumbnail
    }).then(result => {
        res.status(201).json({ data: result, success: true });
    }).catch(error => {
        res.status(400).json({ error: error, message: "Please Provide all the fields", success: false });
    })

})



app.listen(port, () => {
    console.log(`Server is Listening on port ${port}`);
})