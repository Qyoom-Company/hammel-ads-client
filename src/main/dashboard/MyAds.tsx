import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../utils/LoadingSpinner";
import VerifyUser from "../services/VerifyUserService";

type Props = {};

export default function MyAds({}: Props) {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const token = useSelector((state: any) => state.auth.token);

    useEffect(() => {
        VerifyUser(token, navigate, setLoading);
    }, []);

    return loading ? <LoadingSpinner /> : <div>ads</div>;
}
