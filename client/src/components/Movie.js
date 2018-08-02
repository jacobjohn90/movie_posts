import React, { Component } from 'react';
import Axios from 'axios'
import { setAxiosDefaults, userIsLoggedIn } from '../util/SessionHeaderUtil';
import { fetchCurrentUserEmail, fetchUsers } from '../util/FetchCurrentUser';
import NewComment from './NewComment';
import EditComment from './EditComment';
import { MovieTextWrapper, MovieContentWrapper, MovieWrapper, CommentWrapper, TextWrapper, NewCommentWrapper } from '../styled/MovieWrapper';
import Button from '../styled/ButtonStyle';
import { FontAwesomeStyling } from '../styled/NavWrapper';
import { FontAwesomeIcon } from '../../node_modules/@fortawesome/react-fontawesome';

class Movie extends Component {

    state = {
        movie: {},
        comments: [],
        currentUserEmail: '',
        currentUserId: '',
        signedIn: '',
        showEdit: {},
        users: []
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
        if (currentUser) {
        this.setState({ currentUserId: currentUser.id, users })
        } else {
            this.setState({users})
        }
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
            const commentOwner = this.state.users.find((user) => user.id === comment.user_id)
            return (
                <CommentWrapper key={comment.id}>
                    {this.state.currentUserId === comment.user_id && this.props.updatedSignedIn
                        ?
                        <TextWrapper>
                            {this.state.showEdit["show" + comment.id]
                                ?
                                <EditComment userId={this.state.currentUserId} fetchComments={this.fetchComments} {...this.props} currentComment={comment} hideEditForm={this.hideEditForm} />
                                :
                                <TextWrapper>
                                    <p>{commentOwner.username} wrote: {comment.content}</p>
                                    <Button onClick={() => this.handleUpdateShow(comment.id)}>
                                        <FontAwesomeStyling>
                                            <FontAwesomeIcon icon="edit" />
                                        </FontAwesomeStyling>
                                    </Button>
                                </TextWrapper>
                            }
                            <Button onClick={() => this.deleteComment(comment.id)}>
                                <FontAwesomeStyling>
                                    <FontAwesomeIcon icon="times-circle" />
                                </FontAwesomeStyling>
                            </Button>
                        </TextWrapper>
                        :
                        <p>{commentOwner ? `${commentOwner.username}` : null} wrote: {comment.content}</p>

                    }
                </CommentWrapper>
            )
        })

        return (
            <MovieWrapper>
                <div>
                    <h1>{movie.title}</h1>
                    <MovieContentWrapper>
                        <img src={movie.img} alt="Movie Poster" />
                        <MovieTextWrapper>
                            <p><strong>MPAA rating</strong> : {movie.mpaa_rating}</p>
                            <p><strong>Director(s)</strong> : {movie.director}</p>
                            <p><strong>Actor(s)</strong> : {movie.actor}</p>
                            <p><strong>Year</strong> : {movie.year}</p>
                            <p><strong>IMDB Rating</strong> : {movie.rating}/10</p>
                            <p> <strong>Description</strong> : {movie.summary}</p>
                        </MovieTextWrapper>
                    </MovieContentWrapper>
                </div>
                <div>
                    <h2>Comments about this Movie</h2>
                    {commentList}
                    {this.props.updatedSignedIn
                        ?
                        <NewCommentWrapper>
                            <NewComment userId={this.state.currentUserId} fetchComments={this.fetchComments} {...this.props} />
                        </NewCommentWrapper>
                        :
                        <h3>Sign In to add a comment!</h3>
                    }
                </div>
            </MovieWrapper>
        );
    }
}

export default Movie;         