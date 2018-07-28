import React, { Component } from 'react';
import axios from 'axios';
import { setAxiosDefaults } from '../util/SessionHeaderUtil';

class EditComment extends Component {
    
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
        const commentId = this.props.currentComment.id

        const payload = {
            user_id: this.props.userId,
            content: this.state.content
        }
        try {
            setAxiosDefaults()
            await axios.patch(`/api/movies/${movieId}/comments/${commentId}`, payload)
            this.props.fetchComments()
            this.props.hideEditForm(commentId)
        } catch (error) {
            console.error(error);
        }

    }
    handleCancel = (event) => {
        const commentId = this.props.currentComment.id
        event.preventDefault()
        this.props.hideEditForm(commentId)
    }
    
    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <textarea onChange={this.handleChange} name="content" value={this.state.content} placeholder={this.props.currentComment.content} />
                    </div>
                    <button type="submit">Save Changes</button>
                </form> 
                <button onClick={this.handleCancel}>Cancel</button>
            </div>
        );
    }
}

export default EditComment;