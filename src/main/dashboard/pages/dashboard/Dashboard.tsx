import { useState } from "react";
import { useSelector } from "react-redux";
import LoadingSpinner from "../../../../utils/LoadingSpinner";
import NavBar from "../../shared/NavBar";
import ClicksLineChart from "./components/ClicksLineChart";
import LastTwoWeeksStats from "./components/LastTwoWeeksStats";

function Dashboard() {
    const [loading, setLoading] = useState(false);
    const user = useSelector((state: any) => state.user.user);

    const lastTwoWeeksStats = [
        { name: "total views", stat: "71,897" },
        { name: "total clicks", stat: "10,000" },
        { name: "click rate per 1000 appearances", stat: "10%" },
        { name: "Wallet", stat: `$${user?.balance?.toFixed(2)}` },
    ];

    return (
        <>
            <NavBar index={0} />
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
                <div className="py-10">
                    <header>
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-10">
                            <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
                                Dashboard
                            </h1>
                        </div>
                    </header>
                    <main>
                        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                            <LastTwoWeeksStats stats={lastTwoWeeksStats} />
                        </div>
                    </main>
                    <ClicksLineChart />
                </div>
            )}
        </>
    );
}

export default Dashboard;
