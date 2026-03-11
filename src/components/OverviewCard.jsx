function OverviewCard({ weather, unit }) {
  if (!weather) return null;

  const temp = Math.round(weather.main.temp);
  const feelsLike = Math.round(weather.main.feels_like);
  const unitSymbol = unit === "metric" ? "°C" : "°F";
  const windUnit = unit === "metric" ? "m/s" : "mph";

  function getWeatherIcon(condition) {
    const c = condition.toLowerCase();
    if (c.includes("clear")) return "☀";
    if (c.includes("cloud")) return "☁";
    if (c.includes("rain") || c.includes("drizzle")) return "☂";
    if (c.includes("thunder")) return "⚡";
    if (c.includes("snow")) return "❄";
    if (c.includes("mist") || c.includes("fog")) return "〰";
    return "◌";
  }

  function formatTime(unixSeconds, offset) {
    const date = new Date((unixSeconds + offset) * 1000);
    return date.toUTCString().slice(17, 22);
  }

  const icon = getWeatherIcon(weather.weather[0].main);
  const description = weather.weather[0].description;

  return (
    <div className="overview-card glass-card">
      <div className="overview-top">
        <div>
          <p className="section-label">Current outlook</p>
          <h2>
            {weather.name}, {weather.sys.country}
          </h2>
          <p className="muted">
            {new Date().toLocaleDateString("en-US", {
              weekday: "short",
              hour: "numeric",
              minute: "2-digit",
            })}{" "}
            local time
          </p>
        </div>
        <div className="weather-icon">{icon}</div>
      </div>

      <div className="current-temp-row">
        <p className="current-temp">
          {temp}
          {unitSymbol}
        </p>
        <div className="temp-meta">
          <p className="muted">
            {description.charAt(0).toUpperCase() + description.slice(1)}
          </p>
          <p>
            Feels like {feelsLike}
            {unitSymbol}
          </p>
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
