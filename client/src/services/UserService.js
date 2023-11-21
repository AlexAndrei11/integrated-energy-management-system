import axios from "axios";

const USERS_API_BASE_URL = "http://localhost:8081/users"

class UserService {

    getUsers() {
        return axios.get(USERS_API_BASE_URL);
    }

    createUser(user) {
        return axios.post(USERS_API_BASE_URL, user);
    }

    updateUser(user) {
        return axios.put(USERS_API_BASE_URL, user);
    }

    deleteUser(userId) {
        return axios.delete(`${USERS_API_BASE_URL}/${userId}`);
    }
}

export default new UserService()