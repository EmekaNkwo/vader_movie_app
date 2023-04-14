import React, { useEffect, useRef, useState } from "react";

import "./moviesCollection.scss";
import { useQuery } from "@tanstack/react-query";
import { getTrendingMovies } from "../../shared/api/fetchMovies";
import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";
import useMediaQuery from "../../shared/hooks/useMediaQuery";
import { useNavigate } from "react-router-dom";
import { Spin, message } from "antd";

function MoviesCollection({ title }) {
  const navigate = useNavigate();

  const [currentPosition, setCurrentPosition] = useState(0);
  const contentRef = useRef(null);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.style.transform = `translateX(${currentPosition}px)`;
    }
  }, [currentPosition]);

  const handleLeftClick = () => {
    const contentWidth = contentRef.current.offsetWidth;
    const maxPosition = (contentWidth - window.innerWidth) / 2;
    if (currentPosition < maxPosition && currentPosition + 300 <= 0) {
      setCurrentPosition(currentPosition + 300);
    } else {
      setCurrentPosition(0);
    }
  };

  const handleRightClick = () => {
    const contentWidth = contentRef.current.offsetWidth;
    const containerWidth = contentRef.current.parentNode.offsetWidth;
    const maxPosition = contentWidth - containerWidth;
    if (
      currentPosition > -maxPosition &&
      currentPosition - 300 >= -maxPosition
    ) {
      setCurrentPosition(currentPosition - 300);
    } else {
      setCurrentPosition(-maxPosition);
    }
  };
  const isSmallScreen = useMediaQuery("(max-width: 1023px)");
  const [messageApi, contextHolder] = message.useMessage();

  const collectionQuery = useQuery({
    queryKey: ["movies"],
    queryFn: getTrendingMovies,
  });

  if (collectionQuery.status === "error") {
    return messageApi.open({
      type: "error",
      content: `${JSON.stringify(collectionQuery.error)}`,
    });
  }

  return (
    <>
      {contextHolder}
      <div className="movies_collection">
        {collectionQuery.status === "loading" ? (
          <Spin />
        ) : (
          <>
            <div className="collection_header">
              <h3 className="collection_title">{title}</h3>
              <div
                className="collection_button"
                style={{
                  display: isSmallScreen ? "none" : "flex",
                }}
              >
                <BsArrowLeftCircle
                  onClick={handleLeftClick}
                  className="collection_icon"
                />
                <BsArrowRightCircle
                  onClick={handleRightClick}
                  className="collection_icon"
                />
              </div>
            </div>
            <div
              className={isSmallScreen ? "grid_movies_card" : "movies_cards"}
              style={{
                left: currentPosition + "px",
              }}
              ref={contentRef}
            >
              {collectionQuery.data.results.map((movieCard, index) => (
                <div
                  key={index}
                  onClick={() => {
                    navigate(`/home/movie/${movieCard.id}`, {});
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
                      {movieCard?.runtime || "Unknown "} mins
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default MoviesCollection;
