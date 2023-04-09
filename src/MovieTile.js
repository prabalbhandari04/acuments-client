import React from 'react';

function MovieTile({ movie }) {
  return (
    <div className="movie-tile">
      <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
      <div className="movie-details">
        <h2>{movie.title}</h2>
        <p>{movie.release_date}</p>
        <p>Rating: {movie.vote_average}</p>
        <p>{movie.overview}</p>
      </div>
    </div>
  );
}

export default MovieTile;
