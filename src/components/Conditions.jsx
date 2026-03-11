function Conditions({ weather, forecast, unit }) {
  if (!weather) return null;

  function buildTrend(items) {
    if (!items || items.length < 2) return "Insufficient data";
    const first = items[0].main.temp;
    const last = items[items.length - 1].main.temp;
    const diff = last - first;
    const symbol = unit === "metric" ? "°C" : "°F";

    if (Math.abs(diff) < 1) return "Stable over the next few hours";
    return diff > 0
      ? `Warming by ${Math.round(diff)}${symbol} over next ${items.length * 3}hrs`
      : `Cooling by ${Math.abs(Math.round(diff))}${symbol} over next ${items.length * 3}hrs`;
  }

  function formatVisibility(visibility) {
    if (!visibility && visibility !== 0) return "--";
    return unit === "metric"
      ? `${(visibility / 1000).toFixed(1)} km`
      : `${(visibility / 1609).toFixed(1)} mi`;
  }

  const forecastItems = forecast?.list.slice(0, 5);

  return (
    <section className="glass-card detail-card">
      <div className="panel-header">
        <h2>Conditions</h2>
        <span className="pill">{weather.weather[0].main}</span>
      </div>
      <dl className="detail-list">
        <div>
          <dt>Visibility</dt>
          <dd>{formatVisibility(weather.visibility)}</dd>
        </div>
        <div>
          <dt>Pressure</dt>
          <dd>{weather.main.pressure} hPa</dd>
        </div>
        <div>
          <dt>Cloud cover</dt>
          <dd>{weather.clouds.all}%</dd>
        </div>
        <div>
          <dt>Forecast trend</dt>
          <dd>{buildTrend(forecastItems)}</dd>
        </div>
      </dl>
    </section>
  );
}

export default Conditions;
