import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HeaderComponent from "./components/HeaderComponent";
import FooterComponent from "./components/FooterComponent";
import AdminComponent from "./components/AdminComponent";
import UserDevicesWrapper from "./components/UserDevicesWrapper";

function App() {
    return (
        <div>
            <Router>
                <HeaderComponent />
                    <div className="container">
                        <Routes>
                            <Route path="/admin" exact element={<AdminComponent />}></Route>
                            <Route path="/user-devices/:userId" element={<UserDevicesWrapper />} />
                        </Routes>
                    </div>
                <FooterComponent />
            </Router>
        </div>
    );
}

export default App;
