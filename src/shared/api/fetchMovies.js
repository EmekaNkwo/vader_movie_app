import axios from "axios";

const url = process.env.REACT_APP_BASE_URL;
const apiKey = process.env.REACT_APP_API_KEY;

export function getTrendingMovies() {
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
