import axios from "axios";

const mainRoute = "http://localhost:3500";

const TransactionsAPI = {
    increaseBalance: function (
        userEmail: string,
        amount: string,
        token: string
    ) {
        return axios.put(
            `${mainRoute}/api/users/increase-balance`,
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
