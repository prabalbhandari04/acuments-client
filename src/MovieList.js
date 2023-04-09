import React from 'react';
import { useSelector } from 'react-redux';
import MovieTile from './MovieTile';

function MovieList() {
  const movies = useSelector((state) => state.movies);

  return (
    <div className="movie-list">
      {movies.map((movie) => (
        <MovieTile key={movie.id} movie={movie} />
      ))}
    </div>
  );
}

export default MovieList;
