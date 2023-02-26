import axios from 'axios';

const baseUrl = "https://api.themoviedb.org/3";
const apiKey = "api_key=f232ba1f105a03a2223d3e86f3183efe"
// get popular movies 
export const getPopularMovies = async () => {
    const response = await axios.get(
        `${baseUrl}/movie/popular?${apiKey}`
    );
    return response.data.results
}

// get Upcoming Movies
export const getUpcomingMovies = async () => {
    const response = await axios.get(
        `${baseUrl}/movie/upcoming?${apiKey}`
    );
    return response.data.results
}

// get popular TV
export const getPopularTV = async () => {
    const response = await axios.get(
        `${baseUrl}/tv/popular?${apiKey}`
    );
    return response.data.results
}

// get Family Movies
export const getFamilyMovies = async () => {
    const response = await axios.get(
        `${baseUrl}/discover/movie?${apiKey}& with_genres =10751`
    );
    return response.data.results
}
// get Romantic Movies
export const getRomanticMovies = async () => {
    const response = await axios.get(
        `${baseUrl}/discover/movie?${apiKey}& with_genres =10749`
    );
    return response.data.results
}

// get Movies Details
export const getMoviesDetails = async id => {
    const response = await axios.get(
        `${baseUrl}/movie/${id}?${apiKey}`
    );
    return response.data
}

// get TV Details
export const getTVDetails = async id => {
    const response = await axios.get(
        `${baseUrl}/tv/${id}?${apiKey}`
    );
    return response.data
}
