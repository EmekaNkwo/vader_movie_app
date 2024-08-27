import React, { useEffect } from "react";
import { HeroContainer, MoviesCollection } from "../../components";
import { useMovieState } from "../../state/movie";

function Home() {
  const id = 181812;

  useEffect(() => {
    useMovieState.setState({ movieID: id });
  }, []);
  return (
    <div>
      <HeroContainer id={id} />
      <MoviesCollection title="Suggested Movies" />
    </div>
  );
}

export default Home;
