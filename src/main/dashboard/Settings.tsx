import React, { useEffect, useState, Fragment } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../utils/LoadingSpinner";
import VerifyUser from "../services/VerifyUserService";
import NavBar from "./shared/NavBar";
import axios from "axios";
import InvalidInput from "../../components/alerts/InvalidInput";

type Props = {};

export default function Wallet({}: Props) {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        photoPath: null,
    });

    const [updateInfo, setUpdateInfo] = useState(user);

    const [photoPath, setPhotoPath] = useState(user.photoPath);
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();
    const token = useSelector((state: any) => state.auth.token);

    useEffect(() => {
        VerifyUser(token, navigate, setLoading);
        axios
            .get("http://localhost:3500/api/users/getuser", {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                const user = res.data.data.user;
                console.log(user);
                setUser(user);
                setUpdateInfo(user);
                setPhotoPath(user.photoPath);
            })
            .catch((err) => {
                navigate("/login");
            });
    }, []);

    const changePhotoHandler = (e: any) => {
        e.preventDefault();
        const profilePhoto = e.target.files[0];
        if (profilePhoto !== null) {
            const formData = new FormData();
            formData.append("profilePhoto", profilePhoto);
            axios
                .post(
                    "http://localhost:3500/api/users/upload-photo",
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                            authorization: `Bearer ${token}`,
                        },
                    }
                )
                .then((response) => {
                    setPhotoPath(response.data.data.photoPath);
                    // console.log(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    const saveHandler = (e: any) => {
        e.preventDefault();
        if (updateInfo.firstName.length < 3) {
            return setErrorMessage("invalid first name");
        }
        if (updateInfo.lastName.length < 3) {
            return setErrorMessage("invalid last name");
        }

        if (
            !updateInfo.email.match(
                /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
            )
        ) {
            return setErrorMessage("invalid email address");
        }

        if (updateInfo.phoneNumber.length < 8) {
            return setErrorMessage("invalid phone number");
        }

        axios
            .patch("http://localhost:3500/api/users/updateuser", updateInfo, {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                setErrorMessage("updated");
            })
            .catch((error) => {
                console.log(error);
                console.log(error.response.data.message);
                if (
                    error.response.data.message.includes("invalid") ||
                    error.response.data.message.includes("email")
                ) {
                    setErrorMessage(error.response.data.message);
                }
            });
    };

    return (
        <>
            <NavBar index={-1} />
            {loading ? (
                <div
                    style={{
                        width: "100%",
                        height: "90vh",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <LoadingSpinner />
                </div>
            ) : (
                <main className="relative mt-10">
                    <div className="mx-auto max-w-screen-xl px-4 pb-6 sm:px-6 lg:px-8 lg:pb-16">
                        <div className="overflow-hidden rounded-lg bg-white shadow">
                            <div className="divide-y divide-gray-200 lg:grid lg:grid-cols-12 lg:divide-y-0 lg:divide-x">
                                <form
                                    className="divide-y divide-gray-200 lg:col-span-9"
                                    action="#"
                                    method="POST"
                                    onChange={() => {
                                        setErrorMessage("");
                                    }}
                                >
                                    {/* Profile section */}
                                    <div className="py-6 px-4 sm:p-6 lg:pb-8">
                                        <div className="mt-6 flex flex-col lg:flex-row">
                                            <div className="mt-6 flex-grow lg:mt-0 lg:ml-6 lg:flex-shrink-0 lg:flex-grow-0">
                                                <p
                                                    className="text-sm font-medium text-gray-700"
                                                    aria-hidden="true"
                                                >
                                                    Photo
                                                </p>
                                                <div className="mt-1 lg:hidden">
                                                    <div className="flex items-center">
                                                        <div
                                                            className="inline-block h-12 w-12 flex-shrink-0 overflow-hidden rounded-full"
                                                            aria-hidden="true"
                                                        >
                                                            {photoPath ? (
                                                                <img
                                                                    className="h-full w-full rounded-full"
                                                                    src={
                                                                        photoPath
                                                                    }
                                                                    alt=""
                                                                />
                                                            ) : (
                                                                <svg
                                                                    className="h-full w-full rounded-full"
                                                                    fill="#6B7280"
                                                                    viewBox="0 0 24 24"
                                                                >
                                                                    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                                                                </svg>
                                                            )}
                                                        </div>
                                                        <div className="ml-5 rounded-md shadow-sm">
                                                            <div className="group relative flex items-center justify-center rounded-md border border-gray-300 py-2 px-3 focus-within:ring-2 focus-within:ring-sky-500 focus-within:ring-offset-2 hover:bg-gray-50">
                                                                <label
                                                                    htmlFor="mobile-user-photo"
                                                                    className="pointer-events-none relative text-sm font-medium leading-4 text-gray-700"
                                                                >
                                                                    <span>
                                                                        Change
                                                                    </span>
                                                                    <span className="sr-only">
                                                                        {" "}
                                                                        user
                                                                        photo
                                                                    </span>
                                                                </label>
                                                                <input
                                                                    id="mobile-user-photo"
                                                                    name="profilePhoto"
                                                                    type="file"
                                                                    accept=".png,.jpg,.jpeg,.gif,.svg"
                                                                    className="absolute h-full w-full cursor-pointer rounded-md border-gray-300 opacity-0"
                                                                    onChange={
                                                                        changePhotoHandler
                                                                    }
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="relative hidden overflow-hidden rounded-full lg:block">
                                                    {photoPath ? (
                                                        <img
                                                            className="relative h-40 w-40 rounded-full"
                                                            src={photoPath}
                                                            alt=""
                                                        />
                                                    ) : (
                                                        <svg
                                                            className="relative h-40 w-40 rounded-full"
                                                            fill="#6B7280"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                                                        </svg>
                                                    )}
                                                    <label
                                                        htmlFor="desktop-user-photo"
                                                        className="absolute inset-0 flex h-full w-full items-center justify-center bg-black bg-opacity-75 text-sm font-medium text-white opacity-0 focus-within:opacity-100 hover:opacity-100"
                                                    >
                                                        <span>Change</span>
                                                        <span className="sr-only">
                                                            {" "}
                                                            user photo
                                                        </span>
                                                        <input
                                                            type="file"
                                                            accept=".png,.jpg,.jpeg,.gif,.svg"
                                                            id="desktop-user-photo"
                                                            name="user-photo"
                                                            className="absolute inset-0 h-full w-full cursor-pointer rounded-md border-gray-300 opacity-0"
                                                            onChange={
                                                                changePhotoHandler
                                                            }
                                                        />
                                                    </label>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-6 grid grid-cols-12 gap-6">
                                            <div className="col-span-12 sm:col-span-6">
                                                <label
                                                    htmlFor="first-name"
                                                    className="block text-sm font-medium text-gray-700"
                                                >
                                                    First name
                                                </label>
                                                <input
                                                    type="text"
                                                    name="first-name"
                                                    id="first-name"
                                                    autoComplete="given-name"
                                                    className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                                                    value={updateInfo.firstName}
                                                    onChange={(e: any) => {
                                                        setUpdateInfo({
                                                            ...updateInfo,
                                                            firstName:
                                                                e.target.value,
                                                        });
                                                    }}
                                                />
                                            </div>

                                            <div className="col-span-12 sm:col-span-6">
                                                <label
                                                    htmlFor="last-name"
                                                    className="block text-sm font-medium text-gray-700"
                                                >
                                                    Last name
                                                </label>
                                                <input
                                                    type="text"
                                                    name="last-name"
                                                    id="last-name"
                                                    autoComplete="family-name"
                                                    className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                                                    value={updateInfo.lastName}
                                                    onChange={(e: any) => {
                                                        setUpdateInfo({
                                                            ...updateInfo,
                                                            lastName:
                                                                e.target.value,
                                                        });
                                                    }}
                                                />
                                            </div>

                                            <div className="col-span-12">
                                                <label
                                                    htmlFor="url"
                                                    className="block text-sm font-medium text-gray-700"
                                                >
                                                    Email
                                                </label>
                                                <input
                                                    type="text"
                                                    name="email"
                                                    id="email"
                                                    className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                                                    value={updateInfo.email}
                                                    onChange={(e: any) => {
                                                        setUpdateInfo({
                                                            ...updateInfo,
                                                            email: e.target
                                                                .value,
                                                        });
                                                    }}
                                                />
                                            </div>

                                            <div className="col-span-12 sm:col-span-6">
                                                <label
                                                    htmlFor="phoneNumber"
                                                    className="block text-sm font-medium text-gray-700"
                                                >
                                                    phoneNumber
                                                </label>
                                                <input
                                                    type="text"
                                                    name="phoneNumber"
                                                    id="phoneNumber"
                                                    autoComplete="organization"
                                                    className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                                                    value={
                                                        updateInfo.phoneNumber
                                                    }
                                                    onChange={(e: any) => {
                                                        setUpdateInfo({
                                                            ...updateInfo,
                                                            phoneNumber:
                                                                e.target.value,
                                                        });
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Privacy section */}
                                    <div className="divide-y divide-gray-200 pt-6">
                                        <div className="mt-4 flex justify-end py-4 px-4 sm:px-6">
                                            <button
                                                type="button"
                                                className="inline-flex justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                onClick={saveHandler}
                                                className="ml-5 inline-flex justify-center rounded-md border border-transparent bg-sky-700 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-sky-800 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
                                            >
                                                Save
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <InvalidInput content={errorMessage} />
                        </div>
                    </div>
                </main>
            )}
        </>
    );
}
