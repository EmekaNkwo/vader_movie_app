import React from "react";
import "./moviesCard.scss";

function MoviesCard({ movieCard }) {
  return (
    <div className="movieCard">
      <img
        className="movie_card_image"
        src={
          `${process.env.REACT_APP_BASE_URL}/${movieCard?.image}` ||
          "https://picsum.photos/id/1043/800/600"
        }
        alt=""
      />
      <h4 className="movie_card_title">
        {movieCard?.original_title || "Unknown Title"}
      </h4>
      <p className="movie_card_desc">
        {movieCard?.release_date || "Unknown Year"} |{" "}
        {movieCard?.runtime || "Unknown Genre"} mins
      </p>
    </div>
  );
}

export default MoviesCard;
