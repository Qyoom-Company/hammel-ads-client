import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../utils/LoadingSpinner";
import VerifyUserService from "../services/VerifyUserService";

function Dashboard() {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const token = useSelector((state: any) => state.auth.token);

    useEffect(() => {
        VerifyUserService(token, navigate, setLoading);
    }, []);

    return loading ? <LoadingSpinner /> : <div>Dashboard</div>;
}

export default Dashboard;
