function OverviewCard({ weather, unit }) {
  if (!weather) return null;

  const temp = Math.round(weather.main.temp);
  const feelsLike = Math.round(weather.main.feels_like);
  const tempMin = Math.round(weather.main.temp_min);
  const tempMax = Math.round(weather.main.temp_max);
  const unitSymbol = unit === "metric" ? "°C" : "°F";
  const windUnit = unit === "metric" ? "m/s" : "mph";

  function formatTime(unixSeconds, offset) {
    const date = new Date((unixSeconds + offset) * 1000);
    return date.toUTCString().slice(17, 22);
  }

  function formatCityTime(offset) {
    const localNow = new Date(Date.now() + offset * 1000);
    return localNow.toLocaleString("en-US", {
      weekday: "short",
      hour: "numeric",
      minute: "2-digit",
      timeZone: "UTC",
    });
  }

  function getThemeName(condition) {
    const c = condition.toLowerCase();
    if (c.includes("clear")) return "clear";
    if (c.includes("cloud")) return "clouds";
    if (c.includes("rain") || c.includes("drizzle")) return "rain";
    if (c.includes("thunder")) return "storm";
    if (c.includes("snow")) return "snow";
    return "default";
  }

  function getWeatherIcon(condition) {
    const c = condition.toLowerCase();
    if (c.includes("clear")) return "Clear";
    if (c.includes("cloud")) return "Clouds";
    if (c.includes("rain") || c.includes("drizzle")) return "Rain";
    if (c.includes("thunder")) return "Storm";
    if (c.includes("snow")) return "Snow";
    return "Sky";
  }

  function getBriefing(condition) {
    const c = condition.toLowerCase();
    if (c.includes("clear")) return "Clear conditions with stable visibility.";
    if (c.includes("cloud")) return "Cloud cover is present but conditions remain steady.";
    if (c.includes("rain") || c.includes("drizzle"))
      return "Rain activity is active. Expect reduced comfort outdoors.";
    if (c.includes("thunder"))
      return "Storm conditions may shift quickly. Plan with caution.";
    if (c.includes("snow")) return "Cold conditions with snow impacting visibility.";
    return "Stable atmospheric conditions across the city.";
  }

  const description = weather.weather[0].description;
  const theme = getThemeName(weather.weather[0].main);
  const conditionLabel =
    description.charAt(0).toUpperCase() + description.slice(1);
  const iconLabel = getWeatherIcon(weather.weather[0].main);

  return (
    <div className={`overview-card glass-card weather-${theme}`}>
      <div className="overview-top">
        <div>
          <p className="section-label">Current outlook</p>
          <h2>
            {weather.name}, {weather.sys.country}
          </h2>
          <p className="muted">{formatCityTime(weather.timezone)} local time</p>
        </div>
        <div className="condition-chip">
          <span className="condition-chip-kicker">{iconLabel}</span>
          <span>{conditionLabel}</span>
        </div>
      </div>

      <div className="current-temp-row">
        <div>
          <p className="current-temp">
            {temp}
            {unitSymbol}
          </p>
          <p className="temp-range muted">
            H:{tempMax}
            {unitSymbol} L:{tempMin}
            {unitSymbol}
          </p>
        </div>
        <div className="temp-meta">
          <p className="muted">Feels like {feelsLike + unitSymbol}</p>
          <p>
            Wind {weather.wind.speed.toFixed(1)} {windUnit}
          </p>
          <p className="summary-copy">{getBriefing(weather.weather[0].main)}</p>
        </div>
      </div>

      <div className="metrics-grid">
        <article className="metric-card">
          <span>Humidity</span>
          <strong>{weather.main.humidity}%</strong>
        </article>
        <article className="metric-card">
          <span>Wind</span>
          <strong>
            {weather.wind.speed.toFixed(1)} {windUnit}
          </strong>
        </article>
        <article className="metric-card">
          <span>Sunrise</span>
          <strong>{formatTime(weather.sys.sunrise, weather.timezone)}</strong>
        </article>
        <article className="metric-card">
          <span>Sunset</span>
          <strong>{formatTime(weather.sys.sunset, weather.timezone)}</strong>
        </article>
      </div>
    </div>
  );
}

export default OverviewCard;
