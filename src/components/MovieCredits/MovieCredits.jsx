import React, { useEffect, useRef, useState } from "react";

import { useQuery } from "@tanstack/react-query";
import { getMovieCredits } from "../../shared/api/fetchMovies";
import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";
import useMediaQuery from "../../shared/hooks/useMediaQuery";
import "./movieCredits.scss";
import { Spin, message } from "antd";

function MoviesCredits({ id, title }) {
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

  const creditQuery = useQuery({
    queryKey: ["movieCredits", id],
    queryFn: () => getMovieCredits(id),
  });

  if (creditQuery.status === "error") {
    return messageApi.open({
      type: "error",
      content: `${JSON.stringify(creditQuery.error)}`,
    });
  }

  return (
    <>
      {contextHolder}
      <div className="movies_credits">
        {creditQuery.status === "loading" ? (
          <Spin />
        ) : (
          <>
            <div className="credits_header">
              <h3 className="credits_title">{title}</h3>
              <div
                className="credits_button"
                style={{
                  display: isSmallScreen ? "none" : "flex",
                }}
              >
                <BsArrowLeftCircle
                  onClick={handleLeftClick}
                  className="credits_icon"
                />
                <BsArrowRightCircle
                  onClick={handleRightClick}
                  className="credits_icon"
                />
              </div>
            </div>
            <div
              className={isSmallScreen ? "grid_cast_card" : "cast_cards"}
              style={{
                left: currentPosition + "px",
              }}
              ref={contentRef}
            >
              {creditQuery.data?.cast?.map((castCard, index) => (
                <div key={index}>
                  <div className="cast_Card">
                    <img
                      className="movie_card_image"
                      src={
                        `https://image.tmdb.org/t/p/original/${castCard?.profile_path}` ||
                        "https://picsum.photos/id/1043/800/600"
                      }
                      alt=""
                    />
                    <h4 className="movie_card_title">
                      {castCard?.name || "Unknown Name"}
                    </h4>
                    <p className="movie_card_desc">
                      {castCard?.character || "Unknown Character"}
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

export default MoviesCredits;
