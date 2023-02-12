import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../../../utils/LoadingSpinner";
import NavBar from "../../shared/NavBar";
import CampaignsAPI from "./api";
import CampaignsTable from "./components/CampaignsTable";

type CampaignsProps = {};

export default function Campaigns({}: CampaignsProps) {
    const token = useSelector((state: any) => state.auth.token);
    const [loading, setLoading] = useState(false);
    const [campaigns, setCampaigns] = useState([]);

    const getCampaigns = async () => {
        try {
            const response = await CampaignsAPI.getAllCampaigns(token);
            const campaigns = response.data.data.reverse();
            setCampaigns(campaigns);
            setCampaigns(response.data.data);
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
            <NavBar index={2} />
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
                                Campaigns
                            </h1>
                            <p className="mt-2 text-sm text-gray-700">
                                A list of all the campaigns your created.
                            </p>
                        </div>
                        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                            <Link
                                to={"/dashboard/campaigns/create"}
                                className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                            >
                                Add Campaign
                            </Link>
                        </div>
                    </div>
                    <CampaignsTable campaigns={campaigns} />
                </div>
            )}
        </>
    );
}
