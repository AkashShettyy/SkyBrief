import config from "../config";

export async function fetchWeatherByCity(query, unit = "metric") {
  let url;

  if (typeof query === "string" && query.includes(",")) {
    // it's coordinates from geolocation
    const [lat, lon] = query.split(",");
    url = `${config.baseUrl}/weather?lat=${lat}&lon=${lon}&appid=${config.apiKey}&units=${unit}`;
  } else {
    // it's a city name
    url = `${config.baseUrl}/weather?q=${query}&appid=${config.apiKey}&units=${unit}`;
  }

  const response = await fetch(url);
  const data = await response.json();

  if (!response.ok) throw new Error(data.message || "City not found");
  return data;
}

export async function fetchForecast(lat, lon, unit = "metric") {
  const url = `${config.baseUrl}/forecast?lat=${lat}&lon=${lon}&appid=${config.apiKey}&units=${unit}`;

  const response = await fetch(url);
  const data = await response.json();

  if (!response.ok) throw new Error(data.message || "Forecast unavailable");
  return data;
}
