import React, { useState } from "react";
import LoadingSpinner from "../../utils/LoadingSpinner";
import NavBar from "./shared/NavBar";

type WalletProps = {
    user: any;
};

export default function Wallet({ user }: WalletProps) {
    const [loading, setLoading] = useState(false);

    return (
        <>
            <NavBar user={user} index={3} />
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
                <h1>wallet</h1>
            )}
        </>
    );
}
