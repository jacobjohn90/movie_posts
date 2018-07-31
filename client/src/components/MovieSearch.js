import React, { Component } from 'react';
import axios from 'axios';
import Button from '../styled/ButtonStyle';

class MovieSearch extends Component {
    state = {
        searchField: '',
        searchResults: [],
        addMovie: {}
    }

    handleChange = (event) => {
        const newState = { ...this.state }
        newState[event.target.name] = event.target.value
        this.setState(newState)
    }

    handleInitalSearch = async (event) => {
        event.preventDefault()
        let search = this.state.searchField
        search = search.replace(' ', '+')
        try {
            const res = await axios.get(`/api/externals/10?s=${search}`)
            this.setState({ searchResults: res.data.Search })

        } catch (error) {
            console.error(error);
        }
    }

    handleFinalSearch = async (index) => {
        const movie = this.state.searchResults[index]

        try {
            const res = await axios.get(`/api/externals/1?t=${movie.Title}`)
            this.setState({ addMovie: res.data })
            this.sendToDb()
        } catch (error) {
            console.error(error);
        }
    }
    sendToDb = async () => {
        const newMovie = this.state.addMovie
        const payload = {
            'title':newMovie.Title,
            'mpaa_rating': newMovie.Rated,
            'img': newMovie.Poster,
            'summary': newMovie.Plot,
            'actor': newMovie.Actors,
            'director': newMovie.Director,
            'year': newMovie.Year,
            'rating': newMovie.imdbRating
        }

        try {
            const res = await axios.post('/api/movies', payload)
            const searchResults = []
            const searchField = ''
            this.setState({ addMovie: res.data, searchResults, searchField})
            this.props.fetchMovies()
        } catch (error) {
            console.error(error);
        }
    }

    render() {
        const movieList = this.state.searchResults.map((movie, i) => {
            return (
                <button key={i} onClick={() => this.handleFinalSearch(i)}>
                    <img src={movie.Poster} alt={movie.Title} />
                    <p>{movie.Title}</p>
                </button>
            )
        })
        return (
            <div>
                <form onSubmit={this.handleInitalSearch}>
                    <div>
                        <textarea onChange={this.handleChange} name="searchField" value={this.state.searchField} />
                    </div>
                    <Button type="submit">Search Movie</Button>
                </form>
                <div>
                    {movieList}
                </div>
            </div>
        );
    }
}

export default MovieSearch;