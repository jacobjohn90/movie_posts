import axios from 'axios'
import { setAxiosDefaults } from './SessionHeaderUtil';

export function fetchCurrentUserEmail() {
    const currentUserEmail = localStorage.getItem("uid")
    return currentUserEmail
}

export async function fetchUsers() {
    setAxiosDefaults()
    const allUsers = await axios.get('/api/users')
    return allUsers.data
}