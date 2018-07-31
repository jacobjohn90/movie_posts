import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import MovieSearch from './MovieSearch';
import { MoviesStyles, MovieSearchStyle } from '../styled/MoviesWrapper';
import { userIsLoggedIn } from '../util/SessionHeaderUtil';

class Movies extends Component {

    state = {
        signedIn: '',
        searchedMovies: [],
        movies: []
    }
    async componentDidMount() {
        this.fetchMovies()
        const signedIn = userIsLoggedIn()
        this.setState({ signedIn })

    }

    fetchMovies = async () => {
        try {
            const res = await axios.get('/api/movies')
            this.setState({ movies: res.data })
        } catch (error) {
            console.error("fetching movies", error)
        }
    }

    render() {
        const movieList = this.state.movies.map((movie) => {
            return (
                <Link to={`/${movie.id}`} key={movie.id}>
                    <img src={movie.img} alt={movie.title} />
                    <p>{movie.title}</p>
                </Link>
            )
        })
        return (
            <MoviesStyles>
                {movieList}
                <MovieSearchStyle>
                    <div>
                        <h3>Movie Search</h3>
                        <MovieSearch fetchMovies={this.fetchMovies} />
                    </div>
                </MovieSearchStyle>
            </MoviesStyles>
        );
    }
}

export default Movies;