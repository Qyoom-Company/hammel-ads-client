import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../utils/LoadingSpinner";
import VerifyUserService from "../services/VerifyUserService";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import NavBar from "./shared/NavBar";
import LastTwoWeeksStats from "./components/LastTwoWeeksStats";

const user = {
    name: "Tom Cook",
    email: "tom@example.com",
    imageUrl:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};
const navigation = [
    { name: "Dashboard", href: "#", current: true },
    { name: "Team", href: "#", current: false },
    { name: "Projects", href: "#", current: false },
    { name: "Calendar", href: "#", current: false },
];
const userNavigation = [
    { name: "Your Profile", href: "#" },
    { name: "Settings", href: "#" },
    { name: "Sign out", href: "#" },
];

function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
}

function Dashboard() {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const token = useSelector((state: any) => state.auth.token);

    useEffect(() => {
        console.log(VerifyUserService(token, navigate, setLoading));
    }, []);

    const lastTwoWeeksStats = [
        { name: "ad appearance", stat: "71,897" },
        { name: "clicks", stat: "10,000" },
        { name: "click rate per 1000 appearances", stat: "10%" },
        { name: "Wallet", stat: "1000$" },
    ];

    return (
        <>
            <NavBar index={0} />
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
                <div className="py-10">
                    <header>
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-10">
                            <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
                                Dashboard
                            </h1>
                        </div>
                    </header>
                    <main>
                        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                            <LastTwoWeeksStats stats={lastTwoWeeksStats} />
                        </div>
                    </main>
                </div>
            )}
        </>
    );
}

export default Dashboard;
