import { useState, useCallback } from "react";
import { fetchWeatherByCity, fetchForecast } from "../services/weatherService";

function useWeather() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [unit, setUnit] = useState("metric");

  const searchCity = useCallback(
    async (city) => {
      setIsLoading(true);
      setError(null);

      try {
        const weatherData = await fetchWeatherByCity(city, unit);
        const forecastData = await fetchForecast(
          weatherData.coord.lat,
          weatherData.coord.lon,
          unit,
        );
        setWeather(weatherData);
        setForecast(forecastData);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    },
    [unit],
  );

  const toggleUnit = useCallback(() => {
    setUnit((prev) => (prev === "metric" ? "imperial" : "metric"));
  }, []);

  return {
    weather,
    forecast,
    isLoading,
    error,
    unit,
    searchCity,
    toggleUnit,
  };
}

export default useWeather;
