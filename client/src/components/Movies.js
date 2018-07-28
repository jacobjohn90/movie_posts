import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import MovieSearch from './MovieSearch';

class Movies extends Component {

    state = {
        
        searchedMovies: [],
        movies: []
    }
    async componentDidMount() {
        let movies = []
        movies = await this.fetchMovies()
        this.setState({ movies })
    }

    fetchMovies = async () => {
        try {
            const res = await axios.get('/api/movies')
            return res.data
        } catch (error) {
            console.error(error)
        }
    }

    searchOmdb = async () => {
        try {

        } catch (error) {
            console.error(error);

        }

    }

    render() {
        const movieList = this.state.movies.map((movie) => {
            return (
                <Link to={`/${movie.id}`} key={movie.id}>{movie.title}</Link>
            )
        })
        return (
            <div>
                <h1>{movieList}</h1>
                <div>
                    <h3>Movie Search</h3>
                    <MovieSearch />
                </div>
            </div>
        );
    }
}

export default Movies;