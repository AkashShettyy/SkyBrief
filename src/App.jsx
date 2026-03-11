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
      ({ coords }) => searchCity(`${coords.latitude},${coords.longitude}`),
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
