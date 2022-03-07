const getAttentionInfo = async (
  setLoadingFunc,
  setItemFunc,
  method,
  request,
  getTrailerFunc,
  setTrailerFunc,
  setGenresFunc
) => {
  try {
    setLoadingFunc(true);
    // const selector = Math.floor(Math.random() * 19);
    const response = await method.get(request.trending);
    setItemFunc(response.data.results[0]);

    const trailer = await getTrailerFunc(null, {
      tmdbId: response.data.results[0].id,
    });
    setTrailerFunc(trailer);

    const movieGenres = await method.get(
      "https://api.themoviedb.org/3/genre/movie/list?api_key=631d59e924809aae36b7176af2968d58&language=en-US"
    );
    const tvGenres = await method.get(
      "https://api.themoviedb.org/3/genre/tv/list?api_key=631d59e924809aae36b7176af2968d58&language=en-US"
    );
    const combinedGenres = movieGenres.data.genres.concat(tvGenres.data.genres);
    setGenresFunc(combinedGenres);
    setLoadingFunc(false);
  } catch (err) {
    setLoadingFunc(false);
    console.log(err);
  }
};

export default getAttentionInfo;
