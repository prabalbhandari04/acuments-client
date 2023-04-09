import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import MovieTile from './MovieTile';
import Filter from './Filter';

const MovieList = () => {
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [filters, setFilters] = useState({ language: 'en', year: 'all', sortBy: 'popularity' });

  const fetchMovies = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('http://localhost:5050/movies', {
        params: {
          page,
          language: filters.language,
          year: filters.year,
          sortBy: filters.sortBy === 'newest' ? 'releaseDate' : filters.sortBy,
        },
      });
      const { results, total_pages } = response.data;
      setMovies(prevMovies => [...prevMovies, ...results]);
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

  const handleFilterChange = async (newFilters) => {
    setFilters(newFilters);
    setPage(1);
    setMovies([]);
    try {
      const response = await axios.get('http://localhost:5050/movies', {
        params: {
          page: 1,
          language: newFilters.language,
          year: newFilters.year,
          sortBy: newFilters.sortBy === 'newest' ? 'releaseDate' : newFilters.sortBy,
        },
      });
      const { results, total_pages } = response.data;
      setMovies(results);
      setHasMore(total_pages > 1);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [page, filters]);

  return (
    <div>
      <Filter onFilterChange={handleFilterChange} />
      <InfiniteScroll
        dataLength={movies.length}
        next={handleLoadMore}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
      >
        <div className="movie-list">
          {movies.map((movie) => (
            <MovieTile key={movie.id} movie={movie} />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default MovieList;
