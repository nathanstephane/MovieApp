import React from "react";
import { Route, Switch } from "react-router-dom";

import Header from "../src/components/shared/Header"
 
import { AuthProvider } from "./context/AuthContext";

import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Logout from "./pages/logout/Logout";
import MovieList from "./pages/movie-list/MovieList";
import Movie from "./pages/movie/Movie";
import Register from "./pages/register/Register";
import "./App.scss";
//import Footer from "../shared/Footer";
import Footer from "../src/components/shared/Footer"
import ListMoviesComponents from "./components/ListMoviesComponents";

import CreateMovieComponent from "./components/shared/CreateMovieComponent";

import UpdateMovieComponent from "./components/UpdateMovieComponent";

const App = () => {
  return (
      <AuthProvider>
        <Header />
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/movies" exact>
            <MovieList />
          </Route>
          <Route path="/login" exact>
            <Login />
          </Route>
          <Route path="/logout" exact>
            <Logout />
          </Route>
          <Route path="/register" exact>
            <Register />
          </Route>
          <Route path="/:id" exact>
            <Movie />
          </Route>

          <Route path="/api/movies" exact>
            <ListMoviesComponents />
          </Route>

          <Route path="/api/add-movies" exact>
            <CreateMovieComponent/>
          </Route>

          <Route path="/api/update-movies" exact>
            <UpdateMovieComponent/>
          </Route>
        </Switch>
        <Footer />
      </AuthProvider>
  );
};

export default App;
