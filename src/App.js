import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Layout } from "antd";
import MenuTop from "./components/Menu/MenuTop";
// Pages
import Home from "./pages/Home";
import Search from "./pages/Search/Search";
import Error404 from "./pages/Error404/Error404";
import Movie from "./pages/Movie/Movie";
import Popular from "./pages/Popular";
import NewMovies from "./pages/NewMovies";

function App() {
  const { Header, Content } = Layout;
  return (
    <Layout>
      <BrowserRouter>
        <Header style={{ zIndex: 1 }}>
          <MenuTop />
        </Header>
        <Content>
          <Switch>
            <Route path="/" exact={true}>
              <Home />
            </Route>
            <Route path="/news-movies" exact={true}>
              <NewMovies />
            </Route>
            <Route path="/popular" exact={true}>
              <Popular />
            </Route>
            <Route path="/search" exact={true}>
              <Search />
            </Route>
            <Route path="/movie/:id" exact={true}>
              <Movie />
            </Route>
            <Route path="*">
              <Error404 />
            </Route>
          </Switch>
        </Content>
      </BrowserRouter>
    </Layout>
  );
}
export default App;
