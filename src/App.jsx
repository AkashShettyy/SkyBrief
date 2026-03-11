import SearchBar from "./components/SearchBar";

function App() {
  function handleSearch(city) {
    console.log("Searching for:", city);
  }

  function handleLocationRequest() {
    console.log("Location requested");
  }

  return (
    <div>
      <h1>SkyBrief</h1>
      <SearchBar
        onSearch={handleSearch}
        onLocationRequest={handleLocationRequest}
        isLoading={false}
      />
    </div>
  );
}

export default App;
