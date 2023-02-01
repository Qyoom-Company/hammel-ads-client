import React, { useState } from "react";
import LoadingSpinner from "../../../../utils/LoadingSpinner";
import NavBar from "../../shared/NavBar";

type AnalyticsProps = {};

export default function Analytics({}: AnalyticsProps) {
    const [loading, setLoading] = useState(false);

    return (
        <>
            <NavBar index={1} />
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
