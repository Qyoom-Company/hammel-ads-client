import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import InvalidInput from "../../../../components/alerts/InvalidInput";
import LoadingSpinner from "../../../../utils/LoadingSpinner";
import NavBar from "../../shared/NavBar";
import UpdateSuccess from "../../shared/UpdateSuccess";
import CampaignsAPI from "./api";
import PreviewComponent from "./PreviewComponent";
import countryList from "./staticData/countryList";
import AdminMessageAlert from "./components/AdminMessageAlert";
type Props = {};

function isValidHttpUrl(string: string) {
    let url;
    try {
        url = new URL(string);
    } catch (_) {
        return false;
    }
    return url.protocol === "http:" || url.protocol === "https:";
}

function formatDate(date: string) {
    // yyyy-mm-dd -> dd/mm/yyyy
    const [y, m, d] = date.split("-");
    return `${m}/${d}/${y}`;
}

function formatFetchedDate(date: string) {
    // 2023-01-09T23:00:00.000Z for example to yyyy-mm-dd
    return date.split("T")[0];
}

function EditCampaignPage({}: Props) {
    const campaignId = useParams().id;

    const navigate = useNavigate();

    const [errorMessage, setErrorMessage] = useState("");

    const token = useSelector((state: any) => state.auth.token);

    const [loading, setLoading] = useState(true);
    const [campaign, setCampaign] = useState({
        _id: "",
        title: "",
        startDate: "",
        endDate: "",
        budget: "",
        country: "",
        photoPath: "",
        link: "",
        status: "",
        adminMessage: "",
    });
    const [campaignInfo, setCampaignInfo] = useState({
        title: "",
        startDate: "",
        endDate: "",
        budget: "",
        country: "",
        photoPath: "",
        link: "",
    });

    const [showSuccessUpdate, setShowSuccessUpdate] = useState(false);

    const changePhotoHandler = async (e: any) => {
        e.preventDefault();
        const campaignPhoto = e.target.files[0];
        if (campaignPhoto !== null) {
            const formData = new FormData();
            formData.append("campaignPhoto", campaignPhoto);
            try {
                const response = await CampaignsAPI.uploadCampaignPhoto(
                    formData,
                    token
                );
                setCampaignInfo({
                    ...campaignInfo,
                    photoPath: response.data.data.photoPath,
                });
            } catch (err: any) {
                console.log(err);
                setErrorMessage("invalid file type");
            }
        }
    };

    const getCampaign = async () => {
        try {
            const response = await CampaignsAPI.getCampaignById(
                token,
                campaignId || "nothing"
            );
            const fetchedCampaign = response.data.data;
            setCampaign(fetchedCampaign);
            console.log(fetchedCampaign);
            setCampaignInfo({
                ...fetchedCampaign,
                startDate: formatFetchedDate(fetchedCampaign.startDate),
                endDate: formatFetchedDate(fetchedCampaign.endDate),
            });
        } catch (err: any) {
            console.log(err);
            navigate("/notfound");
        }
    };

    const formIsValid = () => {
        if (campaignInfo.title.length < 3 || campaignInfo.title.length > 40) {
            setErrorMessage("Title must be between 3 and 40 characters");
            return false;
        }
        if (campaignInfo.startDate === "") {
            setErrorMessage("you must provide a start date");
            return false;
        }
        if (campaignInfo.endDate === "") {
            setErrorMessage("you must provide an end date");
            return false;
        }
        if (
            isNaN(Number(campaignInfo.budget)) ||
            Number(campaignInfo.budget) < 10
        ) {
            setErrorMessage("budget must be greater than 10");
            return false;
        }
        if (!countryList.includes(campaignInfo.country)) {
            setErrorMessage("you must provide a country");
            return false;
        }
        if (campaignInfo.photoPath === "") {
            setErrorMessage("you must provide a campaign photo");
            return false;
        }
        if (!isValidHttpUrl(campaignInfo.link)) {
            if (!campaignInfo.link) {
                setErrorMessage("you must provide a campaign link");
            } else {
                setErrorMessage("invalid campaign link: " + campaignInfo.link);
            }
            return false;
        }
        return true;
    };

    const saveHandler = async () => {
        if (!formIsValid()) return;

        try {
            const data = {
                ...campaignInfo,
                startDate: formatDate(campaignInfo.startDate),
                endDate: formatDate(campaignInfo.endDate),
            };
            const response = await CampaignsAPI.updateCampaign(
                data,
                campaign._id,
                token
            );
            setShowSuccessUpdate(true);
        } catch (err: any) {
            setErrorMessage(err.response.data.message);
            console.log(err);
        }
    };

    useEffect(() => {
        if (!token) return;
        getCampaign();
        setLoading(false);
    }, [token]);

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
                <form
                    className="space-y-8 divide-y divide-gray-200 m-20"
                    onChange={() => setErrorMessage("")}
                >
                    {campaign.adminMessage ? (
                        <AdminMessageAlert message={campaign.adminMessage} />
                    ) : (
                        <></>
                    )}
                    <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
                        <div className="space-y-6 pt-8 sm:space-y-5 sm:pt-10">
                            <div>
                                <h3 className="text-lg font-medium leading-6 text-gray-900">
                                    Edit your campaign here
                                </h3>
                                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                                    If you change the link or campaign photo and
                                    click publish, the campaign it will be sent
                                    to review automatically for the team to
                                    review the changes and accept or ask you to
                                    edit it.
                                </p>
                            </div>
                            <div className="space-y-6 sm:space-y-5">
                                <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                                    <label
                                        htmlFor="title"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        title:
                                    </label>
                                    <br />
                                    <div className="mt-1 sm:col-span-2 sm:mt-0">
                                        <input
                                            type="text"
                                            name="title"
                                            id="title"
                                            autoComplete="given-name"
                                            className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            value={campaignInfo.title}
                                            onChange={(e) =>
                                                setCampaignInfo({
                                                    ...campaignInfo,
                                                    title: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                </div>

                                <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                                    <label
                                        htmlFor="startDate"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        start date:
                                    </label>
                                    <br />
                                    <div className="mt-1 sm:col-span-2 sm:mt-0">
                                        <input
                                            type="date"
                                            id="myDate"
                                            name="bday"
                                            min="2024-30-01"
                                            max="2050-01-01"
                                            value={campaignInfo.startDate}
                                            onChange={(e) => {
                                                console.log(e.target.value);
                                                setCampaignInfo({
                                                    ...campaignInfo,
                                                    startDate: e.target.value,
                                                });
                                            }}
                                            className=" max-w-lg  border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-gray-600"
                                        ></input>
                                    </div>
                                </div>
                                <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                                    <label
                                        htmlFor="endDate"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        end date:
                                    </label>
                                    <br />
                                    <div className="mt-1 sm:col-span-2 sm:mt-0">
                                        <input
                                            type="date"
                                            id="myDate"
                                            name="bday"
                                            min="2024-30-01"
                                            max="2050-01-01"
                                            value={campaignInfo.endDate}
                                            onChange={(e) =>
                                                setCampaignInfo({
                                                    ...campaignInfo,
                                                    endDate: e.target.value,
                                                })
                                            }
                                            className=" max-w-lg  border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-gray-600"
                                        ></input>
                                    </div>
                                </div>

                                <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                                    <label
                                        htmlFor="budget"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Budget:
                                    </label>
                                    <br />
                                    <div className="mt-1 sm:col-span-2 sm:mt-0">
                                        <input
                                            type="text"
                                            name="budget"
                                            id="budget"
                                            value={campaignInfo.budget}
                                            onChange={(e) =>
                                                setCampaignInfo({
                                                    ...campaignInfo,
                                                    budget: e.target.value,
                                                })
                                            }
                                            className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        />
                                    </div>
                                </div>
                                <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                                    <label
                                        htmlFor="country"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Country:
                                    </label>
                                    <br />
                                    <div className="mt-1 sm:col-span-2 sm:mt-0">
                                        <select
                                            id="country"
                                            name="country"
                                            autoComplete="country-name"
                                            value={campaignInfo.country}
                                            onChange={(e) =>
                                                setCampaignInfo({
                                                    ...campaignInfo,
                                                    country: e.target.value,
                                                })
                                            }
                                            className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 "
                                        >
                                            <option>
                                                Please select a country
                                            </option>
                                            {countryList.map((country, i) => (
                                                <option key={i}>
                                                    {country}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="">
                                    <label
                                        htmlFor="cover-photo"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Campaign Image:
                                    </label>
                                    <div className="mt-1 sm:col-span-2 sm:mt-0 flex-col items-center justify-center">
                                        <div className="flex max-w-lg justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6 h-52 mt-10 ">
                                            <div
                                                className="space-y-1 text-center"
                                                style={{ minWidth: "200px" }}
                                            >
                                                <svg
                                                    className="mx-auto h-12 w-12 text-gray-400"
                                                    stroke="currentColor"
                                                    fill="none"
                                                    viewBox="0 0 48 48"
                                                    aria-hidden="true"
                                                >
                                                    <path
                                                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                                        strokeWidth={2}
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </svg>
                                                <div className="flex text-sm text-gray-600">
                                                    <label
                                                        htmlFor="file-upload"
                                                        className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                                                    >
                                                        <span>
                                                            Upload a file
                                                        </span>
                                                        <input
                                                            id="file-upload"
                                                            name="file-upload"
                                                            type="file"
                                                            className="sr-only"
                                                            accept=".png, .jpg, .jpeg"
                                                            onChange={
                                                                changePhotoHandler
                                                            }
                                                        />
                                                    </label>
                                                    <p className="pl-1">
                                                        or drag and drop
                                                    </p>
                                                </div>
                                                <p className="text-xs text-gray-500">
                                                    2090*1284 PNG, JPG, JPEG up
                                                    to 10MB
                                                </p>
                                            </div>
                                        </div>
                                        <PreviewComponent
                                            photoPath={campaignInfo.photoPath}
                                        />
                                    </div>
                                </div>

                                <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                                    <label
                                        htmlFor="link"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        link:
                                    </label>
                                    <br />
                                    <div className="mt-1 sm:col-span-2 sm:mt-0">
                                        <input
                                            type="text"
                                            name="link"
                                            id="link"
                                            value={campaignInfo.link}
                                            onChange={(e) =>
                                                setCampaignInfo({
                                                    ...campaignInfo,
                                                    link: e.target.value,
                                                })
                                            }
                                            className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 "
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pt-5">
                        <div className="flex justify-end">
                            <button
                                type="button"
                                className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                onClick={(e) => {
                                    e.preventDefault();
                                    saveHandler();
                                }}
                            >
                                Publish
                            </button>
                        </div>
                    </div>
                    <InvalidInput content={errorMessage} />
                </form>
            )}

            <UpdateSuccess
                content="Campaign updated successfully"
                setShowSuccessUpdate={setShowSuccessUpdate}
                showSuccessUpdate={showSuccessUpdate}
            />
        </>
    );
}

export default EditCampaignPage;
