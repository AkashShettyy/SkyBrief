function WeatherBackground({ theme }) {
  return <div className={`weather-backdrop weather-backdrop-${theme}`} aria-hidden="true" />;
}

export default WeatherBackground;
