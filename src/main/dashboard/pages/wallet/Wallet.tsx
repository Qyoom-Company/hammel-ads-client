import React, { useState } from "react";
import LoadingSpinner from "../../../../utils/LoadingSpinner";
import NavBar from "../../shared/NavBar";
import BalanceInfoTable from "./components/BalanceInfoTable";

type WalletProps = {};

export default function Wallet({}: WalletProps) {
    const [loading, setLoading] = useState(false);

    return (
        <>
            <NavBar index={3} />

            <div className="py-10">
                <header>
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
                            Wallet
                        </h1>
                    </div>
                </header>
                <main>
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
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
                            <div className="px-4 py-8 sm:px-0">
                                <BalanceInfoTable />
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </>
    );
}
