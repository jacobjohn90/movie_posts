import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { setAxiosDefaults, userIsLoggedIn } from '../util/SessionHeaderUtil';
import EditUsername from './EditUsername';
import EditEmail from './EditEmail';

class UserPage extends Component {

    state = {
        user: {},
        comments: [],
        movies: [],
        signedIn: false,
        showEdit: {
            username: false,
            email: true,
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
        const showEdit = { ...this.state.showEdit }
        showEdit[input] = !showEdit[input]
        this.setState({ showEdit })
    }
    updateUser = (user) => {
        this.setState({ user })
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
                {this.state.showEdit.username
                    ?
                    <EditUsername handleUpdateShow={this.handleUpdateShow} updateUser={this.updateUser} {...this.props} />
                    :
                    <div>
                        <h4>Username: {user.username}</h4>
                        <button onClick={() => this.handleUpdateShow('username')}>Edit Username</button>
                    </div>
                    
                }
                {this.state.showEdit.email
                    ?
                    <EditEmail handleUpdateShow={this.handleUpdateShow} updateUser={this.updateUser} {...this.props} />
                    :
                    <div>
                        <h4>Email: {user.email}</h4>
                        <button onClick={() => this.handleUpdateShow('email')}>Edit Email</button>
                    </div>
                }
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