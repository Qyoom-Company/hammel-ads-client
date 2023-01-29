import React, { useState } from "react";
import LoadingSpinner from "../../utils/LoadingSpinner";
import NavBar from "./shared/NavBar";

type CampaignsProps = {
    user: any;
};

export default function Campaigns({ user }: CampaignsProps) {
    const [loading, setLoading] = useState(false);

    return (
        <>
            <NavBar user={user} index={2} />
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
                <h1>My Campaigns</h1>
            )}
        </>
    );
}
