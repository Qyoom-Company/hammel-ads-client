import axios from "axios";
import { useNavigate } from "react-router-dom";

export default async function getUserInfo(
    token: string,
    navigate: any,
    setLoading: any
) {
    try {
        const response = await axios.get(
            "http://localhost:3500/api/users/getuser",
            {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            }
        );

        console.log("resssss", response);
        if (response.status === 200) {
            console.log(response.data.user);
            setLoading(false);
        }
    } catch (err: any) {
        if (err.response.status === 400) {
            navigate("/login");
            return console.log("invalid token");
        }
        if (err.response.status === 401) {
            navigate("/dashboard/verifyemail");
            return console.log("email not verified");
        }
        console.log(err);
    }
}
