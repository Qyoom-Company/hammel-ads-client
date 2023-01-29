import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Login from "./main/auth/Login";
import Register from "./main/auth/Register";
import Home from "./main/Home";
import Dashboard from "./main/dashboard/Dashboard";
import Settings from "./main/dashboard/Settings";
import Analytics from "./main/dashboard/Analytics";
import Campaigns from "./main/dashboard/Campaigns";
import Wallet from "./main/dashboard/Wallet";
import NotFoundPage from "./utils/NotFoundPage";
import ProtectedRoute from "./utils/ProtectedRoute";
import { Provider, useSelector } from "react-redux";
import { store } from "./redux/store";
import ForgotPassword from "./main/auth/ForgotPassword";
import ResetPassword from "./main/auth/ResetPassword";
import SuccessModel from "./utils/SuccessModel";
import EmailSent from "./main/auth/EmailSent";
import VerifyEmailPage from "./main/auth/VerifyEmailPage";
import ConfirmEmail from "./main/auth/ConfirmEmail";
import axios from "axios";
export interface IApplicationProps {}

function MainRoutes() {
    const token = useSelector((state: any) => state.auth.token);
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        photoPath: null,
    });

    const navigate = useNavigate();
    useEffect(() => {
        console.log("happened");
        axios
            .get("http://localhost:3500/api/users/getuser", {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                setUser(res.data.data.user);
            })
            .catch((err) => {
                if (err.response.status === 400) return navigate("/login");
                if (err.response.status === 401)
                    return navigate("/dashboard/verifyemail");
            });
    }, []);
    return (
        <Routes>
            <Route
                path="/"
                element={<Dashboard user={user} setUser={setUser} />}
            />
            <Route path="/analytics" element={<Analytics user={user} />} />
            <Route path="/campaigns" element={<Campaigns user={user} />} />
            <Route path="/wallet" element={<Wallet user={user} />} />
            <Route
                path="/settings"
                element={<Settings user={user} setUser={setUser} />}
            />

            <Route path="/verifyemail" element={<VerifyEmailPage />} />
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
}

const Application: React.FunctionComponent<IApplicationProps> = (props) => {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/confirm" element={<ConfirmEmail />} />

                    <Route
                        path="/forget/*"
                        element={
                            <Routes>
                                <Route path="/" element={<ForgotPassword />} />
                                <Route path="/sent" element={<EmailSent />} />
                            </Routes>
                        }
                    />
                    <Route path="/reset" element={<ResetPassword />} />

                    <Route
                        path="/dashboard/*"
                        element={
                            <ProtectedRoute>
                                <MainRoutes />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/reset/*"
                        element={
                            <Routes>
                                <Route path="/" element={<ResetPassword />} />
                                <Route
                                    path="/changed"
                                    element={
                                        <SuccessModel
                                            title="Password Changed"
                                            description="your password have changed successfully"
                                            type="register"
                                        />
                                    }
                                />
                            </Routes>
                        }
                    />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </Provider>
        </BrowserRouter>
    );
};

export default Application;
