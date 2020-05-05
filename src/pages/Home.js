import React from "react";
import useFetch from "../Hooks/useFetch";
import { Row, Col } from "antd";
import { URL_API, URL_KEY } from "../utils/constants";
import SliderMovies from "../components/SliderMovies/SliderMovies";
import MoviesList from "../components/MoviesList/MoviesList";
import Footer from "../components/Footer/Footer";

const Home = () => {
  const newMovies = useFetch(
    `${URL_API}/movie/now_playing?api_key=${URL_KEY}&language=es-ES&page=1`
  );
  const popularMovies = useFetch(
    `${URL_API}/movie/popular?api_key=${URL_KEY}&language=es-ES&page=1`
  );
  const topMovies = useFetch(
    `${URL_API}/movie/top_rated?api_key=${URL_KEY}&language=es-ES&page=1`
  );
  return (
    <>
      <SliderMovies movies={newMovies} />
      <Row>
        <Col span={12}>
          <MoviesList movies={popularMovies} title="Películas Populares" />
        </Col>
        <Col span={12}>
          <MoviesList movies={topMovies} title="Películas más votadas" />
        </Col>
      </Row>
      <Footer />
    </>
  );
};

export default Home;
