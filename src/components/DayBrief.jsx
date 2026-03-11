function DayBrief({ weather }) {
  if (!weather) return null;

  function buildAdvice(weather) {
    const condition = weather.weather[0].main.toLowerCase();
    const temp = weather.main.temp;
    const wind = weather.wind.speed;
    const humidity = weather.main.humidity;

    if (condition.includes("thunder"))
      return {
        tag: "Caution",
        message:
          "Thunderstorm conditions are active. Avoid outdoor plans if possible and expect sudden disruption.",
      };
    if (condition.includes("rain") || condition.includes("drizzle"))
      return {
        tag: "Umbrella",
        message:
          "Rain is in play. Plan for slower commutes, carry waterproof gear, and avoid leaving electronics exposed.",
      };
    if (temp >= 32)
      return {
        tag: "Heat",
        message:
          "It is running hot outside. Keep water nearby, limit long exposure, and prefer shaded or indoor plans.",
      };
    if (temp <= 8)
      return {
        tag: "Layer up",
        message:
          "The air is cold enough to affect comfort quickly. Add layers and expect mornings and evenings to feel sharper.",
      };
    if (wind >= 10)
      return {
        tag: "Windy",
        message:
          "Wind speeds are elevated. Light outdoor plans are still workable, but cycling and longer walks may feel rougher.",
      };
    if (humidity >= 80)
      return {
        tag: "Sticky",
        message:
          "Humidity is high, so it may feel warmer than the reading suggests. Dress lighter and expect lower comfort outdoors.",
      };
    return {
      tag: "Good window",
      message:
        "Conditions look balanced. This is a strong window for commuting, short walks, and general outdoor plans.",
    };
  }

  const advice = buildAdvice(weather);

  return (
    <section className="glass-card advisory-card">
      <div className="panel-header">
        <h2>Day brief</h2>
        <span className="pill">{advice.tag}</span>
      </div>
      <p className="advisory-text muted">{advice.message}</p>
    </section>
  );
}

export default DayBrief;
