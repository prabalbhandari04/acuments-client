import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  makeStyles,
  IconButton,
  Card,
  CardMedia,
  CardContent,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    margin: theme.spacing(2),
  },
  poster: {
    minWidth: '300px',
    height: '100%',
  },
  content: {
    padding: theme.spacing(2),
  },
  overview: {
    marginTop: theme.spacing(2),
  },
  releaseDate: {
    marginTop: theme.spacing(1),
  },
  rating: {
    marginTop: theme.spacing(1),
  },
  addToWatchlist: {
    marginTop: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    top: theme.spacing(1),
    right: theme.spacing(1),
  },
}));

const MovieDetails = ({ movieId, onClose }) => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const classes = useStyles();

  useEffect(() => {
    const fetchMovie = async () => {
      const response = await axios.get(`http://localhost:5050/movies/${movieId}`);
      setMovie(response.data);
      setLoading(false);
    };
    fetchMovie();
  }, [movieId]);

  const handleAddToWatchlist = async () => {
    try {
      await axios.post('http://localhost:5050/watchlist', { movieId });
      alert('Movie added to watchlist!');
    } catch (error) {
      console.error(error);
      alert('Failed to add movie to watchlist');
    }
  };

  return (
    <Dialog open={!!movie} onClose={onClose} maxWidth="md">
      <DialogTitle>
        <Typography variant="h4">{movie?.title}</Typography>
        <IconButton className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      {!loading && (
        <>
          <div className={classes.root}>
            <Card className={classes.poster}>
              <CardMedia
                component="img"
                alt={movie?.title}
                image={`https://image.tmdb.org/t/p/w500/${movie?.poster_path}`}
              />
            </Card>
            <div className={classes.content}>
              <CardContent>
                <Typography variant="h6">{movie?.tagline}</Typography>
                <Typography className={classes.overview} variant="body1">
                  {movie?.overview}
                </Typography>
                <Typography className={classes.releaseDate} variant="body2">
                  Released on {new Date(movie?.release_date).toLocaleDateString()}
                </Typography>
                <Typography className={classes.rating} variant="body2">
                  Rating: {movie?.vote_average} / 10 ({movie?.vote_count} votes)
                </Typography>
              </CardContent>
              <DialogActions>
                <Button
                  className={classes.addToWatchlist}
                  variant="contained"
                  color="primary"
                  onClick={handleAddToWatchlist}
                >
                  Add to Watchlist
                </Button>
              </DialogActions>
            </div>
          </div>
        </>
      )}
    </Dialog>
  );
};

export default MovieDetails;
