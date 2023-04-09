import React, { useEffect, useState } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import MovieTile from './MovieTile';

const MovieList = () => {
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [movie, setMovie] = useState([])

  const fetchMovies = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('http://localhost:5050/movies', {
        params: {
          page,
        },
      });
      const { results, total_pages } = response.data;
      setMovie(prevMovies => [...prevMovies, ...results]);
      setHasMore(page < total_pages);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  

  const handleLoadMore = () => {
    if (!isLoading) {
      setPage(page + 1);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [page]);
  console.log(movie)
  return (
    // <div>
    //     <h1>Tetst</h1>
    // </div>
    <InfiniteScroll
      dataLength={movie.length}
      next={handleLoadMore}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}
    >
      <div className="movie-list">
        {movie.map((movie) => (
          <MovieTile key={movie.id} movie={movie} />
        ))}
      </div>
    </InfiniteScroll>
  );
};

export default MovieList;
