import "./SearchBar.css";

function SearchBar({ className = "", searchIndex, setSearchIndex }) {
  const handleInputChange = (event) => {
    setSearchIndex(event.target.value);
  };

  return (
    <>
      <h1>Weather Lookup</h1>
      <input
        type="text"
        value={searchIndex}
        onChange={handleInputChange}
        className={`searchBarDefault ${className}`}
      />
    </>
  );
}

export default SearchBar;
