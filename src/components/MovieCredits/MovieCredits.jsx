import React, { useEffect } from "react";

import "./movieCredits.scss";
import { Card, Carousel, Spin, message } from "antd";
import useMovieQuery from "../useMovieQuery";

const { Meta } = Card;
function MoviesCredits({ title }) {
  const { creditQuery } = useMovieQuery();

  useEffect(() => {
    if (creditQuery.status === "error") {
      message.error(`${JSON.stringify(creditQuery?.error?.message)}`);
    }
  }, [creditQuery]);

  return (
    <div className="movies_credits_container">
      <div className="movies_credits">
        {creditQuery.status === "loading" ? (
          <Spin />
        ) : (
          <>
            <div className="credits_header">
              <h3 className="credits_title">{title}</h3>
            </div>

            <Carousel
              arrows
              infinite={false}
              dots={false}
              slidesToShow={4}
              responsive={[
                {
                  breakpoint: 1024,
                  settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                  },
                },
                {
                  breakpoint: 600,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2,
                  },
                },
                {
                  breakpoint: 480,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                  },
                },
              ]}
            >
              {creditQuery.data?.cast?.map((castCard, index) => (
                <div key={index}>
                  <Card
                    size="small"
                    className="carousalCards"
                    cover={
                      <img
                        style={{
                          height: 200,
                          width: "100%",
                          objectFit: "cover",
                        }}
                        src={
                          castCard?.profile_path !== "Unknown Name"
                            ? `https://image.tmdb.org/t/p/original/${castCard.profile_path}`
                            : "https://avatars.dicebear.com/api/human/placeholder.svg"
                        }
                        alt={castCard?.name ?? "Unknown Name"}
                      />
                    }
                  >
                    <Meta
                      title={castCard?.name ?? "Unknown Name"}
                      description={
                        castCard?.character.length > 20
                          ? `${castCard?.character.slice(0, 20)}....`
                          : castCard?.character || "Unknown Character"
                      }
                    />
                  </Card>
                </div>
              ))}
            </Carousel>
          </>
        )}
      </div>
    </div>
  );
}

export default MoviesCredits;
