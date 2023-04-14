import React from "react";
import { BsFillInfoCircleFill, BsPlayCircleFill } from "react-icons/bs";
import { MdStarHalf } from "react-icons/md";
import { FilledButton } from "../../shared/ui/CustomButtons/CuttomButtons";
import "./heroContainer.scss";
import { useQuery } from "@tanstack/react-query";
import { getMovie } from "../../shared/api/fetchMovies";
import { useNavigate } from "react-router-dom";
import { Spin, message } from "antd";

function HeroContainer({ id, type }) {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const movieQuery = useQuery({
    queryKey: ["movie", id],
    queryFn: () => getMovie(id),
  });

  if (movieQuery.status === "error") {
    return messageApi.open({
      type: "error",
      content: `${JSON.stringify(movieQuery.error)}`,
    });
  }

  const backdrop = `https://image.tmdb.org/t/p/original/${movieQuery.data?.backdrop_path}`;
  const hero_background = {
    background: `linear-gradient(rgba(20, 20, 20, 0.723), rgba(0, 0, 0, 0.689)), url(${backdrop})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };

  const goToMovieDetails = () => {
    navigate(`/home/movie/${id}`, {
      state: {
        id,
      },
    });
  };

  return (
    <>
      {contextHolder}
      <div className="hero_container" style={hero_background}>
        {movieQuery?.status === "loading" ? (
          <Spin />
        ) : (
          <div className="hero_container_content">
            <p className="hero_category">
              <span className="hero_featured_text"> Featured </span>|{" "}
              {movieQuery?.data?.release_date} |{" "}
              {movieQuery.data?.genres[0]?.name},{" "}
              {movieQuery?.data?.genres[1]?.name},{" "}
              {movieQuery.data?.genres[2]?.name}
            </p>
            <h2 className="hero_title">{movieQuery.data?.original_title}</h2>
            <div className="hero_ratings">
              <span className="hero_star_rate">
                <MdStarHalf className="star_icon" />{" "}
                {movieQuery.data?.vote_average}
              </span>
              <span className="hero_age_grade">
                {movieQuery?.data?.adult ? "Adult" : "PG-13"}
              </span>
            </div>
            <p className="hero_description">{movieQuery?.data?.overview}</p>
            <div className="hero_buttons">
              <FilledButton
                icon={<BsPlayCircleFill />}
                title="Watch now"
                className="watch_button"
                onClick={goToMovieDetails}
              />
              {type !== "movieDetailPage" ? (
                <FilledButton
                  icon={<BsFillInfoCircleFill />}
                  title="Learn more"
                  className="info_button"
                  onClick={goToMovieDetails}
                />
              ) : null}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default HeroContainer;
