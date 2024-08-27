import axios from "axios";

export const url = process.env.REACT_APP_BASE_URL;
export const apiKey = process.env.REACT_APP_API_KEY;
export const backend_url = process.env.REACT_APP_BACKEND_URL;

export async function getTrendingMovies() {
  return axios
    .get(`${url}/trending/all/day?api_key=${apiKey}`, {})
    .then((res) => res.data);
}

export async function getMovie(id) {
  return await axios
    .get(`${url}/movie/${id}?api_key=${apiKey}&language=en-US`)
    .then((res) => res.data);
}

export async function getMovieCredits(id) {
  return await axios
    .get(`${url}/movie/${id}/credits?api_key=${apiKey}&language=en-US`)
    .then((res) => res.data);
}

export async function getSearch(query) {
  return await axios
    .get(
      `${url}/search/movie?api_key=${apiKey}&language=en-US&query=${query}&page=1&include_adult=false`
    )
    .then((res) => res.data);
}

export async function getMovieVideos(id) {
  return await axios
    .get(`${url}/movie/${id}?api_key=${apiKey}&append_to_response=videos`)
    .then((res) => res.data);
}

export async function getRecommendedMovies(movieName) {
  return await axios
    .get(`${backend_url}/similarity/${movieName}`)
    .then((res) => res.data);
}

export async function getRandomMovies() {
  return await axios.get(`${backend_url}/random`).then((res) => res.data);
}

export async function getMovieDetails(movieName) {
  return await axios
    .get(`${url}/search/movie?api_key=${apiKey}&query=${movieName}`)
    .then((res) => res.data);
}
