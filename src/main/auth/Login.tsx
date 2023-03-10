import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import InvalidInput from "../../components/alerts/InvalidInput";
import { login, reset } from "../../redux/auth/authSlice";
import InvalidPasswordModal from "../../utils/InvalidPasswordModal";
import LoadingSpinner from "../../utils/LoadingSpinner";
import SuccessModel from "../../utils/SuccessModel";

export default function LoginPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user, isLoading, isError, isSuccess, message } = useSelector(
        (state: any) => state.auth
    );

    const [userData, setUserData] = useState({
        email: "",
        password: "",
    });
    const [showPasswordIncorrect, setShowPasswordIncorrect] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    //// use effect
    useEffect(() => {
        dispatch(reset());
    }, [dispatch]);

    useEffect(() => {
        console.log(`
        user: ${user}
        isLoading: ${isLoading}
        isSuccess: ${isSuccess}
        isError: ${isError}
        message: ${message}

        `);

        if (isLoading) return;

        if (isError) {
            setShowPasswordIncorrect(true);
        }
        if (isSuccess) {
            navigate("/dashboard");
        }
    }, [user, isError, isLoading, isSuccess, message]);

    const signInHandler = async (e: any) => {
        e.preventDefault();

        // input validation
        if (
            !userData.email.match(
                /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
            )
        ) {
            setErrorMessage("invalid email address");
            return;
        }

        //@ts-ignore
        dispatch(login(userData));
    };

    return (
        <>
            <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <Link to={"/"}>
                        <img
                            className="mx-auto h-12 w-auto"
                            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                            alt="Your Company"
                        />
                    </Link>
                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                        Sign in to your account
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Or{" "}
                        <Link
                            to="/register"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                            sign up
                        </Link>
                    </p>
                </div>

                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                        {isLoading ? (
                            <LoadingSpinner />
                        ) : (
                            <form
                                className="space-y-6"
                                action="#"
                                method="POST"
                            >
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Email Address
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            autoComplete="email"
                                            required
                                            value={userData.email}
                                            onChange={(e) => {
                                                setUserData({
                                                    ...userData,
                                                    email: e.target.value,
                                                });
                                                setErrorMessage("");
                                            }}
                                            className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                            style={{
                                                backgroundColor:
                                                    errorMessage.includes(
                                                        "user"
                                                    ) ||
                                                    message
                                                        .toLowerCase()
                                                        .includes("user")
                                                        ? "#FEF2F2"
                                                        : "",
                                            }}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label
                                        htmlFor="password"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Password
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            id="password"
                                            name="password"
                                            type="password"
                                            autoComplete="password"
                                            required
                                            value={userData.password}
                                            onChange={(e) =>
                                                setUserData({
                                                    ...userData,
                                                    password: e.target.value,
                                                })
                                            }
                                            className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                            style={{
                                                backgroundColor:
                                                    errorMessage.includes(
                                                        "password"
                                                    ) ||
                                                    message
                                                        .toLowerCase()
                                                        .includes("password")
                                                        ? "#FEF2F2"
                                                        : "",
                                            }}
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

                                    <div className="text-sm">
                                        <Link
                                            to="/forget"
                                            className="font-medium text-indigo-600 hover:text-indigo-500"
                                        >
                                            Forgot your password?
                                        </Link>
                                    </div>
                                </div>

                                <div>
                                    <button
                                        type="submit"
                                        onClick={signInHandler}
                                        className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                    >
                                        Sign in
                                    </button>
                                </div>
                            </form>
                        )}
                        <br></br>
                        <InvalidInput content={errorMessage} />
                    </div>
                </div>
            </div>
            <InvalidPasswordModal
                setShowPasswordIncorrect={setShowPasswordIncorrect}
                showPasswordIncorrect={showPasswordIncorrect}
                title={
                    message.toLowerCase().includes("user")
                        ? "No user found with that email adress"
                        : "Incorrect Password"
                }
            />
        </>
    );
}
