import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./main/auth/Login";
import Register from "./main/auth/Register";
import Home from "./main/Home";
import Dashboard from "./main/dashboard/Dashboard";
import Settings from "./main/dashboard/Settings";
import Analytics from "./main/dashboard/Analytics";
import MyAds from "./main/dashboard/MyAds";
import Wallet from "./main/dashboard/Wallet";
import NotFoundPage from "./utils/NotFoundPage";
import ProtectedRoute from "./utils/ProtectedRoute";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import ForgotPassword from "./main/auth/ForgotPassword";
import ResetPassword from "./main/auth/ResetPassword";
import SuccessModel from "./utils/SuccessModel";
import EmailSent from "./main/auth/EmailSent";
import VerifyEmailPage from "./main/auth/VerifyEmailPage";
import ConfirmEmail from "./main/auth/ConfirmEmail";
export interface IApplicationProps {}

function MainRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/myads" element={<MyAds />} />
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/settings" element={<Settings />} />

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
