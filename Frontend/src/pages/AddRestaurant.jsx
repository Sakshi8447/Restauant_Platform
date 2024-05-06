// import React from 'react'
import axios from "axios";
import { Label, TextInput, Select, Button, FileInput } from "flowbite-react"
import { useState } from "react"

export default function AddRestaurant() {
  
  const [error, setError] = useState("");

  const [tag, setTag] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [serves, setServes] = useState("");
  const [coupons, setCoupons] = useState("");
  const [contact, setContact] = useState("");
  const [file, setFile] = useState();

  const registerNewRestaurant = async (e) => {
    e.preventDefault();

    console.log('====================================');
    console.log(tag);
    console.log(password);
    console.log(title);
    console.log(description);
    console.log(city);
    console.log(state);
    console.log(serves);
    console.log(coupons);
    console.log(contact);
    console.log(file);
    console.log('====================================');

    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', file.name);

    formData.append('tag', tag);
    formData.append('password', password);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('country', 'India');
    formData.append('city', city);
    formData.append('state', state);
    formData.append('serves', serves);
    formData.append('coupons', coupons);
    formData.append('contact', contact);


    // configuration to add the images to backend - config is required to add the images to backend
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };

    await axios.post("http://localhost:5000/api/newRestaurant", formData, config).then((res) => {
      console.log(res.data)
      setError(res.data.message);
    })
    .catch((error) => {
      console.log(error);
      setError(error.message); 
    })
    
    
  }


  return (
    <>
      <div className="flex justify-center items-center h-16">
        <h1 className="text-lg sm:text-2xl md:text-5xl text-center" >Register Your Restaurant With Us !</h1>
      </div>

      {/* add a form to take user input */}

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
            <Label htmlFor="Description" value="Description" />
          </div>
          <TextInput id="Description" type="text" placeholder="Description" onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="Country" value="Country" />
          </div>
          <TextInput id="Country" type="text" placeholder="India" disabled />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="states" value="Select your state" />
          </div>
          <Select id="states" onChange={(e) => setState(e.target.value)} required>
            <option>Andhra Pradesh</option>
            <option>Arunachal Pradesh</option>
            <option>Assam</option>
            <option>Bihar</option>
            <option>Chhattisgarh</option>
            <option>Goa</option>
            <option>Gujarat</option>
            <option>Haryana</option>
            <option>Himachal Pradesh</option>
            <option>Jharkhand</option>
            <option>Karnataka</option>
            <option>Kerala</option>
            <option>Madhya Pradesh</option>
            <option>Maharashtra</option>
            <option>Manipur</option>
            <option>Meghalaya</option>
            <option>Mizoram</option>
            <option>Nagaland</option>
            <option>Odisha</option>
            <option>Punjab</option>
            <option>Rajasthan</option>
            <option>Sikkim</option>
            <option>Tamil Nadu</option>
            <option>Telangana</option>
            <option>Tripura</option>
            <option>Uttarakhand</option>
            <option>Uttar Pradesh</option>
            <option>West Bengal</option>


          </Select>
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="city" value="Select your City" />
          </div>
          <TextInput id="city" type="text" placeholder="Enter your city" onChange={(e) => setCity(e.target.value)} required />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="serves" value="Select Type" />
          </div>
          <Select id="serves" onChange={(e) => setServes(e.target.value)} required>
            <option>VEG</option>
            <option>NON_VEG</option>
            <option>BOTH</option>
          </Select>
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="coupons" value="Enter Coupons" />
          </div>
          <TextInput type="text" id="coupons" placeholder="Enter Coupoon (if any)" onChange={(e) => setCoupons(e.target.value)} />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="contact" value="Enter Contact" />
          </div>
          <TextInput type="number" id="contact" placeholder="Ex: +123-456-789" onChange={(e) => setContact(e.target.value)} required />
        </div>

        <Button type="submit" onClick={registerNewRestaurant}>Register</Button>
      </form>
    </>
  )
}