import { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar/SearchBar";
import SearchResult from "./components/SearchResult/SearchResult";
import "./App.css";

function App() {
  const [searchIndex, setSearchIndex] = useState("");
  const [allCountries, setAllCountries] = useState({});

  useEffect(() => {
    fetch(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        return response.json();
      })
      .then((data) => {
        console.log("Assignign value", data);
        setAllCountries(data);
      });
  }, []);

  return (
    <div>
      <SearchBar
        searchIndex={searchIndex}
        setSearchIndex={setSearchIndex}
        className="searchBarApp"
      />
      <div>
        <SearchResult allCountries={allCountries} searchIndex={searchIndex} />
      </div>
    </div>
  );
}

export default App;
