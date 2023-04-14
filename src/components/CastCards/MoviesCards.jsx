import React from "react";
import MoviesCard from "./MoviesCard/MoviesCard";

function MoviesCards({ cardData }) {
  return (
    <>
      {cardData.map((card, index) => (
        <div key={index}>
          <MoviesCard movieCard={card} />{" "}
        </div>
      ))}
      )
    </>
  );
}
export default MoviesCards;
