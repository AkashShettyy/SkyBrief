import { useState, useEffect } from "react";

const STORAGE_KEY = "skybrief-saved-cities";

function SavedCities({ currentCity, onCitySelect }) {
  const [savedCities, setSavedCities] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    if (!currentCity) return;
    setSavedCities((prev) => {
      const updated = [
        currentCity,
        ...prev.filter((c) => c !== currentCity),
      ].slice(0, 6);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, [currentCity]);

  function clearCities() {
    setSavedCities([]);
    localStorage.removeItem(STORAGE_KEY);
  }

  return (
    <section className="saved-panel">
      <div className="panel-header">
        <h2>Saved cities</h2>
        <button className="text-btn" onClick={clearCities}>
          Clear
        </button>
      </div>
      <div className="saved-cities">
        {savedCities.length === 0 ? (
          <span className="saved-chip is-empty">No saved cities yet</span>
        ) : (
          savedCities.map((city) => (
            <button
              key={city}
              className="saved-chip"
              onClick={() => onCitySelect(city)}
            >
              {city}
            </button>
          ))
        )}
      </div>
    </section>
  );
}

export default SavedCities;
