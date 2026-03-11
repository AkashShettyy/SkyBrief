import { useState } from "react";

function SearchBar({
  onSearch,
  onLocationRequest,
  isLoading,
  unit,
  onToggleUnit,
}) {
  const [input, setInput] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!input.trim()) return;
    onSearch(input.trim());
  }

  return (
    <div>
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search for a city"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isLoading}
        />
        <button className="primary-btn" type="submit" disabled={isLoading}>
          Search
        </button>
        <button
          className="ghost-btn"
          type="button"
          onClick={onLocationRequest}
          disabled={isLoading}
        >
          Use my location
        </button>
      </form>

      <div className="toolbar">
        <div className="unit-toggle">
          <button
            className={`unit-btn ${unit === "metric" ? "is-active" : ""}`}
            onClick={() => unit !== "metric" && onToggleUnit()}
          >
            C
          </button>
          <button
            className={`unit-btn ${unit === "imperial" ? "is-active" : ""}`}
            onClick={() => unit !== "imperial" && onToggleUnit()}
          >
            F
          </button>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
