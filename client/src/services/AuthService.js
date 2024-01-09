import axios from "axios";

const AUTH_API_BASE_URL = "http://localhost:8081/auth";

class AuthService {

    // Method to handle user registration
    register(userData) {
        return axios.post(`${AUTH_API_BASE_URL}/register`, userData);
    }

    // Method to handle user authentication
    async login(authData) {
        const response = await axios.post(`${AUTH_API_BASE_URL}/authenticate`, authData);
        // Store the token and user ID in local storage or state management
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userId', response.data.userId);
        return response.data;
    }
}

export default new AuthService();
