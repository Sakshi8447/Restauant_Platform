import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card } from 'flowbite-react';

export default function Home() {
  const [data, setData] = useState([]);
  const BASE_URL = 'http://localhost:5000';

  useEffect(() => {
    async function loadData() {
      try {
        const response = await axios.get(`${BASE_URL}/api/restaurants`);
        setData(response.data.data);
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    }
    loadData();
  }, []);

  return (
    <>
      <div className="flex justify-center items-center h-16">
        <h1 style={{ fontSize: '3rem', textAlign: 'center' }}>Find any Restaurant</h1>
      </div>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data.map((restaurant, index) => (
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
            <div className="mb-2 mt-2.5 flex items-center">
              <span className="rounded bg-cyan-100 px-2.5 py-0.5 text-xs font-semibold text-cyan-800 dark:bg-cyan-200 dark:text-cyan-800">
                {restaurant.ratings}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold text-gray-900 dark:text-white">{restaurant.serves}</span>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}