import config from "../config";

function assertApiKey() {
  if (!config.apiKey) {
    throw new Error("Missing OpenWeather API key");
  }
}

export async function fetchWeatherByCity(query, unit = "metric") {
  assertApiKey();

  let url;

  if (typeof query === "string" && query.includes(",")) {
    const [lat, lon] = query.split(",");
    url = `${config.baseUrl}/weather?lat=${lat}&lon=${lon}&appid=${config.apiKey}&units=${unit}`;
  } else {
    const city = encodeURIComponent(String(query).trim());
    url = `${config.baseUrl}/weather?q=${city}&appid=${config.apiKey}&units=${unit}`;
  }

  const response = await fetch(url);
  const data = await response.json();

  if (!response.ok) throw new Error(data.message || "City not found");
  return data;
}

export async function fetchForecast(lat, lon, unit = "metric") {
  assertApiKey();

  const url = `${config.baseUrl}/forecast?lat=${lat}&lon=${lon}&appid=${config.apiKey}&units=${unit}`;

  const response = await fetch(url);
  const data = await response.json();

  if (!response.ok) throw new Error(data.message || "Forecast unavailable");
  return data;
}
