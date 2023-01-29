import { useEffect, useState } from "react";
import LoadingSpinner from "../../../../utils/LoadingSpinner";
import NavBar from "../../shared/NavBar";
import LastTwoWeeksStats from "./components/LastTwoWeeksStats";

function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
}
interface DashboardProps {
    user: any;
    setUser: any;
}
function Dashboard({ user, setUser }: DashboardProps) {
    const [loading, setLoading] = useState(false);

    const lastTwoWeeksStats = [
        { name: "ad appearance", stat: "71,897" },
        { name: "clicks", stat: "10,000" },
        { name: "click rate per 1000 appearances", stat: "10%" },
        { name: "Wallet", stat: "1000$" },
    ];

    useEffect(() => {
        if (!user) setLoading(true);
        else setLoading(false);
    }, [user]);

    return (
        <>
            <NavBar user={user} index={0} />
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
                </div>
            )}
        </>
    );
}

export default Dashboard;
