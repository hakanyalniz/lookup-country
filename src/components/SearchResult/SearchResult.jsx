import { useEffect, useState } from "react";

import "./SearchResult.css";

function SearchResult({ allCountries, searchIndex }) {
  const [filteredSearchResult, setFilteredSearchResult] = useState([]);
  let [weatherDATA, setWeatherDATA] = useState({});

  useEffect(() => {
    if (
      searchIndex === null ||
      searchIndex === undefined ||
      searchIndex.length === 0
    ) {
      setFilteredSearchResult([]);
      return;
    }
    // Filter countries with searchIndex and log the results in filtered state
    setFilteredSearchResult(
      allCountries.filter((country) => {
        return country.name.common
          .toLowerCase()
          .includes(searchIndex.toLowerCase());
      })
    );
  }, [searchIndex]);

  //   Set the country at index to be the sole item in filtered list, causing it to render First case below
  //   This allows us to click at a country, get its index, and see its details
  const handleShowDetail = (index) => {
    setFilteredSearchResult([filteredSearchResult[index]]);
  };

  useEffect(() => {
    if (filteredSearchResult.length !== 1) return;

    const baseURL = "http://api.weatherapi.com/v1/current.json";
    const api_key = import.meta.env.VITE_SOME_KEY;
    const apiQ = filteredSearchResult[0].capital[0];

    fetch(`${baseURL}` + `?key=${api_key}` + `&q=${apiQ}`)
      .then((response) => {
        if (!response.ok) console.log("An error occured");
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setWeatherDATA(data);
      });
  }, [filteredSearchResult]);

  return (
    <>
      {/* If there is only one result left, render the first condition, otherwise render the first 10 countries */}
      {filteredSearchResult.length === 1 ? (
        // First case
        <div className="country-element">
          <h1>{filteredSearchResult[0].name.common}</h1>
          <h1>
            {filteredSearchResult[0].altSpellings.map((altSpelling) => {
              <div>{altSpelling}</div>;
            })}
          </h1>
          <div>
            <img
              src={filteredSearchResult[0].flags.png}
              alt="a countries flag"
              className="coat-of-arms"
            />
            <img
              src={filteredSearchResult[0].coatOfArms.png}
              alt="a countries coat of arm"
              className="coat-of-arms"
            />
          </div>

          <table className="country-element">
            <tbody>
              <tr>
                <th>Capital</th>
                <td>{filteredSearchResult[0].capital[0]}</td>
              </tr>

              <tr>
                <th>Car Direction</th>
                <td>{filteredSearchResult[0].car.side}</td>
              </tr>

              <tr>
                <th>Continent</th>
                <td>{filteredSearchResult[0].continents[0]}</td>
              </tr>

              <tr>
                <th>Currency</th>
                <td>
                  {Object.values(filteredSearchResult[0].currencies).map(
                    (element, index) => {
                      return <div key={index}>{element.name}</div>;
                    }
                  )}
                </td>
              </tr>

              <tr>
                <th>Language</th>
                <td>
                  {Object.values(filteredSearchResult[0].languages).map(
                    (element, index) => {
                      return <div key={index}>{element}</div>;
                    }
                  )}
                </td>
              </tr>

              <tr>
                <th>Population</th>
                <td>{filteredSearchResult[0].population}</td>
              </tr>

              <tr>
                <th>Timezone</th>
                <td>{filteredSearchResult[0].timezones[0]}</td>
              </tr>
              {/* If weather data has not loaded, do not show anything, when it loads, state triggers render */}
              {Object.keys(weatherDATA).length ===
              0 ? null : weatherDATA.error ? (
                <tr>
                  <td colSpan={2}>Could not retrieve weather data.</td>
                </tr>
              ) : (
                <>
                  <tr>
                    <th>Weather</th>
                    <td>
                      <img
                        src={weatherDATA.current.condition.icon}
                        alt="weather icon"
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>Temperature</th>
                    <td>
                      {weatherDATA.current.temp_c} C/
                      {weatherDATA.current.temp_f} F
                    </td>
                  </tr>

                  <tr>
                    <th>Wind</th>
                    <td>
                      {weatherDATA.current.wind_kph} KPH/
                      {weatherDATA.current.wind_mph} MPH
                    </td>
                  </tr>

                  <tr>
                    <th>Cloud</th>
                    <td>{weatherDATA.current.cloud}</td>
                  </tr>

                  <tr>
                    <th>humidity</th>
                    <td>{weatherDATA.current.humidity}</td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
        </div>
      ) : (
        // Second case
        filteredSearchResult.slice(0, 10).map((element, index) => {
          return (
            <div key={index} className="country-element">
              <button onClick={() => handleShowDetail(index)}>
                {element.name.common}
              </button>
            </div>
          );
        })
      )}
    </>
  );
}

export default SearchResult;
