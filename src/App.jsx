import useWeather from "./hooks/useWeather";
import SearchBar from "./components/SearchBar";
import OverviewCard from "./components/OverviewCard";
import ForecastGrid from "./components/ForecastGrid";
import DayBrief from "./components/DayBrief";
import Conditions from "./components/Conditions";
import SavedCities from "./components/SavedCities";

function App() {
  const { weather, forecast, isLoading, error, unit, searchCity, toggleUnit } =
    useWeather();

  function handleLocationRequest() {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        // Use reverse geocoding to get city name first
        fetch(
          `https://api.openweathermap.org/geo/1.0/reverse?lat=${coords.latitude}&lon=${coords.longitude}&limit=1&appid=${import.meta.env.VITE_API_KEY || "0a9ab475141038b65fcea231b8a22312"}`,
        )
          .then((res) => res.json())
          .then((data) => {
            if (data && data[0]) {
              searchCity(data[0].name); // gets "Bangalore" not a landmark
            }
          });
      },
      () => console.log("Location denied"),
    );
  }

  return (
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
  );
}
export default App;
