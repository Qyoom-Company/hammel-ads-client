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
        to: string,
        country: string | null = null,
        campaignName: string | null = null
    ) {
        console.log(
            country,
            campaignName,
            "htis -<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<"
        );
        return axios.post(
            `${mainRoute}/api/analytics/user-analytics`,
            {
                type,
                from,
                to,
                country,
                campaignName,
            },
            {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            }
        );
    },
};

export default AnalyticsAPI;
