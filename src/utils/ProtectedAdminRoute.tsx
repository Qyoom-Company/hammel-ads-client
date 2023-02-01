import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import NotFoundPage from "./NotFoundPage";

interface Props {
    children: any;
}

const ProtectedAdminRoute: React.FC<Props> = ({ children }) => {
    const token = useSelector((state: any) => state.auth.token);
    const user = useSelector((state: any) => state.user);

    if (!token) {
        return <NotFoundPage />;
    }
    return children;
};

export default ProtectedAdminRoute;
