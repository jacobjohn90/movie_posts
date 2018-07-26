import React, { Component } from 'react';
import Axios from 'axios'
import { setAxiosDefaults } from '../util/SessionHeaderUtil';
import { fetchCurrentUserEmail, fetchUsers } from '../util/FetchCurrentUser';

class Movie extends Component {

    state = {
        movie: {},
        comments: [],
        currentUserEmail: '',
        currentUserId: ''
    }

    async componentDidMount() {
        let movie = {}
        let comments = []
        movie = await this.fetchMovie()
        comments = await this.fetchComments()
        const currentUserEmail = await fetchCurrentUserEmail()
        this.setState({ movie, comments, currentUserEmail })
        this.fetchCurrentUserId()
    }

    fetchMovie = async () => {
        const movieId = this.props.match.params.movie_id
        const res = await Axios.get(`/api/movies/${movieId}`)
        return res.data
    }

    fetchComments = async () => {
        const movieId = this.props.match.params.movie_id
        setAxiosDefaults()
        const res = await Axios.get(`/api/movies/${movieId}/comments`)
        return res.data
    }
    fetchCurrentUserId = async () => {
        const users = await fetchUsers()
        const currentUser = users.find((user) => user.email === this.state.currentUserEmail)
        this.setState({ currentUserId: currentUser.id })
    }

    deleteComment = async (commentId) => {
        const movieId = this.props.match.params.movie_id
        try {
            setAxiosDefaults()
            await Axios.delete(`/api/movies/${movieId}/comments/${commentId}`)
            const comments = await this.fetchComments()
            this.setState({ comments })
        } catch (error) {
            console.error(error)
        }
    }

    render() {
        const movie = this.state.movie
        const commentList = this.state.comments.map((comment) => {
            return (
                <div key={comment.id}>
                    <p>{comment.content}</p>
                    {this.state.currentUserId == comment.user_id
                        ?
                        <div>
                            <button onClick={() => this.deleteComment(comment.id)}>Delete Comment</button>
                        </div>
                        :
                        null
                    }
                </div>
            )
        })

        return (
            <div>
                <div>
                    <h1>{movie.title}</h1>
                    <img src={movie.img} alt="Movie Poster" />
                    <p> <strong>Description:</strong> {movie.summary}</p>
                </div>
                <div>
                    <h2>Comments about this Movie</h2>
                    {commentList}
                </div>
            </div>
        );
    }
}

export default Movie;         