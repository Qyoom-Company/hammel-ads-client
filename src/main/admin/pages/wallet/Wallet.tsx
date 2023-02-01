import React, { useState } from "react";
import LoadingSpinner from "../../../../utils/LoadingSpinner";
import NavBar from "../../shared/NavBar";

type WalletProps = {};

export default function Wallet({}: WalletProps) {
    const [loading, setLoading] = useState(false);

    return (
        <>
            <NavBar index={3} />
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
