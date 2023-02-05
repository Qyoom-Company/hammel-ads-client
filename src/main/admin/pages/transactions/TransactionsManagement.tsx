import React, { useState } from "react";
import LoadingSpinner from "../../../../utils/LoadingSpinner";
import AdminNavBar from "../../shared/AdminNavBar";
import IncreaseUserBalance from "./components/IncreaseUserBalance";

type Props = {};

function TransactionsManagement({}: Props) {
    const [loading, setLoading] = useState(false);
    return (
        <>
            <AdminNavBar index={1} />

            <div className="py-10">
                <header>
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
                            Transactions
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
                                <IncreaseUserBalance />
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </>
    );
}

export default TransactionsManagement;
