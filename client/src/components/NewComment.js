import React, { Component } from 'react';
import axios from 'axios';
import { setAxiosDefaults } from '../util/SessionHeaderUtil';
class NewComment extends Component {

    state = {
        content: ''
    }


    handleChange = (event) => {
        const newState = { ...this.state }
        newState[event.target.name] = event.target.value
        this.setState(newState)
    }

    handleSubmit = async (event) => {
        event.preventDefault()
        const movieId = this.props.match.params.movie_id
        const payload = {
            user_id: this.props.userId,
            content: this.state.content
        }
        try {
            setAxiosDefaults()
            await axios.post(`/api/movies/${movieId}/comments`, payload)
            this.props.fetchComments()
        } catch (error) {
            console.error(error);
        }

    }

    render() {

        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <input onChange={this.handleChange} type="text" name="content" value={this.state.content} />
                    </div>
                    <button type="submit">Add New Comment</button>
                </form>
            </div>
        );
    }
}

export default NewComment;