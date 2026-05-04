import { useEffect, useState } from "react";
import useWeather from "./hooks/useWeather";
import SearchBar from "./components/SearchBar";
import OverviewCard from "./components/OverviewCard";
import ForecastGrid from "./components/ForecastGrid";
import DayBrief from "./components/DayBrief";
import Conditions from "./components/Conditions";
import SavedCities from "./components/SavedCities";
import WeatherBackground from "./components/WeatherBackground";
import { getWeatherTheme } from "./utils/weatherConditions";

function App() {
  const { weather, forecast, isLoading, error, unit, searchCity, toggleUnit } =
    useWeather();

  const [theme, setTheme] = useState("default");
  const [locationError, setLocationError] = useState(null);

  function handleLocationRequest() {
    if (!navigator.geolocation) {
      setLocationError("Location is not supported by this browser.");
      return;
    }

    setLocationError(null);
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        fetch(
          `https://api.openweathermap.org/geo/1.0/reverse?lat=${coords.latitude}&lon=${coords.longitude}&limit=1&appid=${import.meta.env.VITE_API_KEY}`,
        )
          .then((res) => res.json())
          .then((data) => {
            if (data && data[0]) {
              searchCity(data[0].name);
            }
          });
      },
      () => setLocationError("Location permission was denied."),
    );
  }

  function handleCitySearch(city) {
    setLocationError(null);
    searchCity(city);
  }

  useEffect(() => {
    if (!weather) return;
    const newTheme = getWeatherTheme(weather.weather[0].main);
    document.body.dataset.theme = newTheme;
    setTheme(newTheme);
  }, [weather]);

  return (
    <>
      <WeatherBackground theme={theme} />
      <div className="app-shell">
        <section className="hero-panel glass-card">
          <p className="eyebrow">Weather intelligence</p>
          <h1>SkyBrief</h1>
          <p className="hero-copy">
            Search any city and review current conditions, near-term forecast,
            and practical daily guidance in one place.
          </p>
          <SearchBar
            onSearch={handleCitySearch}
            onLocationRequest={handleLocationRequest}
            isLoading={isLoading}
            unit={unit}
            onToggleUnit={toggleUnit}
          />
          {(error || locationError) && (
            <p className="error-text">{error || locationError}</p>
          )}
          <SavedCities currentCity={weather?.name} onCitySelect={searchCity} />
        </section>

        <section className="dashboard-panel">
          <OverviewCard weather={weather} unit={unit} />
          <div className="briefing-grid">
            <DayBrief weather={weather} />
            <Conditions weather={weather} forecast={forecast} unit={unit} />
          </div>
          <ForecastGrid forecast={forecast} unit={unit} />
        </section>
      </div>
    </>
  );
}

export default App;
