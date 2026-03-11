import config from "../config";

export async function fetchWeatherByCity(city, unit = "metric") {
  const response = await fetch(
    `${config.baseUrl}/weather?q=${city}&appid=${config.apiKey}&units=${unit}`,
  );
  const data = await response.json();

  if (!response.ok) throw new Error(data.message || "City not found");
  return data;
}

export async function fetchForecast(lat, lon, unit = "metric") {
  const response = await fetch(
    `${config.baseUrl}/forecast?lat=${lat}&lon=${lon}&appid=${config.apiKey}&units=${unit}`,
  );
  const data = await response.json();

  if (!response.ok) throw new Error(data.message || "Forecast unavailable");
  return data;
}
