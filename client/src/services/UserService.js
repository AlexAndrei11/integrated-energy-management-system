import axios from "axios";

const USERS_API_BASE_URL = "http://localhost:8081/users"

class UserService {

    getUsers() {
        return axios.get(USERS_API_BASE_URL);
    }
}

export default new UserService()