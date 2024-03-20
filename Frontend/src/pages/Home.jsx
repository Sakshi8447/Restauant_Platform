// import React from 'react'

import { useEffect, useState } from "react"
import axios from "axios";
import { Card } from 'flowbite-react';

export default function Home() {

  // the get restaurant api should be called 
  // as soon as the website loads

  // const [count, setCount] = useState();
  const [data, setData] = useState([]);

  const BASE_URL = "http://localhost:5000";

  useEffect(() => {
    // this is the function to load all the restaurnats from backend
    async function loadData() {
      await axios.get(`${BASE_URL}/api/restaurants`).then(result => {
        console.log(result.data.data);
        setData(result.data.data);
        console.log(data);
      }).catch(error => {
        console.log(error);
      })
    }
    loadData();

  }, []);

  return (
    <>

      {
        data.map((restaurant, index) => {
          return (
            <>
              <Card
                className="max-w-sm"
                imgAlt={restaurant.title}
                imgSrc={restaurant.thumbnail}
                key={index}
              >
                <a href="#">
                  <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                    {restaurant.title}
                  </h5>
                </a>
                <div className="mb-5 mt-2.5 flex items-center">
                  <span className="ml-3 mr-2 rounded bg-cyan-100 px-2.5 py-0.5 text-xs font-semibold text-cyan-800 dark:bg-cyan-200 dark:text-cyan-800">
                    {restaurant.ratings}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">{restaurant.serves}</span>
                  
                </div>
              </Card>
            </>
          )
        })
      }
    </>
  )
}