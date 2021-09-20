import React, {
  useState,
  useContext,
  useEffect,
  useRef,
  useCallback,
} from "react";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [apiUrl, setApiUrl] = useState("https://restcountries.eu/rest/v2/");
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("a");
  const [searchType, setSearchType] = useState("name");

  const selectRef = useRef("");

  const filterApi = () => {
    switch (selectRef.current.value) {
      case "all":
        setSearchType("name");
        setSearch("a");
        break;
      case "africa":
        setSearchType("region");
        setSearch("africa");
        break;
      case "americas":
        setSearchType("region");
        setSearch("americas");
        break;
      case "asia":
        setSearchType("region");
        setSearch("asia");
        break;
      case "europe":
        setSearchType("region");
        setSearch("europe");
        break;
      case "oceania":
        setSearchType("region");
        setSearch("oceania");
        break;
    }
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      let response = await fetch(`${apiUrl}${searchType}/${search}`);
      let data = await response.json();
      if (data) {
        const countryData = data.map((info) => {
          const { alpha3Code, capital, flag, name, region, population } = info;
          return {
            countryCode: alpha3Code,
            capital,
            flag,
            countryName: name,
            region,
            population,
          };
        });
        setCountries(countryData);
      } else {
        setCountries([]);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(`error je: ${error}`);
    }
  };

  useEffect(() => {
    if (search === "") {
      setSearch("a");
    }
    fetchData();
  }, [search]);

  return (
    <AppContext.Provider
      value={{
        countries,
        loading,
        setLoading,
        setSearch,
        search,
        filterApi,
        selectRef,
        setSearchType,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
