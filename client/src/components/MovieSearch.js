import React, { Component } from 'react';
import axios from 'axios';
import { userIsLoggedIn } from '../util/SessionHeaderUtil';

class MovieSearch extends Component {
    state = {
        signedIn: '',
        searchField: '',
        searchResult: {},
        addMovie: {}
    }

    handleChange = (event) => {
        const newState = { ...this.state }
        newState[event.target.name] = event.target.value
        this.setState(newState)
    }

    handleSubmit = async (event) => {
        event.preventDefault()
        let search = this.state.searchField
        search = search.replace(' ', '+')
        try {
            const res = await axios.get(`/api/externals?t=${search}`)
            this.setState({ searchResult: res.data })

        } catch (error) {
            console.error(error);
        }
    }

    addToDb = async () => {
        const movie = this.state.searchResult
        const signedIn = userIsLoggedIn()
        const payload = {
            'title': movie.Title,
            'mpaa_rating': movie.Rating,
            'img': movie.Poster,
            'summary': movie.Plot
        }
        if (signedIn) {
            try {
                const res = await axios.post('/api/movies', payload)
                this.setState({ addMovie: res.data, searchResult: '' })
                this.props.fetchMovies()
            } catch (error) {
                console.error(error);
            }
        } else {
            console.log("Must be logged in");
            
        }

    }
    render() {
        const movie = this.state.searchResult
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <textarea onChange={this.handleChange} name="searchField" value={this.state.searchField} />
                    </div>
                    <button type="submit">Search Movie</button>
                </form>
                <div>
                    {movie['Title']
                        ?
                        <div>
                            <button onClick={this.addToDb}>
                                <img src={movie.Poster} alt={movie.Title} />
                            </button>
                        </div>
                        :
                        null
                    }
                </div>
            </div>
        );
    }
}

export default MovieSearch;