import React from "react";
import { Carousel, Button } from "antd";
import { Link } from "react-router-dom";
import Loading from "../Loading/Loading";
import "./SliderMovies.scss";

const SliderMovies = (props) => {
  // Estos props movies vienen de Home
  const { movies } = props;

  if (movies.loading || !movies.result) {
    return <Loading />;
  }
  const { results } = movies.result;
  return (
    <Carousel autoplay className="slider-movies">
      {results.map((movie) => {
        return <MovieNew key={movie.id} movie={movie} />;
      })}
    </Carousel>
  );
};

// Se crea el componente Movie aquí directamente
const MovieNew = (props) => {
  const {
    movie: { id, backdrop_path, title, overview },
  } = props;
  const backdropPath = `https://image.tmdb.org/t/p/original${backdrop_path}`;

  return (
    <div
      className="slider-movies__movie"
      style={{ backgroundImage: `url('${backdropPath}')` }}
    >
      <div className="slider-movies__movie-info">
        <div>
          <h2>{title}</h2>
          <p>{overview}</p>
          <Link to={`/movie/${id}`}>
            <Button type="primary">Ver más</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default SliderMovies;
