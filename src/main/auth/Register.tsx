import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import InvalidInput from "../../components/alerts/InvalidInput";
import { register, reset } from "../../redux/auth/authSlice";
import { AppDispatch } from "../../redux/store";
import InvalidPasswordModal from "../../utils/InvalidPasswordModal";
import LoadingSpinner from "../../utils/LoadingSpinner";
import SuccessModel from "../../utils/SuccessModel";

interface RegisterPageProps {
    lg?: string;
}
export default function RegisterPage({ lg }: RegisterPageProps) {
    const dispatch = useDispatch<AppDispatch>();
    const { user, isLoading, isError, isSuccess, message } = useSelector(
        (state: any) => state.auth
    );
    const [showPasswordIncorrect, setShowPasswordIncorrect] = useState(false);
    const [popupText, setPopupText] = useState("");

    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const [userData, setUserData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        password: "",
    });

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

        if (isError) {
            setShowPasswordIncorrect(true);
            if (message.toLowerCase().includes("invalid email"))
                setPopupText("invalid email address");
            if (message.toLowerCase().includes("invalid phonenumber"))
                setPopupText("invalid phone number");
            if (message.toLowerCase().includes("email already"))
                setPopupText(message);
            if (message.toLowerCase().includes("phonenumber already"))
                setPopupText(message);
        }
    }, [user, isError, isLoading, isSuccess, message]);

    /// handler -------------------

    const validPassword = new RegExp(
        "(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})"
    );

    const signUpHandler = (e: any) => {
        e.preventDefault();

        if (userData.firstName.length < 3) {
            return setErrorMessage("invalid first name");
        }
        if (userData.lastName.length < 3) {
            return setErrorMessage("invalid last name");
        }

        if (
            !userData.email.match(
                /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
            )
        ) {
            return setErrorMessage("invalid email address");
        }

        if (userData.phoneNumber.length < 8) {
            return setErrorMessage("invalid phone number");
        }

        if (!validPassword.test(userData.password)) {
            return setErrorMessage(
                "password must be at least eight characters long and contain numbers"
            );
        }

        if (userData.password !== passwordConfirm) {
            return setErrorMessage("passwords do not match!");
        }
        //@ts-ignore
        dispatch(register(userData));
    };

    const translation = (ar: string, eng: string) => {
        return lg === "ar" ? ar : eng;
    };

    return isSuccess ? (
        <SuccessModel
            title="Success"
            description="your accont have been create successfully"
        />
    ) : (
        <>
            <div
                className={`flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8 ${
                    lg === "ar" ? "text-right" : ""
                }`}
            >
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <Link to={"/"}>
                        <img
                            className="mx-auto h-12 w-auto"
                            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                            alt="Your Company"
                        />
                    </Link>
                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                        {translation(
                            "قم بإنشاء حساب الآن",
                            "Create your account now!"
                        )}
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        {translation("أو", "Or")}{" "}
                        <Link
                            to="/login"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                            {translation("تسجيل الدخول", "sign in")}
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
                                onChange={() => {
                                    setErrorMessage("");
                                }}
                            >
                                <div>
                                    <label
                                        htmlFor="firstname"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        {translation(
                                            "الاسم الاول",
                                            "First Name"
                                        )}
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            id="firstName"
                                            name="firstName"
                                            type="text"
                                            required
                                            value={userData.firstName}
                                            onChange={(e) =>
                                                setUserData({
                                                    ...userData,
                                                    firstName: e.target.value,
                                                })
                                            }
                                            className={`block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm ${
                                                lg === "ar" ? "text-right" : ""
                                            }`}
                                            style={{
                                                backgroundColor:
                                                    errorMessage.includes(
                                                        "first name"
                                                    )
                                                        ? "#FEF2F2"
                                                        : "",
                                            }}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label
                                        htmlFor="lastname"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        {translation(
                                            "اسم العائلة",
                                            "Last Name"
                                        )}
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            id="lastName"
                                            name="lastName"
                                            type="text"
                                            required
                                            value={userData.lastName}
                                            onChange={(e) =>
                                                setUserData({
                                                    ...userData,
                                                    lastName: e.target.value,
                                                })
                                            }
                                            className={`block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm ${
                                                lg === "ar" ? "text-right" : ""
                                            }`}
                                            style={{
                                                backgroundColor:
                                                    errorMessage.includes(
                                                        "last name"
                                                    )
                                                        ? "#FEF2F2"
                                                        : "",
                                            }}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        {translation(
                                            "البريد الإلكتروني",
                                            "Email Address"
                                        )}
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            autoComplete="email"
                                            required
                                            value={userData.email}
                                            onChange={(e) =>
                                                setUserData({
                                                    ...userData,
                                                    email: e.target.value,
                                                })
                                            }
                                            className={`block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm ${
                                                lg === "ar" ? "text-right" : ""
                                            }`}
                                            style={{
                                                backgroundColor:
                                                    errorMessage.includes(
                                                        "email"
                                                    ) ||
                                                    popupText.includes("email")
                                                        ? "#FEF2F2"
                                                        : "",
                                            }}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label
                                        htmlFor="phonenumber"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        {translation(
                                            "رقم الهاتف",
                                            "Phone Number"
                                        )}
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            id="number"
                                            name="number"
                                            type="text"
                                            autoComplete="number"
                                            required
                                            value={userData.phoneNumber}
                                            onChange={(e) =>
                                                setUserData({
                                                    ...userData,
                                                    phoneNumber: e.target.value,
                                                })
                                            }
                                            className={`block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm ${
                                                lg === "ar" ? "text-right" : ""
                                            }`}
                                            style={{
                                                backgroundColor:
                                                    errorMessage.includes(
                                                        "phone"
                                                    ) ||
                                                    popupText.includes("phone")
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
                                        {translation("كلمه السر", "Password")}
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            id="password"
                                            name="password"
                                            type="password"
                                            autoComplete="current-password"
                                            required
                                            value={userData.password}
                                            onChange={(e) =>
                                                setUserData({
                                                    ...userData,
                                                    password: e.target.value,
                                                })
                                            }
                                            className={`block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm ${
                                                lg === "ar" ? "text-right" : ""
                                            }`}
                                            style={{
                                                backgroundColor:
                                                    errorMessage.includes(
                                                        "password"
                                                    ) ||
                                                    popupText.includes(
                                                        "password"
                                                    )
                                                        ? "#FEF2F2"
                                                        : "",
                                            }}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label
                                        htmlFor="passwordConfirm"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        {translation(
                                            "تأكيد كلمة المرور",
                                            "Confirm Password"
                                        )}
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            id="passwordConfirm"
                                            name="passwordConfirm"
                                            type="password"
                                            autoComplete="current-password"
                                            required
                                            value={passwordConfirm}
                                            onChange={(e) =>
                                                setPasswordConfirm(
                                                    e.target.value
                                                )
                                            }
                                            className={`block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm ${
                                                lg === "ar" ? "text-right" : ""
                                            }`}
                                            style={{
                                                backgroundColor:
                                                    errorMessage.includes(
                                                        "password"
                                                    ) ||
                                                    popupText.includes(
                                                        "password"
                                                    )
                                                        ? "#FEF2F2"
                                                        : "",
                                            }}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <button
                                        type="submit"
                                        onClick={signUpHandler}
                                        className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                    >
                                        {translation("اشتراك", "Sign Up")}
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
                title={popupText}
            />
        </>
    );
}
