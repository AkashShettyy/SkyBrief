export function getWeatherTheme(condition) {
  const value = condition.toLowerCase();
  if (value.includes("clear")) return "clear";
  if (value.includes("cloud")) return "clouds";
  if (value.includes("rain") || value.includes("drizzle")) return "rain";
  if (value.includes("thunder")) return "storm";
  if (value.includes("snow")) return "snow";
  return "default";
}

export function getConditionLabel(condition) {
  const value = condition.toLowerCase();
  if (value.includes("clear")) return "Clear";
  if (value.includes("cloud")) return "Clouds";
  if (value.includes("rain") || value.includes("drizzle")) return "Rain";
  if (value.includes("thunder")) return "Storm";
  if (value.includes("snow")) return "Snow";
  return "Sky";
}

export function getConditionBriefing(condition) {
  const value = condition.toLowerCase();
  if (value.includes("clear")) return "Clear conditions with stable visibility.";
  if (value.includes("cloud"))
    return "Cloud cover is present but conditions remain steady.";
  if (value.includes("rain") || value.includes("drizzle"))
    return "Rain activity is active. Expect reduced comfort outdoors.";
  if (value.includes("thunder"))
    return "Storm conditions may shift quickly. Plan with caution.";
  if (value.includes("snow")) return "Cold conditions with snow impacting visibility.";
  return "Stable atmospheric conditions across the city.";
}

export function formatWeatherDescription(description) {
  if (!description) return "";
  return description.charAt(0).toUpperCase() + description.slice(1);
}
