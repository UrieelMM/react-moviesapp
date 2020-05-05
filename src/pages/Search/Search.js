import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import queryString from "query-string";
import MovieCatalog from "../../components/MovieCatalog/MovieCatalog";
import { URL_API, URL_KEY } from "../../utils/constants";
import { Row, Col, Input } from "antd";
import "./Search.scss";

const Search = (props) => {
  const { location, history } = props;
  const [movieList, setMovieList] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  useEffect(() => {
    // obtener los valores de la busqueda
    const data = async () => {
      const searchValue = queryString.parseUrl(location.search);
      const { s } = searchValue.query;
      const response = await fetch(
        `${URL_API}/search/movie?api_key=${URL_KEY}&language=es-ES&query=${s}&page=1`
      );
      const movies = await response.json();
      setSearchValue(s);
      setMovieList(movies);
    };
    data();
  }, [location.search]);
  // Input
  const onChangeSearch = (event) => {
    const urlParams = queryString.parse(location.search);
    urlParams.s = event.target.value;
    history.push(`?${queryString.stringify(urlParams)}`);
    event.preventDefault();
    setSearchValue(event.target.value);
  };
  return (
    <Row className="search-bg">
      <Col span={12} offset={6} className="search">
        <h3>Buscar películas</h3>
        <Input onChange={onChangeSearch} type="text" value={searchValue} />
      </Col>
      {movieList.results && (
        <Row>
          <Col span={24}>
            <MovieCatalog movies={movieList} />
          </Col>
        </Row>
      )}
    </Row>
  );
};

export default withRouter(Search);
