import {TextInput, Label, Select, FileInput, Button} from 'flowbite-react'
import { useState } from 'react'
import axios from 'axios'

export default function AddDishes() {
    const [error, setError] = useState("");

    const [file, setFile] = useState();
    const [tag, setTag] = useState("");
    const [password, setPassword] = useState("");
    const [title, setTitle] = useState("");
    const [dishType, setDishType] = useState("");
    const [price, setPrice] = useState("");
    const [breakdown, setBreakdown] = useState("");


    const AddNewDish = (e) => {
        e.preventDefault();
        console.log('====================================');
        console.log(file);
        console.log(tag);
        console.log(password);
        console.log(title);
        console.log(dishType);
        console.log(price);
        console.log(breakdown);
        console.log('====================================');

        const formData = new FormData();
        formData.append('file', file);
        formData.append('fileName', file.name);
        formData.append('tag', tag);
        formData.append('password', password);
        formData.append('title', title);
        formData.append('dishType', dishType);
        formData.append('price', price);
        formData.append('breakdown', breakdown);
        const config = {
            headers: {
              'content-type': 'multipart/form-data',
            },
          };

        axios.post(`http://localhost:5000/api/addNewDish/${tag}`, formData, config).then((response) => {
            console.log(response.data);
        }).catch((error) => {
            console.log(error);
            setError(error.message);
        })

    }


  return (
    <>
    
        <div className="flex justify-center items-center h-16">
            <h1 className="text-lg sm:text-2xl md:text-5xl text-center" >Add your Dishes</h1>
        </div>

        {/* add a form to take user input */}
        <div className="text-red-500 text-center">{error}</div>

      <form className="flex flex-col gap-4 m-20 justify-center">
        <div>
          <div>
            <Label htmlFor="file-upload-helper-text" value="Upload file" />
          </div>
          <FileInput id="file-upload-helper-text" helperText="SVG, PNG, JPG or GIF (MAX. 800x400px)." onChange={(e) => setFile(e.target.files[0])} accept="image/*" />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="Tag" value="Tag" />
          </div>
          <TextInput id="Tag" type="text" placeholder="Restaurant Tag(Must be unique)" required onChange={(e) => setTag(e.target.value)} />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="Password" value="Password" />
          </div>
          <TextInput id="Password" type="password" placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="Title" value="Title" />
          </div>
          <TextInput id="Title" type="text" placeholder="Restaurant Name" onChange={(e) => setTitle(e.target.value)} required />
        </div>
        
       
        <div>
          <div className="mb-2 block">
            <Label htmlFor="dishType" value="Select Dish Type" />
          </div>
          <Select id="dishType" onChange={(e) => setDishType(e.target.value)} required>
            <option>VEG</option>
            <option>NON_VEG</option>
          </Select>
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="price" value="Enter Price" />
          </div>
          <TextInput type="number" id="price" placeholder="Ex: $5" onChange={(e) => setPrice(e.target.value)} />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="breakdown" value="Enter Breakdown" />
          </div>
          <TextInput type="text" id="breakdown" placeholder="Ex: 4 Tawa Roti, 1 Mix Veg, Sweet Dish" onChange={(e) => setBreakdown(e.target.value)} required />
        </div>

        <Button type="submit" onClick={AddNewDish}>Add</Button>
      </form>
    </>
  )
}