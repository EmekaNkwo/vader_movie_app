import React, { useState, useEffect } from "react";
import axios from "axios";
import { Spin } from "antd";
import useMovieQuery from "../useMovieQuery";
import { apiKey } from "../../shared/api/fetchMovies";
import "../MoviesCollection/moviesCollection.scss";
import { useMovieState } from "../../state/movie";

const RecommendedMovies = ({ title }) => {
  const { recommendationQuery, navigate } = useMovieQuery();
  const [similarMovies, setSimilarMovies] = useState([]);

  const headers = {
    accept: "application/json",
    Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
  };

  useEffect(() => {
    const fetchSimilarMovies = async () => {
      if (Array.isArray(recommendationQuery?.data?.movies)) {
        const moviesToProcess = recommendationQuery.data.movies.slice(0, 12);
        const moviePromises = moviesToProcess.map((movie) =>
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
          setSimilarMovies(moviesData.filter(Boolean));
        } catch (error) {
          console.error("Error fetching similar movies:", error);
        }
      } else {
        console.warn("recommendationQuery.data is not an array");
      }
    };

    fetchSimilarMovies();
    // eslint-disable-next-line
  }, [recommendationQuery?.data?.movies]);

  return (
    <div className="movies_collection_container">
      <div className="movies_collection">
        {recommendationQuery?.status === "loading" ? (
          <Spin />
        ) : (
          <>
            <div className="collection_header">
              <h3 className="collection_title">{title}</h3>
            </div>
            <div className="grid_movies_card">
              {similarMovies.map((movieCard) => (
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
};

export default RecommendedMovies;
