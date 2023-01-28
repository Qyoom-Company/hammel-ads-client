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

        if (response.status === 200) {
            setLoading(false);
        }
        console.log(response);
    } catch (err: any) {
        console.log(err);
        if (err.response.status === 400) return navigate("/login");
        if (err.response.status === 401)
            return navigate("/dashboard/verifyemail");
    }
}
