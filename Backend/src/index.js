import { connectDB } from "./db/index.js";
import { app } from "./app.js";
import { upload } from "./middlewares/multer.middleware.js"
import { uploadFileOnCloudinary } from "./utils/cloudinary.js";
import { restaurant } from "./models/restaurant.models.js";
import { dishes } from "./models/dishes.models.js";
import cors from "cors";
import bcrypt from "bcrypt"

app.use(cors(process.env.CORS_OPTIONS));

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
    restaurant.find().select("-password").then(result => {
        res.status(200).json({ data: result, success: true });
    }).catch(error => {
        res.status(404).json({ error: error, success: false });
    })
})


// add a dish specific to a restaurant


app.post('/api/addNewDish/:tag', upload.single("file") , async(req,res) => {
    // if the restaurant is registerd with the tag and password??
    const tag = req.params.tag;
    console.log(tag);

    const {password} = req.body;
    console.log(password);

    // if there is no file then return error!!
    // if(!req.file) {
    //     res.status(400).json({data: "Thumbnail is missing", success: false});
    // }

    // traverse in the restaurant db to find if it exists or not
    try {
        const result = await restaurant.find({tag});
        console.log(result);
        if(!result) {
            res.status(404).json({error: "No Restaurant exists!", success: false});
        }


        const isValid = await result.isPasswordCorrect(password);
        console.log(isValid);
        if(!isValid){
            res.status(400).json({data: "error"})
        }
        
        res.status(200).json({data: "hello", success: true})
    } catch (error) {
        res.status(400).json({data: "Please Provide all the fields", error: error, success: false});
    }

    // restaurant.find({tag}).then(async(result)=> {
    //     if(result.length == 0) {
    //         res.status(404).json({error: "No Restaurant exists!", success: false});
    //     }
    //     if(result.length == 1) {

    //         const vaildPassword = result.isPasswordCorrect(password);
    //         console.log(vaildPassword);
    //         if(!vaildPassword) {
    //             res.status(404).json({data: "Password didn't match", success: false});
    //         }
    //         const fileName = req.file.originalname;

    //         // Handling Asynchronous Operations
    //         // backward slash -> \public\\temp\\${fileName}
    //         const response = await uploadFileOnCloudinary(`\public\\temp\\${fileName}`);
    //         console.log("successfully uploaded");
            
    //         const thumbnail = response.url || "";
    //         if(thumbnail == "") {
    //             res.status(400).json({data: "Upload on cloudinary error", success: false});
    //         } 

    //         const {dish_type, title, price, ratings, breakdown} = req.body;

    //         if(!title || !price) 
    //         {
    //             res.status(400).json({data: "Title & Price are mandatory", success: false});
    //         }

    //         dishes.create({
    //             tag,
    //             dish_type,
    //             title,
    //             price,
    //             ratings,
    //             breakdown,
    //             thumbnail
    //         }).then((result) => {
    //             res.status(201).json({data: result, success: true});
    //         }).catch(err => {
    //             res.status(400).json({error: err, success: false});
    //         })
    //     }
    // }).catch(error => {
    //     res.status(400).json({data: "Please Provide all the fields", error: error, success: false});
    // })

})




// app.post('/api/addNewDish/:tag', upload.single('file'), async (req, res) => {

//     const restaurant_tag = req.params.tag;
//     if (!req.file) {
//         res.status(400).json({ error: 'Please Select an Image' });
//     }

//     console.log(req.file);

//     const fileName = req.file.originalname;

//     const response = await uploadFileOnCloudinary(`\public\\temp\\${fileName}`);
//     console.log("Successfully uploaded");

//     const thumbnail = response.url || "";

//     if (!thumbnail) {
//         res.status(500).json({ error: "File uploading error on cloudinary" });
//     }


//     const { rest_password, dish_type, title, price, ratings, breakdown } = req.body;

//     restaurant.find({ tag: restaurant_tag, password: rest_password }).then(result => {
//         if (result.length === 0) {
//             res.status(404).json({ message: "Invalid Restaurant Tag or Password", success: false });
//         } else {
//             dishes.create({
//                 restaurant_tag,
//                 dish_type,
//                 title,
//                 price,
//                 ratings,
//                 breakdown,
//                 thumbnail
//             }).then(result => {
//                 res.status(201).json({ data: result, success: true });
//             }).catch(error => {
//                 res.status(400).json({ error: error, message: "Please Provide all the fields", success: false });
//             })
//         }
//     }).catch(error => {
//         res.status(400).json({ error: error, message: "Please Enter the correct Password", success: false });
//     })



// })




// get the all dishes specific to a restaurant
app.get('/api/dishes/:tag', (req, res) => {
    const restaurant_tag = req.params.tag; // get the tag from the url
    dishes.find({ restaurant_tag }).then(result => {
        res.status(200).json({ data: result, success: true });
    }).catch(error => {
        res.status(404).json({ error: error, success: false });
    })
})


app.listen(port, () => {
    console.log(`Server is Listening on port ${port}`);
})