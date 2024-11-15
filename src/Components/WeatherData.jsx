import { useEffect, useState } from "react"
import useWeatherInfo from "../Hooks/useWeatherInfo"
import search_icon from '../Assets/search.png'
import clear_icon from '../Assets/clear.png'
import cloud_icon from '../Assets/cloud.png'
import drizzle_icon from '../Assets/drizzle.png'
import humidity_icon from '../Assets/humidity.png'
import rain_icon from '../Assets/rain.png'
import snow_icon from '../Assets/snow.png'
import wind_icon from '../Assets/wind.png'

function WeatherData() {

  const [cityInput, setCityInput] = useState("")
  const [city, setCity] = useState("london")
  const [showWeather, setShowWeather] = useState(null)
  const [error, setError] = useState(false)

  const weatherInfo = useWeatherInfo(city);

  const allIcons = {
    "01d": clear_icon,
    "01n": clear_icon,   
    "02d": cloud_icon,
    "02n": cloud_icon,   
    "03d": cloud_icon,
    "03n": cloud_icon,   
    "04d": drizzle_icon,
    "04n": drizzle_icon,   
    "09d": rain_icon,
    "09n": rain_icon,   
    "10d": rain_icon,
    "10n": rain_icon,   
    "13d": snow_icon,
    "13n": snow_icon,   
    }

    useEffect(() => {
        if(weatherInfo && weatherInfo.main && weatherInfo.weather && weatherInfo.weather[0]){
            
            const icon = allIcons[weatherInfo.weather[0].icon] || clear_icon;

            setShowWeather({
                temperature: Math.floor(weatherInfo.main.temp),
                humidity: weatherInfo.main.humidity,
                wind: weatherInfo.wind.speed,
                cityName: weatherInfo.name,
                countryName: weatherInfo.sys.country,
                icon: icon,
            })
            setError(null)
        }
        else{
            setShowWeather(null)
            setError("No weather data found")
        }
    }, [weatherInfo])

  return (
    <>
            <div className='app'>
                <div className='weather'>
                    <div className='search-bar'>
                        <input 
                            type="text" 
                            placeholder='search'
                            value={cityInput}
                            onChange={(e) => setCityInput(e.target.value)}
                            onKeyDown={(e) => {
                                if(e.key === "Enter"){
                                    setCity(cityInput.trim())
                                }
                            }} 
                        />
                        <img 
                            src={search_icon} 
                            alt="Search Button"
                            onClick={() => setCity(cityInput.trim())}     
                        />
                    </div>

                    {  weatherInfo === null ? (
                    <p className='error'>Loading...</p>
                    ) : error ? (
                    <p className='error'>{error}</p>
                    ): showWeather ? (
                        <>
                        <img src={showWeather.icon} alt="" className='weather-icon' />
                        <p className='temperature'>
                            {Math.floor(showWeather.temperature)}°C
                        </p>
                        <p className='location'>
                            {showWeather.cityName}, {showWeather.countryName}
                        </p>
                        <div className='weather-data'> 
                            <div className='col'>
                                <img src={humidity_icon} alt="" />
                                <div >
                                    <p> {showWeather.humidity}%</p>
                                    <span>Humidity</span>
                                </div>
                            </div>
                            <div className='col'>
                                <img src={wind_icon} alt="" />
                                <div >
                                    <p>{showWeather.wind} Km/h</p>
                                    <span>Wind</span>
                                </div>
                            </div>
                        </div>
                    </>
                    ) : (
                        <p className='error'>No data available</p>
                    )}

                </div>
            </div>
    </>
  )
}

export default WeatherData