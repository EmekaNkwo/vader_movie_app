import React from "react";
import { HeroContainer, MoviesCollection } from "../../components";

function Home() {
  const id = 181812;
  return (
    <div>
      <HeroContainer id={id} />
      <MoviesCollection title="Movies for you" />
    </div>
  );
}

export default Home;
