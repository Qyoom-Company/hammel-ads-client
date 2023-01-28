import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import LoadingSpinner from "../../utils/LoadingSpinner";
import SuccessModel from "../../utils/SuccessModel";

type Props = {};

const ConfirmEmail = (props: Props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [queryParameters] = useSearchParams();

    const [loading, setLoading] = useState(true);

    const token = queryParameters.get("token");
    if (!token) navigate("/notfound");
    useEffect(() => {
        axios
            .get(`http://localhost:3500/api/auth/confirm/${token}`)
            .then((res) => {
                if (res.status === 200) {
                    setLoading(false);
                } else {
                    navigate("/notfound");
                }
            })
            .catch((err) => navigate("/notfound"));
    }, []);

    return loading ? (
        <div style={{ marginTop: "200px" }}>
            <LoadingSpinner />
        </div>
    ) : (
        <>
            <SuccessModel
                title="Email Confirmed"
                description="your email have been confirmed successfully"
            />
        </>
    );
};

export default ConfirmEmail;
