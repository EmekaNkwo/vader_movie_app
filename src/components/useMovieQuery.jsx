import { useQuery } from "@tanstack/react-query";
import {
  getMovie,
  getMovieCredits,
  getMovieVideos,
  getRandomMovies,
  getRecommendedMovies,
} from "../shared/api/fetchMovies";
import useMediaQuery from "../shared/hooks/useMediaQuery";
import { useMovieState } from "../state/movie";
import { useNavigate } from "react-router-dom";

const useMovieQuery = () => {
  const navigate = useNavigate();
  const id = useMovieState.getState().movieID || 181812;
  const movieQuery = useQuery({
    queryKey: ["movie", id],
    queryFn: () => getMovie(id),
  });
  const recommendationQuery = useQuery({
    queryKey: ["recommendation", "avatar"],
    queryFn: () => getRecommendedMovies("avatar"),
  });

  const videoQuery = useQuery({
    queryKey: ["video", id],
    queryFn: () => getMovieVideos(id),
  });

  const collectionQuery = useQuery({
    queryKey: ["movies"],
    queryFn: getRandomMovies,
  });

  const creditQuery = useQuery({
    queryKey: ["movieCredits", id],
    queryFn: () => getMovieCredits(id),
  });

  const isSmallScreen = useMediaQuery("(max-width: 1023px)");

  return {
    movieQuery,
    recommendationQuery,
    videoQuery,
    isSmallScreen,
    collectionQuery,
    creditQuery,
    navigate,
  };
};

export default useMovieQuery;
