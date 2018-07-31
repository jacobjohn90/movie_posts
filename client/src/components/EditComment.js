import React, { Component } from 'react';
import axios from 'axios';
import { setAxiosDefaults } from '../util/SessionHeaderUtil';
import Button from '../styled/ButtonStyle';
import { FormStyle, EditCommentWrapper } from '../styled/CommentWrapper';
import { FontAwesomeStyling } from '../styled/NavWrapper';
import { FontAwesomeIcon } from '../../node_modules/@fortawesome/react-fontawesome';

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
            <EditCommentWrapper>
                <FormStyle onSubmit={this.handleSubmit}>
                    <textarea onChange={this.handleChange} name="content" value={this.state.content} placeholder={this.props.currentComment.content} />
                    <Button type="submit">
                        <FontAwesomeStyling>
                            <FontAwesomeIcon icon="save" />
                        </FontAwesomeStyling>
                    </Button>
                </FormStyle>
                <Button onClick={this.handleCancel}>Cancel</Button>
            </EditCommentWrapper>
        );
    }
}

export default EditComment;