import React, {useState} from 'react';
import axios from 'axios';

const AddMovieForm = (props) => {
    const [formState, setFormState] = useState({
        title: '',
        director: '',
        metascore: 0,
        stars: []
    });
    const handleChange = (event) => {
        return setFormState({...formState, [event.target.name]: event.target.value});
    }
    const handleSubmit = (event,movieId) => {
        event.preventDefault();
        formState.stars = formState.stars.split(" ");
        const putFunction = () => {
            axios.put(`http://localhost:5000/api/movies/${movieId}`, formState )
            .then(reponse => {
                console.log(reponse);
                props.setUpdatedMovie(reponse.data);
                setFormState({
                    title: '',
                    director: '',
                    metascore: 0,
                    stars: []
                });
                props.history.push(`/movies/${props.match.params.id}`);
            }).catch(error => console.log(error)) 
        }
        return putFunction();
    }
    console.log(formState);
    return(
        <form onSubmit={ (event) => handleSubmit(event, props.match.params.id)} >
            <input onChange={handleChange} type='text' value={formState.title} name="title"/>
            <input onChange={handleChange} type='text' value={formState.director} name="director"/>
            <input onChange={handleChange} type='text' value={formState.metascore} name="metascore"/>
            <input onChange={handleChange} type='text' value={formState.stars.toString()} name="stars"/>
            <button type="submit">Submit</button>
        </form>
    );
}

export default AddMovieForm;