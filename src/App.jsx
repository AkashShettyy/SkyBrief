import useWeather from "./hooks/useWeather";
import SearchBar from "./components/SearchBar";
import OverviewCard from "./components/OverviewCard";
import ForecastGrid from "./components/ForecastGrid";
import DayBrief from "./components/DayBrief";
import Conditions from "./components/Conditions";

function App() {
  const { weather, forecast, isLoading, error, unit, searchCity, toggleUnit } =
    useWeather();

  return (
    <div className="app-shell">
      <section className="hero-panel glass-card">
        <p className="eyebrow">Weather with product thinking</p>
        <h1>SkyBrief</h1>
        <SearchBar onSearch={searchCity} isLoading={isLoading} />
        {error && <p style={{ color: "#fca5a5" }}>{error}</p>}
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
