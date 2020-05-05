import React, { useState, useEffect } from "react";
import { Row, Col } from "antd";
import { URL_API, URL_KEY } from "../utils/constants";
import Footer from "../components/Footer/Footer";
import Loading from "../components/Loading/Loading";
import MovieCatalog from "../components/MovieCatalog/MovieCatalog";
import PaginationMovies from "../components/PaginationMovies/PaginationMovies";
import "../components/MovieCatalog/MovieCatalog.scss";

const Popular = () => {
  const [movieList, setMovieList] = useState([]);
  const [page, setPage] = useState(1);
  useEffect(() => {
    const data = async () => {
      const response = await fetch(
        `${URL_API}/movie/popular?api_key=${URL_KEY}&language=es-ES&page=${page}`
      );
      const movies = await response.json();
      setMovieList(movies);
    };
    data();
  }, [page]);
  // función para cambiar de página
  const onChangePage = (page) => {
    setPage(page);
  };

  return (
    <>
      <h1
        style={{
          fontSize: 32,
          fontWeight: "bold",
          textAlign: "center",
          marginTop: "32px",
        }}
      >
        Películas Más Vistas
      </h1>
      <Row>
        <Col span="24" style={{ marginTop: 25 }}></Col>
        {movieList.results ? (
          <>
            <Col span="24">
              <MovieCatalog movies={movieList} />
            </Col>
            <Col span="24">
              <PaginationMovies
                currentPage={movieList.page}
                totalItems={movieList.total_results}
                onChangePage={onChangePage}
              />
            </Col>
          </>
        ) : (
          <Col>
            <Loading />
          </Col>
        )}
      </Row>
      <Footer />
    </>
  );
};

export default Popular;
