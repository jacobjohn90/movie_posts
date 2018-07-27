import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { setAxiosDefaults, userIsLoggedIn } from '../util/SessionHeaderUtil';

class UserPage extends Component {

    state = {
        user: {},
        comments: [],
        movies: [],
        signedIn: false,
        showEdit: {
            username: false,
            email: false,
            password: false
        }
    }

    async componentDidMount() {
        const user = await this.fetchUser()
        const signedIn = userIsLoggedIn()
        const comments = await this.fetchUserComments()
        const movies = await this.fetchMovies()
        this.setState({ user, signedIn, comments, movies })
    }

    fetchUser = async () => {
        const userId = this.props.match.params.user_id
        try {
            setAxiosDefaults()
            const res = await axios.get(`/api/users/${userId}`)
            return res.data
        } catch (error) {
            console.error(error)
        }
    }
    fetchUserComments = async () => {
        const userId = this.props.match.params.user_id
        try {
            setAxiosDefaults()
            const res = await axios.get(`/api/users/${userId}/comments`)
            return res.data
        } catch (error) {
            console.error(error)
        }
    }
    fetchMovies = async () => {
        try {
            const res = await axios.get('/api/movies')
            return res.data
        } catch (error) {
            console.error(error);
        }
    }
    handleUpdateShow = (input) => {
        showEdit = {...this.state.showEdit}
    }
    
    handleSubmit = (event) => {
        event.preventDefault()
    }

    render() {
        const user = this.state.user
        const commentList = this.state.comments.map((comment) => {
            const movie = this.state.movies.find((movie) => movie.id === comment.movie_id)
            return (
                <div key={comment.id}>
                    <li>"{comment.content}", which was written in <Link to={`/${movie.id}`}>{movie.title}</Link></li>
                </div>
            )
        })
        return (
            <div>
                <h1>{user.username}'s Info</h1>
                <h4>Username: {user.username}</h4>
                {this.state.showEdit.username
                    ?
                    <form onSubmit={this.handleSubmit}>
                        <div>
                            <label htmlFor="password_confirmation">Confirm Password: </label>
                            <input onChange={this.handleChange} type="text" name="password_confirmation" value={this.state.password_confirmation} />
                        </div>
                        <button type="submit">Sign Up</button>
                    </form>
                :
                    <button onClick={() => this.handleUpdateShow(username)}>Edit Username</button>
                }

                <h4>Email: {user.email}</h4>
                <button>Edit Email</button>
                <div>
                    <button>Edit Password</button>
                </div>
                <h1>My Comments</h1>
                <ul>
                    {commentList}
                </ul>
            </div>
        );
    }
}

export default UserPage;