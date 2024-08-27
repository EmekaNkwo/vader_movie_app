import React, { useState } from "react";
import useMovieQuery from "../useMovieQuery";
import { apiKey } from "../../shared/api/fetchMovies";
import "../MoviesCollection/moviesCollection.scss";
import { useEffect } from "react";
import axios from "axios";
import { Spin } from "antd";
import { useMovieState } from "../../state/movie";

const RecommendedMovies = ({ title }) => {
  const { recommendationQuery, navigate } = useMovieQuery();
  const [similarMovies, setSimilarMovies] = useState([]);
  const headers = {
    accept: "application/json",
    Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
  };

  useEffect(() => {
    let counter = 12;
    // getting data for each of the recommened movies
    if (Array.isArray(recommendationQuery?.data?.movies)) {
      for (let movie of recommendationQuery?.data?.movies) {
        axios
          .get(
            `https://api.themoviedb.org/3/search/movie?${apiKey}&query=${movie}`,
            {
              headers: headers,
            }
          )
          .then((res) => {
            setSimilarMovies((prev) => [...prev, res?.data?.results[0]]);
          });
        counter--;
        if (counter === 0) break;
      }
    } else {
      console.log("recommendationQuery.data is not an array");
      // handle the case where it's not an array
    }
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
            <div className={"grid_movies_card"}>
              {similarMovies?.map((movieCard, index) => (
                <div
                  key={index}
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
                        `https://image.tmdb.org/t/p/original/${movieCard?.backdrop_path}` ||
                        "https://picsum.photos/id/1043/800/600"
                      }
                      alt=""
                    />
                    <h4 className="movie_card_title">
                      {movieCard?.original_title || "Unknown Title"}
                    </h4>
                    <p className="movie_card_desc">
                      {movieCard?.release_date || "Unknown Year"} |{" "}
                      {movieCard?.vote_average.toFixed(1) || "Unknown "} / 10
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
