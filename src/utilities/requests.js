const genres = {
  horror: 27,
  comedy: 35,
  thriller: 53,
  action: 28,
  adventure: 12,
  animation: 16,
  crime: 80,
  documentary: 99,
  sciFi: 878,
  actionAndAdventure: 10759,
  reality: 10764,
  sciFiAndFantasy: 10765,
};

const page = Math.ceil(Math.random() * 3);
console.log(page);
// const page = 3;

exports.mainRequests = {
  netflixOriginals: `discover/tv?api_key=${process.env.REACT_APP_MOVIE_API}&language=en-US&with_networks=213&page=${page}`,
  discoverPopular: `movie/popular?api_key=${process.env.REACT_APP_MOVIE_API}&language=en-US&page=1&with_networks=213`,
  discoverHorror: `discover/movie?api_key=${process.env.REACT_APP_MOVIE_API}&language=en-US&with_genres=${genres.horror}&page=${page}`,
  discoverComedy: `discover/movie?api_key=${process.env.REACT_APP_MOVIE_API}&language=en-US&with_genres=${genres.comedy}&page=${page}`,
  discoverThriller: `discover/movie?api_key=${process.env.REACT_APP_MOVIE_API}&language=en-US&with_genres=${genres.thriller}&page=${page}`,
  discoverAction: `discover/movie?api_key=${process.env.REACT_APP_MOVIE_API}&language=en-US&with_genres=${genres.action}&page=${page}`,
  discoverAdventure: `discover/movie?api_key=${process.env.REACT_APP_MOVIE_API}&language=en-US&with_genres=${genres.thriller}&page=${page}`,
  trending: `trending/all/day?api_key=631d59e924809aae36b7176af2968d58`,
};

exports.tvRequests = {
  netflixOriginals: `discover/tv?api_key=${process.env.REACT_APP_MOVIE_API}&language=en&with_networks=213&page=${page}`,
  discoverPopular: `tv/popular?api_key=${process.env.REACT_APP_MOVIE_API}&language=en-US&page=${page}`,
  discoverActionAndAdventure: `discover/tv?api_key=${process.env.REACT_APP_MOVIE_API}&language=en-US&with_genres=${genres.actionAndAdventure}&page=${page}`,
  discoverComedy: `discover/tv?api_key=${process.env.REACT_APP_MOVIE_API}&language=en&with_genres=${genres.comedy}&page=${page}`,
  discoverAnimation: `discover/tv?api_key=${process.env.REACT_APP_MOVIE_API}&language=en-US&with_genres=${genres.animation}`,
  discoverCrime: `discover/tv?api_key=${process.env.REACT_APP_MOVIE_API}&language=en-US&with_genres=${genres.crime}&page=${page}`,
  discoverDrama: `discover/tv?api_key=${process.env.REACT_APP_MOVIE_API}&language=en-US&with_genres=${genres.drama}`,
  discoverReality: `discover/tv?api_key=${process.env.REACT_APP_MOVIE_API}&language=en-US&with_genres=${genres.reality}`,
  discoverSciFi: `discover/tv?api_key=${process.env.REACT_APP_MOVIE_API}&language=en-US&with_genres=${genres.sciFiAndFantasy}&page=${page}`,
  discoverDocumentary: `discover/tv?api_key=${process.env.REACT_APP_MOVIE_API}&language=en-US&with_genres=${genres.documentary}`,
  trending: `trending/tv/day?api_key=631d59e924809aae36b7176af2968d58`,
};

exports.movieRequests = {
  netflixOriginals: `discover/movie?api_key=${process.env.REACT_APP_MOVIE_API}&language=en-US&with_networks=213`,
  discoverPopular: `movie/popular?api_key=${process.env.REACT_APP_MOVIE_API}&language=en-US&page=1`,
  discoverHorror: `discover/movie?api_key=${process.env.REACT_APP_MOVIE_API}&language=en-US&with_genres=${genres.horror}`,
  discoverComedy: `discover/movie?api_key=${process.env.REACT_APP_MOVIE_API}&language=en-US&with_genres=${genres.comedy}`,
  discoverThriller: `discover/movie?api_key=${process.env.REACT_APP_MOVIE_API}&language=en-US&with_genres=${genres.thriller}`,
  discoverAction: `discover/movie?api_key=${process.env.REACT_APP_MOVIE_API}&language=en-US&with_genres=${genres.action}`,
  discoverAdventure: `discover/movie?api_key=${process.env.REACT_APP_MOVIE_API}&language=en-US&with_genres=${genres.thriller}`,
  trending: `trending/movie/day?api_key=631d59e924809aae36b7176af2968d58`,
};
