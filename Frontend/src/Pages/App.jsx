// App.jsx
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "../Redux/Features/authSlice";
import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import PrivateRoute from "../Components/PrivateRoute";
import Layout from "../Components/Layout";
import { Toaster } from "react-hot-toast";

const fulfilled = "auth/checkAuth/fulfilled"

function App() {

    const dispatch = useDispatch();
    const navigate = useNavigate()
    useEffect(() => {
        (async () => {
            const response = await dispatch(checkAuth());
            if (response.type === fulfilled) {
                navigate('/home', { replace: true })
            }
        })()
    }, []);

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
