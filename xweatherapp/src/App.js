import "./App.css";
import {  useState } from "react";
import axios from "axios";

function App() {
  const [city, setCity] = useState({});
  const [display, setDisplay] = useState({ data: false, load: false });
  let search = async (e) => {
    e.preventDefault();
    setDisplay({ data: false, load: true });
    const { text } = e.target.elements;
    console.log(text.value);
    try {
      let res = await axios.get("https://api.weatherapi.com/v1/current.json", {
        params: {
          Key: "cf2f2a6f9ffb42e594f75440232909",
          q: `${text.value}`,
        },
      });
      setCity(res.data);
      setDisplay({ data: true, load: false });
    } catch (e) {
      setDisplay({ data: false, load: false });
      alert("Failed to fetch weather data");
    }
  };
  return (
    <>
      <form onSubmit={search} className="form">
        <input type="text" name="text" className="input" />
        <button type="submit" className="btn">
          Search
        </button>
      </form>
      {display.data && (
        <div className="data">
          <div className="weather-cards">
            <div className="heading">Temperature</div>
            <div className="inner-data">{city.current.temp_c}°C</div>
          </div>
          <div className="weather-cards">
            <div className="heading">Humidity</div>
            <div className="inner-data">{city.current.humidity}%</div>
          </div>
          <div className="weather-cards">
            <div className="heading">Condition</div>
            <div className="inner-data">{city.current.condition.text}</div>
          </div>
          <div className="weather-cards">
            <div className="heading">Wind Speed</div>
            <div className="inner-data">{city.current.wind_kph}kph</div>
          </div>
        </div>
      )}
      {display.load && <p className="load">Loading data...</p>}
    </>
  );
}

export default App;
