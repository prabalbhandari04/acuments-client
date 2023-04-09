import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActionArea, CardContent, CardMedia, Typography, Button } from '@material-ui/core';
import MovieDetails from './MovieDetails';

const useStyles = makeStyles({
  root: {
    maxWidth: 500,
  },
  media: {
    height: 500,
    width : 400
  },
});

const MovieTile = ({ movie }) => {
  const [showDetails, setShowDetails] = useState(false);
  const classes = useStyles();

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Card className={classes.root}>
        <CardActionArea onClick={toggleDetails}>
          <CardMedia
            className={classes.media}
            image={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            title={movie.title}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {movie.title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Released on {new Date(movie.release_date).toLocaleDateString()}
            </Typography>
          </CardContent>
        </CardActionArea>
        <Button size="small" color="primary" onClick={() => alert('Add to Watchlist')}>
          Add to watchlist
        </Button>
        {showDetails && <MovieDetails movieId={movie.id} onClose={toggleDetails} />}
      </Card>
    </div>
  );
};

export default MovieTile;
