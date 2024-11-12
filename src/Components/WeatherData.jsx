import React, { useEffect, useState } from 'react'
import useWeatherInfo from '../Hooks/useWeatherInfo'

function WeatherData() {

    const [cityInput, setCityInput] = useState("")
    const [city, setCity] = useState("")
    const [location, setLocation] = useState(null)
    const [isGeolocationFetched, setIsGeolocationFetched] = useState(false)

    const weatherInfo = useWeatherInfo(location ? location : {city})

    useEffect(() => {
        if(navigator.geolocation && !location && !isGeolocationFetched){
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const {latitude, longitude} = position.coords
                    setLocation({latitude, longitude})
                    setIsGeolocationFetched(true)
                },
                (e) => {
                    console.log(e)
                    setIsGeolocationFetched(true)
                }
            )
        }
    }, [location, isGeolocationFetched])

    const cityChange = () => {
        setCity(cityInput)
        setLocation(null)
        setIsGeolocationFetched(true)
    }

    return (
        <div className="w-full min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-600 to-indigo-800">
          <div className='w-full flex justify-center items-center'>
            <div className="w-full max-w-md mx-auto rounded-3xl p-6 bg-white/30 border border-gray-200 shadow-2xl backdrop-blur-lg">
                <h1 className="text-4xl font-bold py-4 text-center text-gray-100 drop-shadow-lg tracking-wide">
                    Weather App
                </h1>
  
                    <div className="flex space-x-2 mb-6">
                        <input 
                            type="text" 
                            className="w-full h-12 rounded-full pl-5 text-lg text-gray-800 placeholder-gray-500 bg-white focus:ring-2 focus:ring-blue-400 border-none shadow-md transition-all"
                            placeholder='Enter city name'
                            value={cityInput}
                            onChange={(e) => setCityInput(e.target.value)}
                            onKeyDown={(e) => {
                                if(e.key === "Enter"){
                                    cityChange()
                                }
                            }}
                        />
              
                            <button 
                            type='submit' 
                            className="h-12 w-14 rounded-full flex items-center justify-center bg-blue-600 text-white font-medium shadow-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-300 transition duration-150 ease-in-out"
                            onClick={(e) => cityChange}
                            >
                            Go !
                        </button>
                    </div>
  
                    <div className="text-center space-y-2">
                        {weatherInfo === null ? (
                            <p className="text-center text-white">Loading...</p>
                            ): weatherInfo.main ? (
                                <div className="space-y-2">
                                    <p className="text-5xl font-extrabold text-white drop-shadow-md">
                                        {weatherInfo.main.temp}°C
                                    </p>
                                    <p className="text-2xl text-gray-200 font-light">Feels like: {weatherInfo.main.feels_like}°C</p>
                                    <p className="text-lg text-gray-300">Humidity: {weatherInfo.main.humidity}%</p>
                                    <p className="text-lg text-gray-300">Wind: {weatherInfo.wind.speed} km/h</p>
                                    <p className="text-lg text-gray-400 italic">Description: {weatherInfo.weather[0].description}</p>
                                    <p className="text-xl text-gray-200 font-semibold">{weatherInfo.name}, {weatherInfo.sys.country}</p>
                                </div> 
                            ) : (
                                    <p className="text-center text-white">No data available</p>
                                )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WeatherData

