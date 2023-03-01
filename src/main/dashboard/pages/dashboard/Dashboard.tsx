import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LoadingSpinner from "../../../../utils/LoadingSpinner";
import AnalyticsAPI from "../../shared/AnalyticsAPI";
import NavBar from "../../shared/NavBar";
import ViewsLineChart from "./components/ViewsLineChart";
import LastTwoWeeksStats from "./components/LastTwoWeeksStats";
import ClicksLineChart from "./components/ClicksLineChart";

function Dashboard() {
    const [loading, setLoading] = useState(false);
    const [stats, setStats] = useState({
        clicks: 0,
        views: 0,
        clickRate: null,
    });

    const user = useSelector((state: any) => state.user.user);
    const token = useSelector((state: any) => state.auth.token);

    const lastTwoWeeksStats = [
        { name: "Total Views", stat: `${stats.views}` },
        { name: "Total Clicks", stat: `${stats.clicks}` },
        {
            name: "Click Rate",
            stat: stats.clickRate ? `${stats.clickRate}%` : `Not Calculated`,
        },
        { name: "Wallet", stat: `$${user?.balance?.toFixed(2) || ""}` },
    ];

    const getUserStats = async () => {
        try {
            const today = new Date(); // Get today's date
            const lastTwoWeeks = new Date(
                today.getTime() - 14 * 24 * 60 * 60 * 1000
            ); // Subtract 14 days in milliseconds to get the date two weeks ago
            const startDate = lastTwoWeeks.toISOString().split("T")[0]; // Convert date to ISO format and extract the date string
            const endDate = today.toISOString().split("T")[0]; // Do the same for today's date
            const stats = await AnalyticsAPI.getUserStats(
                token,
                startDate,
                endDate
            );

            console.log("staaaaaaaats", setStats(stats.data.data));
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getUserStats();
    }, []);

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
                            <br /> <br />
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    gap: "10px",
                                }}
                            >
                                <div
                                    style={{
                                        width: "50%",
                                        height: "350px",
                                    }}
                                >
                                    <ViewsLineChart />
                                </div>
                                <div
                                    style={{
                                        width: "50%",
                                    }}
                                >
                                    <ClicksLineChart />
                                </div>
                            </div>
                            <br></br> <br></br>
                        </div>
                    </main>
                </div>
            )}
        </>
    );
}

export default Dashboard;
