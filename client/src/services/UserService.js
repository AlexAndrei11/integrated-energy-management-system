import axios from "axios";

const USERS_API_BASE_URL = "http://localhost:8081/users"

class UserService {

    getAuthToken() {
        return localStorage.getItem('token');
    }

    getUsers() {
        const token = this.getAuthToken();
        return axios.get(USERS_API_BASE_URL, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    createUser(user) {
        const token = this.getAuthToken();
        return axios.post(USERS_API_BASE_URL, user, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    updateUser(user) {
        const token = this.getAuthToken();
        return axios.put(USERS_API_BASE_URL, user, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    deleteUser(userId) {
        const token = this.getAuthToken();
        return axios.delete(`${USERS_API_BASE_URL}/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }
}

export default new UserService()