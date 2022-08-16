import axios from "axios";

const MOVIE_API_URL = "http://localhost:8080/api/v1/movies";

class MovieService{

    getMovies(){
            return axios.get(MOVIE_API_URL);
    }

    createMovie(movie){
        return axios.post(MOVIE_API_URL, movie)
    }

    getMovieById(movieId){
            return axios.get(MOVIE_API_URL + '/' + movieId);
    }
}

export default new MovieService();