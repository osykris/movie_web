import React from "react";
import { Grid, Paper } from "@mui/material";
import { Link } from "react-router-dom";
import { useGetMovie } from "../../service/Query";
import StarIcon from "@mui/icons-material/Star";
import { BeatLoader } from "react-spinners";

const ListMovie = () => {
  const { movies, isLoading, isError, error } = useGetMovie();

  return (
    <div>
      <div className="Movie-list">
        <h3 style={{ m: 20, color: "white" }}>Now Playing Movie List</h3>
        <br />
        {isLoading ? (
          <span>{<BeatLoader />}</span>
        ) : isError ? (
          <span>{"Error..." + error.message}</span>
        ) : (
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {movies &&
              movies.map((movie, i) => (
                <>
                  <Grid item xs={2} sm={4} md={3} key={i}>
                    <Link to={`/detail-movie/${movie.id}`}>
                      <Paper sx={{ p: 2, fontWeight: 500 }}>
                        {movie.title}
                      </Paper>
                    </Link>
                    <Paper>
                      <img
                        className="Movie-image"
                        src={`${"https://image.tmdb.org/t/p/w500"}/${
                          movie.poster_path
                        }`}
                        alt={movie.title}
                        width={150}
                      />
                    </Paper>
                    <Paper>{movie.release_date}</Paper>
                    <Paper sx={{ pb: 2, color: "secondary.main" }}>
                      <StarIcon></StarIcon> {movie.vote_average}
                    </Paper>
                  </Grid>
                </>
              ))}
          </Grid>
        )}
      </div>
    </div>
  );
};

export default ListMovie;
