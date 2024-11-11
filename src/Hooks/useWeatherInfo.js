import { useState, useEffect } from 'react';

function useWeatherInfo(city) {

    const apiKey = import.meta.env.VITE_API_KEY;
    const [weather, setWeather] = useState(null)

    useEffect (() => {
        if(!city) return;

        const getWeather = async () => {
            try {
                
                const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)

                if(!res.ok) throw Error("Failed to fetch weather data")

                const data = await res.json()

                setWeather(data)
            }
            catch(e){
                console.log(e);
                setWeather(null)
            }
        }
        getWeather()

    }, [city])
    return weather  
}

export default useWeatherInfo