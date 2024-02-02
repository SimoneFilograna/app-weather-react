import { useState, useEffect } from 'react'
import Card from './Components/Card';
import apiKey from './api-key';
import './App.css';

function App() {
  const [search, setSearch] = useState('');
  const [weather, setWeather] = useState(null)
  const [coords, setCoords] = useState(null)

  const key = apiKey;

  // fetch and set coord if we need using openweatherGeolocation 3.0 with subs

  // const coords = async () => {
  //   const res = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${search}&appid=${key}`);
  //   const data = await res.json();
  //   setLat(data[0].lat)
  //   setLong(data[0].lon)
  // }

  // obtain current coords

  const currentPosition = () => {
    navigator.geolocation.getCurrentPosition(position => {
      setCoords({
        long: position.coords.longitude,
        lat: position.coords.latitude
      })
    })
  }

  // starting api call with long and lat 

  const fetchCurrentWeather = async () => {
    const fetchWeather = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.long}&appid=${key}&lang=it&units=metric`);
    const data = await fetchWeather.json()
    setWeather(data)
  }

  // obtain coords if navigator is accepted by user
  useEffect(() => {
    if (navigator.geolocation) {
      currentPosition();
    }
  }, [])

  // Call api in coords state is not null
  useEffect(() => {
    if (coords) {
      fetchCurrentWeather()
    }
  }, [coords])


  // fetch weather using openweather 2.5 with free usage
  const fetchWeather = async () => {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search},it&appid=${key}&lang=it&units=metric`)
    const data = await res.json();
    setWeather(data)
  }

  // setting search state from input text
  const handleSearch = (e) => {
    setSearch(e.target.value)
  }

  // send form with finish data and fetch weather 
  const handleSubmit = (e) => {
    e.preventDefault()
    fetchWeather()
    setSearch("")
  }


  return (
    <main>

      <div className="container">

        <div className="title-container text-center mt-5">
          <h1 className='display-1 fw-semibold fst-italic'>React Weather</h1>
        </div>

        <div className='mt-5'>
          <form onSubmit={handleSubmit}>
            <div className="d-flex gap-3 justify-content-center">

              {/* setting controlled input */}
              <input className='form-control w-25'
                type="text"
                placeholder='Search your city'
                id='search'
                name='search'
                onChange={handleSearch}
                value={search}
              />
              <button type='submit' className='btn btn-primary'>Search</button>
            </div>
          </form>

        </div>

        {weather && <Card {...weather} />}
      </div>
    </main>
  )
}


export default App
