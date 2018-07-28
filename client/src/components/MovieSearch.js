import React, { Component } from 'react';
import axios from 'axios';

class MovieSearch extends Component {
    state = {
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
            console.log(res.data)

        } catch (error) {
            console.error(error);
        }

    }
    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <textarea onChange={this.handleChange} name="searchField" value={this.state.searchField} />
                    </div>
                    <button type="submit">Search Movie</button>
                </form>
            </div>
        );
    }
}

export default MovieSearch;