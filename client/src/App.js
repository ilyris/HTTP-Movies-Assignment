import React, { useState } from "react";
import axios from 'axios';
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import AddMovieForm from './AddMovieForm';

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [updatedMovie, setUpdatedMovie] = useState({});
  console.log(updatedMovie);
  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  const deleteMovie = (movieId) => {
    axios.delete(`http://localhost:5000/api/movies/${movieId}`)
    .then(response => {
      console.log(response)
      window.location.href = "http://localhost:3000/";
    })
    .catch(error => console.log(error));
  }
  return (
    <>
      <SavedList list={savedList} />
      <Route exact path="/" component={MovieList} />
      <Route
        path="/movies/:id"
        render={props => {
          return <Movie {...props} addToSavedList={addToSavedList} deleteMovie={deleteMovie} />;
        }}
      />
      <Route
        path="/update-movie/:id"
        render={props => {
          return <AddMovieForm {...props} setUpdatedMovie={setUpdatedMovie}/>;
        }}
      />
    </>
  );
};

export default App;
