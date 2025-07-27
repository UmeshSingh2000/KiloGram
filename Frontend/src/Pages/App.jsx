// App.jsx
import { useDispatch } from "react-redux";
import { checkAuth } from "../Redux/Features/authSlice";
import { useEffect } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import PrivateRoute from "../Components/PrivateRoute";
import Layout from "../Components/Layout";
import { Toaster } from "react-hot-toast";


function App() {
    const dispatch = useDispatch();
    const navigate = useNavigate()

    useEffect(() => {
        const response = dispatch(checkAuth());
        if (response) {
            navigate('/home')
        }
    }, [dispatch]);

    return (
        <>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Private Route */}
                <Route element={<PrivateRoute />}>
                    <Route path="/home" element={<Layout />} />
                </Route>
            </Routes>

            <Toaster position="top-right" />
        </>
    );
}

export default App;
