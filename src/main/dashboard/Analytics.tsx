import React, { useState } from "react";
import LoadingSpinner from "../../utils/LoadingSpinner";
import NavBar from "./shared/NavBar";

type AnalyticsProps = {
    user: any;
};

export default function Analytics({ user }: AnalyticsProps) {
    const [loading, setLoading] = useState(false);

    return (
        <>
            <NavBar user={user} index={1} />
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
                <h1>analytics</h1>
            )}
        </>
    );
}
