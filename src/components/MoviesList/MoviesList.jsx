import React from "react";
import { List, Avatar } from "antd";
import { RightCircleTwoTone } from "@ant-design/icons";
import "./MoviesList.scss";
import { Link } from "react-router-dom";
import Loading from "../Loading/Loading";

const MoviesList = (props) => {
  const { movies, title } = props;

  if (movies.loading || !movies.result) {
    return <Loading />;
  }

  return (
    <div
      style={{ marginTop: "80px", marginBottom: "80px" }}
      className="bg-movies"
    >
      <List
        className="movie-list"
        size="default"
        header={<h2>{title}</h2>}
        bordered
        dataSource={movies.result.results}
        renderItem={(movie) => <MoviePopular movie={movie} />}
      ></List>
    </div>
  );
};

const MoviePopular = (props) => {
  const {
    movie: { id, title, poster_path, release_date, vote_average },
  } = props;
  const posterPath = `https://image.tmdb.org/t/p/original${poster_path}`;
  const dateRelease = release_date.slice(0, 4);

  return (
    <List.Item className="movie-list__movie">
      <List.Item.Meta
        avatar={
          <Link to={`/movie/${id}`}>
            <Avatar
              style={{ width: "120px", height: "120px" }}
              src={posterPath}
            ></Avatar>
          </Link>
        }
        title={<Link to={`/movie/${id}`}>{title}</Link>}
        description={
          <div class="movie-list-description">
            <p>{dateRelease}</p>
            <p>
              Rank: <span>{vote_average}</span>
            </p>
          </div>
        }
      ></List.Item.Meta>
      <Link to={`/movie/${id}`}>
        <RightCircleTwoTone style={{ fontSize: "40px" }} />
      </Link>
    </List.Item>
  );
};
export default MoviesList;
