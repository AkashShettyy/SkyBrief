import useWeather from "./hooks/useWeather";
import SearchBar from "./components/SearchBar";
import OverviewCard from "./components/OverviewCard";

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
      </section>
    </div>
  );
}

export default App;
