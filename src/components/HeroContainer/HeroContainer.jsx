import React, { useEffect, useState } from "react";
import { BsFillInfoCircleFill, BsPlayCircleFill } from "react-icons/bs";
import { MdStarHalf } from "react-icons/md";
import { FilledButton } from "../../shared/ui/CustomButtons/CuttomButtons";
import "./heroContainer.scss";

import { useNavigate } from "react-router-dom";
import { Spin, message } from "antd";
import TrailerModal from "../TrailerModal/TrailerModal";
import useMovieQuery from "../useMovieQuery";
import { useMovieState } from "../../state/movie";

function HeroContainer({ id, type }) {
  const navigate = useNavigate();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [videoData, setVideoData] = React.useState({});

  const { videoQuery, movieQuery } = useMovieQuery();

  if (movieQuery.status === "error") {
    message.error(`${JSON.stringify(movieQuery?.error?.message)}`);
  }

  const backdrop = `https://image.tmdb.org/t/p/original/${movieQuery?.data?.backdrop_path}`;
  const hero_background = {
    background: `linear-gradient(rgba(20, 20, 20, 0.723), rgba(0, 0, 0, 0.789)), url(${backdrop})`,
  };

  const goToMovieDetails = () => {
    useMovieState.setState({ movieID: id });
    navigate(`/home/movie/${id}`, {
      state: {
        id,
      },
    });
  };

  useEffect(() => {
    const data = videoQuery?.data;
    if (data?.videos && data?.videos?.results) {
      const trailer = data.videos.results.find(
        (vid) => vid.name === "Official Trailer"
      );

      setVideoData(trailer ? trailer : data.videos.results[0]);
    }
  }, [videoQuery?.data]);

  return (
    <>
      {isOpenModal && (
        <TrailerModal
          isModalOpen={isOpenModal}
          setIsModalOpen={setIsOpenModal}
          video={videoData?.key}
        />
      )}

      <div className="hero_container" style={hero_background}>
        {movieQuery?.status === "loading" ? (
          <Spin className="hero_loader" />
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
              {type === "movieDetailPage" ? (
                <FilledButton
                  icon={<BsPlayCircleFill />}
                  title="Watch trailer"
                  className="watch_button"
                  onClick={() => setIsOpenModal(true)}
                />
              ) : null}
              {type !== "movieDetailPage" ? (
                <FilledButton
                  icon={<BsFillInfoCircleFill />}
                  title="Learn more"
                  className="info_button"
                  onClick={() => {
                    goToMovieDetails();
                  }}
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
