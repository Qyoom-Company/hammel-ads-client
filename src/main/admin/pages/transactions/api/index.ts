import axios from "axios";

const TransactionsAPI = {
    increaseBalance: function (
        userEmail: string,
        amount: string,
        token: string
    ) {
        return axios.post(
            `${process.env.REACT_APP_API_URL}/payments/increase-balance`,
            { userEmail: userEmail, amount: amount },
            {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            }
        );
    },
};

export default TransactionsAPI;
