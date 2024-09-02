import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import HeroContainer from "../../components/HeroContainer/HeroContainer";
import { MovieCredits, MoviesCollection } from "../../components";

import { Tabs } from "antd";
import useMovieQuery from "../../components/useMovieQuery";
import { useMovieState } from "../../state/movie";
import RecommendedMovies from "../../components/RecommendedMovies/RecommendedMovies";

function MovieDetails() {
  const { id } = useParams();
  const { isSmallScreen } = useMovieQuery();

  useEffect(() => {
    if (id) {
      useMovieState.setState({ movieID: id });
    }
  }, [id]);

  const items = [
    {
      key: "1",
      label: (
        <span
          style={{
            color: "#fff",
          }}
        >
          Cast
        </span>
      ),
      children: (
        <>
          <MovieCredits id={id} />
        </>
      ),
    },
    {
      key: "2",
      label: (
        <span
          style={{
            color: "#fff",
          }}
        >
          Recommended Movies
        </span>
      ),
      children: (
        <>
          <MoviesCollection />
        </>
      ),
    },
  ];

  return (
    <div>
      <HeroContainer id={id} type="movieDetailPage" />
      {isSmallScreen ? (
        <>
          <Tabs
            defaultActiveKey="1"
            items={items}
            style={{
              backgroundColor: "#1b1f32",
              // color: "#fff",
              padding: "1rem",
            }}
          />
        </>
      ) : (
        <>
          <MovieCredits title="Cast" />
          {/* <MoviesCollection title="Recommended Movies" /> */}
          <RecommendedMovies title={"Recommended Movies"} />
        </>
      )}
    </div>
  );
}

export default MovieDetails;
