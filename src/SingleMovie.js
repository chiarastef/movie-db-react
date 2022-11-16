import React, { useState, useEffect, useCallback } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { useParams, Link } from "react-router-dom";
import { API_ENDPOINT } from "./context";

const url =
  "https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png";

const SingleMovie = () => {
  const { id } = useParams();

  const [loaded, setLoaded] = useState(false);
  const [movie, setMovie] = useState({});
  const [error, setError] = useState({ show: false, message: "" });

  const fetchData = useCallback(async () => {
    const response = await fetch(`${API_ENDPOINT}&i=${id}`);
    const data = await response.json();

    if (data.Response === "True") {
      setMovie(data);
    } else {
      setError({ show: true, message: data.Error });
    }

    setLoaded(true);
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const style = {
    display: "block",
    margin: "100px auto",
  };

  if (!loaded) {
    return (
      <ClipLoader
        cssOverride={style}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    );
  }

  if (error.show) {
    return (
      <div className="page-error">
        <h1>{error.message}</h1>
        <Link to="/" className="btn">
          back to movies
        </Link>
      </div>
    );
  }

  return (
    <section className="single-movie">
      <img
        src={movie.Poster === "N/A" ? url : movie.Poster}
        alt={movie.Title}
      />
      <div className="single-movie-info">
        <h2>{movie.Title}</h2>
        <p>{movie.Plot}</p>
        <h4>{movie.Year}</h4>
        <Link to="/" className="btn">
          back to movies
        </Link>
      </div>
    </section>
  );
};

export default SingleMovie;
