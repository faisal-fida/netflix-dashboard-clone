import axios from "axios";

const getGenres = async (setGenresFunc) => {
  try {
    const movieGenres = await axios.get(
      "https://api.themoviedb.org/3/genre/movie/list?api_key=631d59e924809aae36b7176af2968d58&language=en-US"
    );
    const tvGenres = await axios.get(
      "https://api.themoviedb.org/3/genre/tv/list?api_key=631d59e924809aae36b7176af2968d58&language=en-US"
    );
    const combinedGenres = movieGenres.data.genres.concat(tvGenres.data.genres);
    setGenresFunc(combinedGenres);
  } catch (err) {
    console.log(err);
  }
};

export default getGenres;
