function ForecastGrid({ forecast, unit }) {
  if (!forecast) return null;

  const unitSymbol = unit === "metric" ? "°C" : "°F";
  const items = forecast.list.slice(0, 5);

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

  return (
    <section className="glass-card forecast-card">
      <div className="panel-header">
        <h2>Next snapshots</h2>
        <span className="forecast-caption">Three-hour intervals</span>
      </div>

      <div className="forecast-grid">
        {items.map((item) => {
          const summary = item.weather[0];
          return (
            <article className="forecast-tile" key={item.dt}>
              <p className="forecast-time">
                {formatTime(item.dt, forecast.city.timezone)}
              </p>
              <div className="forecast-icon">
                {getWeatherIcon(summary.main)}
              </div>
              <p className="forecast-temp">
                {Math.round(item.main.temp)}
                {unitSymbol}
              </p>
              <p className="forecast-desc">
                {summary.description.charAt(0).toUpperCase() +
                  summary.description.slice(1)}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default ForecastGrid;
