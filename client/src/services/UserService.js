import axios from "axios";

const USERS_API_BASE_URL = "http://localhost:8081/users"

class UserService {

    getUsers() {
        return axios.get(USERS_API_BASE_URL);
    }

    createUser(userData) {
        return axios.post(USERS_API_BASE_URL, userData);
    }
}

export default new UserService()