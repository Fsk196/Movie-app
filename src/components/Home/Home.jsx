import React, { useEffect, useState } from 'react'
import Card from '../Card'

const Home = () => {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.tvmaze.com/search/shows?q=all')
        const data = await response.json();

        const shuffledShows = data.sort(() => 0.5 - Math.random());

        const selectedShows = shuffledShows.slice(0, 6);

        setShows(selectedShows);
      } catch (error) {
        console.log(error) 
      }
    }
    fetchData();
  }, [])
  return (
    <div className='container mx-auto h-full'>
      <div className="flex justify-center ">
      <div className='flex flex-wrap justify-center my-10 drop-shadow-xl'>
        {shows.map(show => (
          <Card key={show.show.id} show={show.show} />
        ))}
      </div>
      </div>
    </div>
  )
}

export default Home