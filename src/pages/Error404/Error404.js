import React from "react";
import "./Error404.scss";
import { Link } from "react-router-dom";
import error404 from "../../assets/img/website.png";

const Error404 = () => {
  return (
    <div className="error404">
      <h1>Error 404</h1>
      <p>Página no encontrada</p>
      <Link to="/">
        <p>Volver al inicio</p>
        <img src={error404} alt="error 404" className="error404-image" />
      </Link>
    </div>
  );
};

export default Error404;
