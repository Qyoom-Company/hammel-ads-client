import axios from "axios";

const WalletAPI = {
    getAllPaymentMethods: function (token: string) {
        return axios.get("http://localhost:3500/api/payments/paymentmethods", {
            headers: {
                authorization: `Bearer ${token}`,
            },
        });
    },
    executePaymentUsingCard: function (
        token: string,
        cardDetails: any,
        amount: number
    ) {
        return axios.post(
            "http://localhost:3500/api/payments/newdirectpayment",
            {
                cardDetails,
                amount,
            },
            {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            }
        );
    },
    executePaymentUsingToken: function (
        token: string,
        paymentToken: string,
        amount: number
    ) {
        return axios.post(
            "http://localhost:3500/api/payments/directpayment",
            {
                token: paymentToken,
                amount,
            },
            {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            }
        );
    },
};

export default WalletAPI;
