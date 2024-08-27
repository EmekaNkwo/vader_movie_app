import { create } from "zustand";

export const useMovieState = create(() => ({
  movieID: "",
  movieName: "",
}));
