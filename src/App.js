import './App.css';
import React from 'react';
import { useState } from 'react';
import axios from 'axios'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';


function GetWeather() {

  const [cityname, setCityname] = useState(null);
  
  const [weather, setWeather] = useState(null);
  const API_KEY = process.env.REACT_APP_WEATHER_APIKEY;
  const URL = 'https://api.openweathermap.org/data/2.5/weather?q=';
  const ICON_URL = 'http://openweathermap.org/img/wn/';

  async function fetchData() {
    try {
      let response = await axios.get(`${URL}${cityname}&appid=${API_KEY}&units=metric`);
        setWeather(response.data);
    }
    catch(error) {
      console.log(error);
    }
  }

  return (
    <div className='container'>
      <h1>React Weather Application</h1>
      <p>
        This application will fetch a weather forecast from the OpenWeather.
        Just type city name and click Get Forecast button!
      </p>
      <form onSubmit={(e) => e.preventDefault()}>
        <TextField label="Cityname" 
            defaultValue={cityname}
            id="outlined-basic"
            onChange={ (event) => setCityname(event.target.value)}
            color="white"
            sx={{alignContent: 'center', justifyContent: 'center', margin: '5px'}}
        />
        <Button variant="contained" 
            color="primary" 
            size="small"
            onClick={() => fetchData()}
            sx={{ padding: '10px', margin: '10px', fontSize: '16px', borderRadius: '5px' }}
        >
            Get Forecast
        </Button>
      </form>
      <h2>Loaded weather forecast</h2>
        { weather !== null &&          
          <div className='weatherData'>
            City: {weather.name}<br/>
            Main: {weather.weather[0].main}<br/>
            Temp: {weather.main.temp} °C<br/>
            Feels: {weather.main.feels_like} °C<br/>
            Min-Max: {weather.main.temp_min} - {weather.main.temp_max} °C<br/>
            <img
              alt={cityname} 
              style={{height: 100, width: 100}}
              src={ICON_URL+weather.weather[0].icon+'.png'}/>
          </div>
        }

        { weather === null &&
          <p>-</p>
        }
    </div>
  );
}


function App() {
  return (
    <div className="App">
      <GetWeather/>
    </div>
  );
}

export default App;