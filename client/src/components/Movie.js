import React, { Component } from 'react';
import Axios from 'axios'
import { setAxiosDefaults, userIsLoggedIn } from '../util/SessionHeaderUtil';
import { fetchCurrentUserEmail, fetchUsers } from '../util/FetchCurrentUser';
import NewComment from './NewComment';
import EditComment from './EditComment';

class Movie extends Component {

    state = {
        movie: {},
        comments: [],
        currentUserEmail: '',
        currentUserId: '',
        signedIn: '',
        showEdit: {}
    }

    async componentDidMount() {
        let movie = {}
        movie = await this.fetchMovie()
        await this.fetchComments()
        const currentUserEmail = await fetchCurrentUserEmail()
        const signedIn = await userIsLoggedIn()
        this.setState({ movie, currentUserEmail, signedIn })
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
        this.setState({ comments: res.data })
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
            await this.fetchComments()
        } catch (error) {
            console.error(error)
        }
    }
    handleUpdateShow = (input) => {
        const showEdit = { ...this.state.showEdit }
        showEdit["show" + input] = true
        this.setState({ showEdit })
    }
    hideEditForm = (input) => {
        const showEdit = { ...this.state.showEdit }
        showEdit["show" + input] = false
        this.setState({ showEdit })
    }

    render() {
        const movie = this.state.movie
        const commentList = this.state.comments.map((comment) => {
            return (
                <div key={comment.id}>
                    {this.state.currentUserId === comment.user_id
                        ?
                        <div>
                            {this.state.showEdit["show" + comment.id]
                                ?
                                <EditComment userId={this.state.currentUserId} fetchComments={this.fetchComments} {...this.props} currentComment={comment} hideEditForm={this.hideEditForm} />
                                :
                                <div>
                                    <p>{comment.content}</p>
                                    <button onClick={() => this.handleUpdateShow(comment.id)}>Edit</button>
                                </div>
                            }
                            {/* <EditComment userId={this.state.currentUserId} fetchComments={this.fetchComments} {...this.props} currentComment={comment}/> */}
                            <button onClick={() => this.deleteComment(comment.id)}>Delete Comment</button>
                        </div>
                        :
                        <p>{comment.content}</p>
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
                    {this.state.signedIn
                        ?
                        <NewComment userId={this.state.currentUserId} fetchComments={this.fetchComments} {...this.props} />
                        :
                        null
                    }
                </div>
            </div>
        );
    }
}

export default Movie;         