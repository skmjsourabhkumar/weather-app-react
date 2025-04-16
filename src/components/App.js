import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchEngine from "./SearchEngine";
import Forecast from "./Forecast";
import { SiAccuweather } from "react-icons/si";
import "../styles.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({
    data: {},
    error: false,
  });
  const [forecast, setForecast] = useState([]);
   const [loading,setLoading]=useState(true)
  const toDate = () => {
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const currentDate = new Date();
    return `${days[currentDate.getDay()]} ${currentDate.getDate()} ${months[currentDate.getMonth()]}`;
  };

  const search = async (event) => {
    event.preventDefault();
    if (event.type === "click" || (event.type === "keypress" && event.key === "Enter")) {
      setWeather({ ...weather});
      const apiKey = process.env.REACT_APP_API_KEY;
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=${apiKey}`;

      try {
        const res = await axios.get(url);
        console.log("Weather Data:", res.data);
        setWeather({ data: res.data,  error: false });
        setLoading(false);
      } catch (error) {
        setWeather({ ...weather, data: {}, error: true });
        console.error("Error fetching weather data:", error);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const apiKey = process.env.REACT_APP_API_KEY;
      console.log(process.env.REACT_APP_API_KEY)
      const url = `https://api.openweathermap.org/data/2.5/weather?q=Delhi&units=metric&appid=${apiKey}`;
      

      try {
        const response = await axios.get(url);
        console.log("Initial Weather Data:", response.data);
       
        setWeather({ data: response.data,error: false });
        setLoading(false)
      } catch (error) {
        console.log(error)
        setWeather({ data: {}, error: true });
        console.error("Error fetching initial weather data:", error);
      }
    };

    fetchData();
  }, []);
   console.log(weather)
   if(loading){
    <h4>Searching...</h4>
   }
  return (
    <div className="App">
      <div className="heading"> <div><SiAccuweather size={30}/></div>
      <div>
      <h1>Weather App By REACT JS</h1>
      </div>
      
      
      
      </div>
      <SearchEngine query={query} setQuery={setQuery} search={search} />
  
        {loading && <h4>Searching...</h4>}
         <Forecast weather={weather} toDate={toDate}></Forecast>

         

    </div>
  );
}

export default App;
