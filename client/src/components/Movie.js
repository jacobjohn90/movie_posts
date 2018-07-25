import React, { Component } from 'react';
import Axios from 'axios'

class Movie extends Component {

    state = {
        movie: {},
        comments: []
    }

    async componentDidMount() {
        let movie = {}
        let comments = []
        movie = await this.fetchMovie()
        comments = await this.fetchComments()
        this.setState({ movie, comments })

    }

    fetchMovie = async () => {
        const movieId = this.props.match.params.id
        const res = await Axios.get(`/api/movies/${movieId}`)
        return res.data
    }

    fetchComments = async () => {
        const movieId = this.props.match.params.id
        const res = await Axios.get(`/api/movies/${movieId}/comments`)
        return res.data
    }

    deleteComment = async(commentId) => {
        const movieId = this.props.match.params.id
        try{
            await Axios.delete(`/api/movies/${movieId}/comments/${commentId}`)
            const comments = this.fetchComments()
            this.setState({comments})
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
                    <button onClick={()=>this.deleteComment(comment.id)}>Delete Comment</button>
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