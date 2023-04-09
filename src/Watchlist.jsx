import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress, Typography } from '@material-ui/core';
import MovieTile from './MovieTile';
import axios from 'axios';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
});

const Watchlist = () => {
  const classes = useStyles();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5050/watchlist');
        setMovies(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className={classes.root}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div>
      <Typography variant="h4" style={{ textAlign: 'center' }}>
        My Watchlist
      </Typography>
      {movies.length === 0 ? (
        <Typography variant="body1" style={{ textAlign: 'center' }}>
          No movies added to watchlist
        </Typography>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
          {movies.map((movie) => (
            <MovieTile key={movie._id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Watchlist;
