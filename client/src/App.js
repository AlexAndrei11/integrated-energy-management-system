import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HeaderComponent from "./components/HeaderComponent";
import FooterComponent from "./components/FooterComponent";
import AdminComponent from "./components/AdminComponent";
import UserDevicesWrapper from "./components/UserDevicesWrapper";
import LoginComponent from "./components/LoginComponent";
import PrivateRoute from "./routes/PrivateRoute.jsx";

function App() {
    return (
        <div>
            <Router>
                <HeaderComponent />
                    <div className="container">
                        <Routes>
                            <Route path="/login" element={<LoginComponent />}></Route>
                            <Route path="/admin" element={<AdminComponent />}></Route>
                            <Route path="/user-devices/:userId" element={
                                <PrivateRoute>
                                    <UserDevicesWrapper />
                                </PrivateRoute>
                            } />
                        </Routes>
                    </div>
                <FooterComponent />
            </Router>
        </div>
    );
}

export default App;
