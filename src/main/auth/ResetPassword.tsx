import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { login } from "../../redux/auth/authSlice";
import LoadingSpinner from "../../utils/LoadingSpinner";

type Props = {};

const ResetPassword = (props: Props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [queryParameters] = useSearchParams();

    const [loading, setLoading] = useState(true);

    const [newPassword, setNewPassword] = useState({
        password: "",
        passwordConfirm: "",
    });

    const token = queryParameters.get("token");
    console.log(token, !token);
    if (!token) navigate("/notfound");
    useEffect(() => {
        axios
            .post("http://localhost:3500/api/auth/verifyToken", {
                resetToken: token,
            })
            .then((res) => {
                if (res.status === 200) {
                    setLoading(false);
                } else {
                    navigate("/notfound");
                }
            })
            .catch((err) => navigate("/notfound"));
    }, []);

    // handler
    const validPassword = new RegExp(
        "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})"
    );
    const newPasswordHandler = async (e: any) => {
        e.preventDefault();
        if (!validPassword.test(newPassword.password))
            return console.log("not strong password");

        if (newPassword.password !== newPassword.passwordConfirm) {
            return console.log("password mismatch");
        }
        setLoading(true);
        try {
            const response = await axios.post(
                `http://localhost:3500/api/auth/newPassword`,
                {
                    resetToken: token,
                    newPassword: newPassword.password,
                }
            );
            //@ts-ignore
            dispatch(
                //@ts-ignore
                login({
                    email: response.data.data.user.email,
                    password: newPassword.password,
                })
            );
            navigate("/reset/changed");
        } catch (err) {
            navigate("/notfound");
        }
    };

    return loading ? (
        <div style={{ marginTop: "200px" }}>
            <LoadingSpinner />
        </div>
    ) : (
        <>
            <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <img
                        className="mx-auto h-12 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        alt="Your Company"
                    />
                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                        Create a new password
                    </h2>
                </div>

                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                        <form className="space-y-6" action="#" method="POST">
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    password
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="password"
                                        required
                                        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                        value={newPassword.password}
                                        onChange={(e) =>
                                            setNewPassword({
                                                ...newPassword,
                                                password: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                            </div>

                            <div>
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    confirm password
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        required
                                        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                        value={newPassword.passwordConfirm}
                                        onChange={(e) =>
                                            setNewPassword({
                                                ...newPassword,
                                                passwordConfirm: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input
                                        id="remember-me"
                                        name="remember-me"
                                        type="checkbox"
                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <label
                                        htmlFor="remember-me"
                                        className="ml-2 block text-sm text-gray-900"
                                    >
                                        Remember me
                                    </label>
                                </div>
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                    onClick={newPasswordHandler}
                                >
                                    Done
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ResetPassword;
