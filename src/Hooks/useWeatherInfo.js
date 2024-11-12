import { useState, useEffect } from 'react';

function useWeatherInfo(location) {

    const apiKey = import.meta.env.VITE_API_KEY;
    const [weather, setWeather] = useState(null)

    useEffect (() => {
        if(!location){
            return;
        }

        const getWeather = async () => {
            try {

                let apiUrl = ''

                if(location.city) {
                    apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location.city}&appid=${apiKey}&units=metric`
                }
                else if(location.latitude && location.longitude) {
                    apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&appid=${apiKey}&units=metric`
                }
                else {
                    throw new Error("location data is incomplete")
                }

                const res = await fetch(apiUrl)

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

    }, [location])
    return weather  
}

export default useWeatherInfo