import React, { useState, useContext, useEffect, useCallback } from "react";

export const API_ENDPOINT = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_MOVIE_API_KEY}&type=movie`;
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("batman");
  const [error, setError] = useState({ show: false, message: "" });

  const fetchData = useCallback(async () => {
    const response = await fetch(`${API_ENDPOINT}&s=${query}`);
    const data = await response.json();

    if (data.Response === "True") {
      setMovies(data.Search);
    } else {
      setError({ show: true, message: data.Error });
    }
  }, [query]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <AppContext.Provider value={{ movies, query, setQuery, error }}>
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
