import React, { Component } from 'react';
import axios from 'axios';
import { setAxiosDefaults } from '../util/SessionHeaderUtil';
import Button from '../styled/ButtonStyle';
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
            this.setState({content: ''})
        } catch (error) {
            console.error(error);
        }

    }

    render() {

        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <textarea onChange={this.handleChange} name="content" value={this.state.content} />
                    </div>
                    <Button type="submit">Add New Comment</Button>
                </form>
            </div>
        );
    }
}

export default NewComment;