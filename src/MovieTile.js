import React from 'react';

const MovieTile = ({ movie }) => {

  const handleAddToWatchlist = () => {
    alert('Add to Watchlist')
  };

  return (
    <div className="movie-tile">
      <img
        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
        alt={movie.title}
        className="movie-tile__poster"
      />
      <div className="movie-tile__info">
        <h3 className="movie-tile__title">{movie.title}</h3>
        <p className="movie-tile__release-date">
          {new Date(movie.release_date).toLocaleDateString()}
        </p>
        <p className="movie-tile__rating">{movie.vote_average}/10</p>
        <button onClick={handleAddToWatchlist}>Add to watchlist</button>
      </div>
    </div>
  );
};

export default MovieTile;
