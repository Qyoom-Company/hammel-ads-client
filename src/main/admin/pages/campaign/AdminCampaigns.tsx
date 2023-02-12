import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LoadingSpinner from "../../../../utils/LoadingSpinner";
import AdminNavBar from "../../shared/AdminNavBar";
import CampaignsAPI from "./api";
import CampaignsTable from "./components/CampaignsTable";

export default function AdminCampaigns() {
    const token = useSelector((state: any) => state.auth.token);
    const [loading, setLoading] = useState(false);
    const [campaigns, setCampaigns] = useState([]);

    const getCampaigns = async () => {
        try {
            const response = await CampaignsAPI.getAllCampaigns(token);
            const campaigns = response.data.data.reverse();
            setCampaigns(campaigns);
            setLoading(false);
        } catch (err: any) {
            console.log(err);
            setLoading(false);
        }
    };

    useEffect(() => {
        setLoading(true);
        getCampaigns();
    }, []);

    return (
        <>
            <AdminNavBar index={0} />
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
                <div className="px-4 sm:px-6 lg:px-8 mt-10">
                    <div className="sm:flex sm:items-center">
                        <div className="sm:flex-auto">
                            <h1 className="text-xl font-semibold text-gray-900">
                                All Campaigns
                            </h1>
                            <p className="mt-2 text-sm text-gray-700">
                                A list of all the campaigns created by all
                                users.
                            </p>
                        </div>
                    </div>
                    <CampaignsTable campaigns={campaigns} />
                </div>
            )}
        </>
    );
}
