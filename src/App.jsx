import useWeather from "./hooks/useWeather";
import SearchBar from "./components/SearchBar";

function App() {
  const { weather, forecast, isLoading, error, unit, searchCity, toggleUnit } =
    useWeather();

  return (
    <div>
      <h1>SkyBrief</h1>
      <SearchBar onSearch={searchCity} isLoading={isLoading} />
      {error && <p style={{ color: "red" }}>{error}</p>}
      {weather && (
        <p>
          {weather.name} — {Math.round(weather.main.temp)}°
        </p>
      )}
    </div>
  );
}

export default App;
