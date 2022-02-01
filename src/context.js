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
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("a");
  const [searchType, setSearchType] = useState("name");

  const selectRef = useRef("");

  const apiUrl = "https://restcountries.com/v2/";

  const filterApi = () => {
    switch (selectRef.current.value) {
      case "all":
        setSearchType("name");
        setSearch("a");
        break;
      case "asia":
        setSearchType("region");
        setSearch("asia");
        break;
      case "africa":
        setSearchType("region");
        setSearch("africa");
        break;
      case "americas":
        setSearchType("region");
        setSearch("americas");
        break;
      case "europe":
        setSearchType("region");
        setSearch("europe");
        break;
      case "oceania":
        setSearchType("region");
        setSearch("oceania");
        break;
      default:
        console.log(
          `Sorry, there was an error. Missing ${selectRef.current.value}`
        );
    }
  };

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      let response = await fetch(`${apiUrl}${searchType}/${search}`);
      let data = await response.json();
      if (data) {
        const countryData = data.map((info) => {
          const {
            alpha3Code,
            capital,
            flags,
            name,
            region,
            population,
            borders,
          } = info;
          return {
            countryCode: alpha3Code,
            capital,
            flags,
            countryName: name,
            region,
            population,
            borders,
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
  }, [search, searchType]);

  useEffect(() => {
    fetchData();
  }, [search, fetchData]);

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
