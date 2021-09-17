import React, { useState, useContext, useEffect } from "react";
import { useCallback } from "react";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [apiUrl, setApiUrl] = useState("https://restcountries.eu/rest/v2/all");
  const [countries, setCountries] = useState([]);
  const fetchData = async () => {
    try {
      setLoading(true);
      let response = await fetch(apiUrl);
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
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <AppContext.Provider value={{ countries, loading, setLoading }}>
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
