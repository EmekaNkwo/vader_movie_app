import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import HeroContainer from "../../components/HeroContainer/HeroContainer";
import { MovieCredits, MoviesCollection } from "../../components";
import useMediaQuery from "../../shared/hooks/useMediaQuery";
import { Tabs } from "antd";

function MovieDetails() {
  const { id } = useParams();

  const isSmallScreen = useMediaQuery("(max-width: 1023px)");

  useEffect(() => {
    window.addEventListener("load", () => {
      window.scrollTo(0, 0);
    });
  }, []);
  const onChange = (key) => {
    console.log(key);
  };
  const items = [
    {
      key: "1",
      label: `Cast`,
      children: (
        <>
          <MovieCredits id={id} />
        </>
      ),
    },
    {
      key: "2",
      label: `Recommended Movies`,
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
            onChange={onChange}
            style={{
              backgroundColor: "#1b1f32",
              color: "#fff",
              padding: "1rem",
            }}
          />
        </>
      ) : (
        <>
          <MovieCredits title="Cast" id={id} />
          <MoviesCollection title="Recommended Movies" />
        </>
      )}
    </div>
  );
}

export default MovieDetails;
