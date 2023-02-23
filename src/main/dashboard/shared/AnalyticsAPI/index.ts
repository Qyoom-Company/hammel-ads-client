import axios from "axios";

const mainRoute = "http://localhost:3500";

const AnalyticsAPI = {
    getUserStats: function (token: string, from: string, to: string) {
        return axios.post(
            `${mainRoute}/api/analytics/user-stats`,
            {
                from,
                to,
            },
            {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            }
        );
    },
    getTotalAnalytics: function (
        token: string,
        type: string,
        from: string,
        to: string
    ) {
        console.log(type);
        return axios.post(
            `${mainRoute}/api/analytics/user-analytics`,
            {
                type,
                from,
                to,
            },
            {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            }
        );
    },
    createCampaign: function (data: any, token: string) {
        return axios.post(`${mainRoute}/api/campaigns/`, data, {
            headers: {
                authorization: `Bearer ${token}`,
            },
        });
    },
    updateCampaign: function (
        updateInfo: any,
        campaignId: string,
        token: string
    ) {
        return axios.patch(
            `${mainRoute}/api/campaigns/${campaignId}`,
            updateInfo,
            {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            }
        );
    },

    uploadCampaignPhoto: function (campaignPhotoData: FormData, token: string) {
        return axios.post(
            "http://localhost:3500/api/campaigns/upload-campaign-photo",
            campaignPhotoData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                    authorization: `Bearer ${token}`,
                },
            }
        );
    },
};

export default AnalyticsAPI;
