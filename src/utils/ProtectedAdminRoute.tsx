import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import NotFoundPage from "./NotFoundPage";

interface Props {
    children: any;
}

const ProtectedAdminRoute: React.FC<Props> = ({ children }) => {
    const token = useSelector((state: any) => state.auth.token);

    if (!token) {
        return <NotFoundPage />;
    }
    return children;
};

export default ProtectedAdminRoute;
