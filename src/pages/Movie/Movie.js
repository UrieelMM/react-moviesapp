import React, { useState } from "react";
import { Row, Col, Button } from "antd";
import { useParams } from "react-router-dom";
import moment from "moment";
import useFetch from "../../Hooks/useFetch";
import { URL_API, URL_KEY } from "../../utils/constants";
import { PlayCircleTwoTone } from "@ant-design/icons";
import "./Movie.scss";
import Loading from "../../components/Loading/Loading";
import ModalVideo from "../../components/ModalVideo/ModalVideo";

const Movie = () => {
  const { id } = useParams();
  const movieInfo = useFetch(
    `${URL_API}/movie/${id}?api_key=${URL_KEY}&language=es-ES`
  );

  // If para validar que movieInfo está cargando o que traiga datos
  if (movieInfo.loading || !movieInfo.result) {
    return <Loading />;
  }
  return (
    <>
      <RenderMovie movieInfo={movieInfo.result} />
    </>
  );
};

// Componente  RenderMovie
const RenderMovie = (props) => {
  const {
    movieInfo: { backdrop_path, poster_path },
  } = props;
  const backdropPath = `https://image.tmdb.org/t/p/original/${backdrop_path}`;

  return (
    <div
      className="movie"
      style={{ backgroundImage: `url('${backdropPath}')` }}
    >
      <div className="movie__dark"></div>
      <Row>
        <Col span={8} offset={3} className="movie__poster">
          <PosterMovie image={poster_path} />
        </Col>
        <Col span={10} className="movie__info">
          <InfoMovie movieInfo={props.movieInfo} />
        </Col>
      </Row>
    </div>
  );
};

// Componente PosterMovie
const PosterMovie = (props) => {
  const { image } = props;
  const posterPath = `https://image.tmdb.org/t/p/original/${image}`;

  return <div style={{ backgroundImage: `url('${posterPath}')` }}></div>;
};

// Component InfoMovie
const InfoMovie = (props) => {
  const {
    movieInfo: { title, overview, id, release_date, genres },
  } = props;
  // Estados del Modal
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [stopPlaying, setStopPlaying] = useState(true);
  const videoMovie = useFetch(
    `${URL_API}/movie/${id}/videos?api_key=${URL_KEY}&language=es-ES
    `
  );
  console.log(videoMovie);
  // Funciones para abrir y cerrar el modal
  const openModal = () => {
    setIsVisibleModal(true);
    setStopPlaying(true);
  };
  const closeModal = () => {
    setIsVisibleModal(false);
    setStopPlaying(false);
  };
  const renderVideo = () => {
    if (videoMovie.result) {
      if (videoMovie.result.results.length > 0) {
        return (
          <>
            <Button
              icon={<PlayCircleTwoTone style={{ fontSize: 26 }} />}
              onClick={openModal}
            >
              Ver película
            </Button>
            <ModalVideo
              videoKey={videoMovie.result.results[0].key}
              videoPlatform={videoMovie.result.results[0].site}
              isOpen={isVisibleModal}
              close={() => closeModal()}
              stopPlaying={stopPlaying}
            />
          </>
        );
      }
    }
  };
  return (
    <>
      <div className="movie__info-header">
        <h3>
          {title}{" "}
          <span>{moment(release_date, "YYYY-MM-DD").format("YYYY")}</span>
        </h3>
        {renderVideo()}
      </div>
      <div className="movie__info-content">
        <h3>Info General</h3>
        <p>{overview}</p>
        <h3>Géneros</h3>
        <ul>
          {genres.map((item) => {
            return <li key={item.id}>{item.name}</li>;
          })}
        </ul>
      </div>
    </>
  );
};
export default Movie;
