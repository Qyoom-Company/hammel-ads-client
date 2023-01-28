import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../utils/LoadingSpinner";
import VerifyUser from "../services/VerifyUserService";
import NavBar from "./shared/NavBar";

type Props = {};

export default function MyAds({}: Props) {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const token = useSelector((state: any) => state.auth.token);

    useEffect(() => {
        VerifyUser(token, navigate, setLoading);
    }, []);

    return (
        <>
            <NavBar index={2} />
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
                <h1>my ads</h1>
            )}
        </>
    );
}
