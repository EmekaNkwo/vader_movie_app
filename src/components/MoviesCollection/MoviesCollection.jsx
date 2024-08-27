import React, { useEffect, useState } from "react";
import "./moviesCollection.scss";

import { Spin, message } from "antd";
import { useMovieState } from "../../state/movie";
import useMovieQuery from "../useMovieQuery";
import axios from "axios";
import { apiKey } from "../../shared/api/fetchMovies";

function MoviesCollection({ title }) {
  const { navigate, collectionQuery } = useMovieQuery();

  if (collectionQuery.status === "error") {
    message.error(`${JSON.stringify(collectionQuery?.error?.message)}`);
  }
  const [collectionMovies, setCollectionMovies] = useState([]);
  const headers = {
    accept: "application/json",
    Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
  };

  useEffect(() => {
    let counter = 12;
    // getting data for each of the recommened movies
    if (Array.isArray(collectionQuery?.data?.arr)) {
      for (let movie of collectionQuery?.data?.arr) {
        axios
          .get(
            `https://api.themoviedb.org/3/search/movie?${apiKey}&query=${movie}`,
            {
              headers: headers,
            }
          )
          .then((res) => {
            setCollectionMovies((prev) => [...prev, res?.data?.results[0]]);
          });
        counter--;
        if (counter === 0) break;
      }
    } else {
      console.log("collection.array is not an array");
      // handle the case where it's not an array
    }
  }, [collectionQuery?.data?.arr]);

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
            <div className={"grid_movies_card"}>
              {collectionMovies?.map((movieCard, index) => (
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
}

export default MoviesCollection;
