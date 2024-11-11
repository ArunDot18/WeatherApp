import { useState } from "react"
import useWeatherInfo from "./Hooks/useWeatherInfo"

function App() {

  const [cityInput, setCityInput] = useState("Gandhinagar")
  const [city, setCity] = useState("Gandhinagar")
  const weatherInfo = useWeatherInfo(city)

  return (
    <>
      <div className="w-full min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-700 to-slate-600">
        <div className='w-full flex justify-center items-center'>
        <div className="w-full max-w-md mx-auto border border-gray-200 rounded-3xl p-8 shadow-lg bg-white/20 backdrop-blur-lg">
        <h1 className="text-4xl py-4 text-center font-sans text-white drop-shadow-md">
          Weather App
        </h1>

        <div className="flex space-x-2 mb-6">
          <input 
            type="text" 
            className="w-full h-12 border border-gray-300 outline-none rounded-full pl-4 text-lg text-gray-700 placeholder-gray-500 bg-white shadow-sm focus:ring-2 focus:ring-blue-500"
            placeholder='Enter city name'
            value={cityInput}
            onChange={(e) => setCityInput(e.target.value)}
            onKeyDown={(e) => {
              if(e.key === "Enter"){
                setCity(cityInput)
              }
            }}
            />
            
          <button 
            type='submit' 
            className="h-12 w-14 rounded-full flex items-center justify-center bg-blue-500 text-white shadow-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 transition ease-in-out duration-200"
            onClick={(e) => setCity(cityInput)}
          >
            Go !
          </button>
          </div>

          <div className="text-center space-y-2">
            {weatherInfo === null ? (
               <p className="text-center text-white">Loading...</p>
            ): weatherInfo.main ? (
              <div>
              <p className="text-4xl font-semibold text-white drop-shadow-md">{weatherInfo.main.temp} °C</p>

              <p className="text-xl text-white font-light drop-shadow-sm">Feels like : {weatherInfo.main.feels_like} °C</p>

              <p className="text-lg text-gray-200 italic">Description : {weatherInfo.weather[0].description} </p>
              </div>
            ) : (
              <p className="text-center text-white">No data available</p>
            )}

            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
