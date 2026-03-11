import { useEffect, useState } from "react";
import useWeather from "./hooks/useWeather";
import SearchBar from "./components/SearchBar";
import OverviewCard from "./components/OverviewCard";
import ForecastGrid from "./components/ForecastGrid";
import DayBrief from "./components/DayBrief";
import Conditions from "./components/Conditions";
import SavedCities from "./components/SavedCities";
import WeatherBackground from "./components/WeatherBackground";

function App() {
  const { weather, forecast, isLoading, error, unit, searchCity, toggleUnit } =
    useWeather();

  const [theme, setTheme] = useState("default");

  function handleLocationRequest() {
    if (!navigator.geolocation) return;
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
      () => console.log("Location denied"),
    );
  }

  useEffect(() => {
    if (!weather) return;
    const condition = weather.weather[0].main.toLowerCase();
    let newTheme = "default";
    if (condition.includes("clear")) newTheme = "clear";
    else if (condition.includes("cloud")) newTheme = "clouds";
    else if (condition.includes("rain") || condition.includes("drizzle"))
      newTheme = "rain";
    else if (condition.includes("thunder")) newTheme = "storm";
    else if (condition.includes("snow")) newTheme = "snow";
    document.body.dataset.theme = newTheme;
    setTheme(newTheme);
  }, [weather]);

  return (
    <>
      <WeatherBackground theme={theme} />
      <div className="app-shell">
        <section className="hero-panel glass-card">
          <p className="eyebrow">Weather with product thinking</p>
          <h1>SkyBrief</h1>
          <SearchBar
            onSearch={searchCity}
            onLocationRequest={handleLocationRequest}
            isLoading={isLoading}
            unit={unit}
            onToggleUnit={toggleUnit}
          />
          {error && <p style={{ color: "#fca5a5" }}>{error}</p>}
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
