const APIKEY = "64db60c03859099f46e2e2c2c193e9f3";

const requests = {
    fetchPopularMovies: `https://api.themoviedb.org/3/movie/popular?api_key=${APIKEY}&language=en-US&page=1`,
    fetchPopularPeople: `https://api.themoviedb.org/3/person/popular?api_key=${APIKEY}&language=en-US&page=1`,
    fetchInTheater: `https://api.themoviedb.org/3/movie/now_playing?api_key=${APIKEY}&language=en-US&page=1`,
    fetchForRent: `https://api.themoviedb.org/3/tv/on_the_air?api_key=${APIKEY}&language=en-US&page=1`,
    fetchOnTV: `https://api.themoviedb.org/3/trending/tv/week?api_key=${APIKEY}`,
    getClipForMovie: `https://api.themoviedb.org/3/movie/MOVIE_ID/videos?api_key=${APIKEY}&language=en-US`,
    getDetailForMovie: `https://api.themoviedb.org/3/movie/MOVIE_ID?api_key=${APIKEY}`,
    getDetailForMovieOnTV: `https://api.themoviedb.org/3/tv/MOVIE_ID?api_key=${APIKEY}&language=en-US`,
    getClipForMovieOnTV: `https://api.themoviedb.org/3/tv/MOVIE_ID/videos?api_key=${APIKEY}&language=en-US`,
    getPersonInformation: `https://api.themoviedb.org/3/person/PEOPLE_ID?api_key=${APIKEY}&language=en-US`,
    getImagedTaggedForPerson: `https://api.themoviedb.org/3/person/PEOPLE_ID/movie_credits?api_key=${APIKEY}&language=en-US`,
    fetchUpComingMovies: `https://api.themoviedb.org/3/movie/upcoming?api_key=${APIKEY}&language=en-US&page=1`,
    getMoreImageForMovie: `https://api.themoviedb.org/3/movie/MOVIE_ID/images?api_key=${APIKEY}`,
    getMovieWatchList: `https://api.themoviedb.org/3/account/%7Baccount_id%7D/watchlist/movies?api_key=${APIKEY}&language=en-US&session_id=fe78372ad3e780291fc837ab3246bc613ffb6b89&sort_by=created_at.desc&page=1`,
    getUpComingMoviesNoLanguage: `https://api.themoviedb.org/3/movie/upcoming?api_key=${APIKEY}&page=1`
}
//Link dự phòng khi server phản hồi chậm
//Now playing ( thay the cho fetchInTheater )
// https://api.themoviedb.org/3/movie/now_playing?api_key=${APIKEY}&language=en-US&page=1
// https://api.themoviedb.org/3/movie/upcoming?api_key=${APIKEY}&language=en-US&page=1
export default requests;