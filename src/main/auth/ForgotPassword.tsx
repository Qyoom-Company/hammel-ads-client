import axios, { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import InvalidInput from "../../components/alerts/InvalidInput";
import NoUserFound from "../../components/alerts/NoUserFound";
import { login } from "../../redux/auth/authSlice";
import InvalidPasswordModal from "../../utils/InvalidPasswordModal";
import LoadingSpinner from "../../utils/LoadingSpinner";

type Props = {};

const ForgotPassword = (props: Props) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const validateEmail = (email: string) =>
        email.match(
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        );

    const sendEmailHandler = async (e: any) => {
        e.preventDefault();
        if (!validateEmail(email)) {
            return setErrorMessage("invalid email address");
        }
        setLoading(true);
        try {
            const response = await axios.post(
                "http://localhost:3500/api/auth/reset",
                {
                    email: email,
                }
            );
            if (response.status === 200) {
                navigate("/forget/sent");
            }
            setLoading(false);
        } catch (err: any) {
            setLoading(false);
            if (err?.response?.status === 404) {
                setShow(true);
                setTimeout(() => {
                    setShow(false);
                }, 2000);
            }
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
                        Type your email
                    </h2>
                </div>

                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                        <form className="space-y-6" action="#" method="POST">
                            <div>
                                <div className="mt-1">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                        value={email}
                                        placeholder="type your email address here"
                                        onChange={(e) => {
                                            setErrorMessage("");
                                            setEmail(e.target.value);
                                        }}
                                        style={{
                                            backgroundColor:
                                                errorMessage.includes("email")
                                                    ? "#FEF2F2"
                                                    : "",
                                        }}
                                    />
                                </div>
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                    onClick={sendEmailHandler}
                                >
                                    send reset link
                                </button>
                            </div>
                        </form>
                        <br></br>
                        <InvalidInput content={errorMessage} />
                    </div>
                </div>
            </div>
            <NoUserFound show={show} />
        </>
    );
};

export default ForgotPassword;
