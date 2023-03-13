import axios from "axios";

// Register user

const register = async (userData: any) => {
    const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/register`,
        userData
    );

    if (response.data) {
        localStorage.setItem("token", JSON.stringify(response.data.data.token));
    }

    return response.data.data;
};

const login = async (userData: any) => {
    const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/login`,
        userData
    );

    if (response.data) {
        localStorage.setItem("token", JSON.stringify(response.data.data.token));
    }

    return response.data.data;
};

const logout = () => {
    localStorage.removeItem("token");
};

const authService = {
    register,
    login,
    logout,
};

export default authService;
