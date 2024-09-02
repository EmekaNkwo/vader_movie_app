import React, { useEffect, useState } from "react";
import "./moviesCollection.scss";
import { Spin, message } from "antd";
import { useMovieState } from "../../state/movie";
import useMovieQuery from "../useMovieQuery";
import axios from "axios";
import { apiKey } from "../../shared/api/fetchMovies";

function MoviesCollection({ title }) {
  const { navigate, collectionQuery } = useMovieQuery();
  const [collectionMovies, setCollectionMovies] = useState([]);

  const headers = {
    accept: "application/json",
    Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
  };

  useEffect(() => {
    const fetchCollectionMovies = async () => {
      if (Array.isArray(collectionQuery?.data?.arr)) {
        const moviesToProcess = collectionQuery.data.arr.slice(0, 10);
        const moviePromises = moviesToProcess?.map((movie) =>
          axios.get(
            `https://api.themoviedb.org/3/search/movie?${apiKey}&query=${movie}`,
            { headers }
          )
        );

        try {
          const movieResponses = await Promise.all(moviePromises);
          const moviesData = movieResponses.map(
            (res) => res?.data?.results?.[0]
          );
          setCollectionMovies(moviesData.filter(Boolean));
        } catch (error) {
          console.error("Error fetching collection movies:", error);
        }
      } else {
        console.warn("collectionQuery.data.arr is not an array");
      }
    };

    fetchCollectionMovies();
    // eslint-disable-next-line
  }, [collectionQuery?.data?.arr]);

  useEffect(() => {
    if (collectionQuery.status === "error") {
      message.error(
        `Error fetching collection: ${collectionQuery?.error?.message}`
      );
    }
  }, [collectionQuery.status, collectionQuery?.error?.message]);

  return (
    <div className="movies_collection_container">
      <div className="movies_collection">
        {collectionQuery.status === "loading" ? (
          <Spin />
        ) : (
          <>
            <div className="collection_header">
              <h3 className="collection_title">{title}</h3>
            </div>
            <div className="grid_movies_card">
              {collectionMovies.map((movieCard) => (
                <div
                  key={movieCard?.id}
                  onClick={() => {
                    useMovieState.setState({ movieID: movieCard?.id });
                    navigate(`/home/movie/${movieCard?.id}`);
                    window.scrollTo(0, 0);
                  }}
                >
                  <div className="movieCard">
                    <img
                      className="movie_card_image"
                      src={
                        movieCard?.backdrop_path
                          ? `https://image.tmdb.org/t/p/original/${movieCard.backdrop_path}`
                          : "https://picsum.photos/id/1043/800/600"
                      }
                      alt={movieCard?.original_title || "Unknown Title"}
                    />
                    <h4 className="movie_card_title">
                      {movieCard?.original_title || "Unknown Title"}
                    </h4>
                    <p className="movie_card_desc">
                      {movieCard?.release_date || "Unknown Year"} |{" "}
                      {movieCard?.vote_average?.toFixed(1) || "Unknown"} / 10
                      rating
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default MoviesCollection;
