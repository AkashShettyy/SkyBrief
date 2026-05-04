export function getTemperatureUnit(unit) {
  return unit === "metric" ? "°C" : "°F";
}

export function getWindUnit(unit) {
  return unit === "metric" ? "m/s" : "mph";
}

export function formatVisibilityDistance(visibility, unit) {
  if (!Number.isFinite(visibility)) return "--";

  return unit === "metric"
    ? `${(visibility / 1000).toFixed(1)} km`
    : `${(visibility / 1609).toFixed(1)} mi`;
}
