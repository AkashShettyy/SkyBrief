import { useState } from "react";

function SearchBar({ onSearch, onLocationRequest, isLoading }) {
  const [input, setInput] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!input.trim()) return;
    onSearch(input.trim());
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search for a city"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        disabled={isLoading}
      />
      <button type="submit" disabled={isLoading}>
        Search
      </button>
      <button type="button" onClick={onLocationRequest} disabled={isLoading}>
        Use my location
      </button>
    </form>
  );
}

export default SearchBar;
