import { getTemperatureUnit, getWindUnit } from "../utils/units";
import {
  getConditionBriefing,
  getConditionLabel,
  getWeatherTheme,
} from "../utils/weatherConditions";

function OverviewCard({ weather, unit }) {
  if (!weather) return null;

  const temp = Math.round(weather.main.temp);
  const feelsLike = Math.round(weather.main.feels_like);
  const tempMin = Math.round(weather.main.temp_min);
  const tempMax = Math.round(weather.main.temp_max);
  const unitSymbol = getTemperatureUnit(unit);
  const windUnit = getWindUnit(unit);

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

  const description = weather.weather[0].description;
  const theme = getWeatherTheme(weather.weather[0].main);
  const conditionLabel =
    description.charAt(0).toUpperCase() + description.slice(1);
  const iconLabel = getConditionLabel(weather.weather[0].main);

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
          <p className="summary-copy">
            {getConditionBriefing(weather.weather[0].main)}
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
