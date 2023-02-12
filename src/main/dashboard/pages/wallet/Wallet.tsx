import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LoadingSpinner from "../../../../utils/LoadingSpinner";
import NavBar from "../../shared/NavBar";
import WalletAPI from "./api";
import AddBalanceButton from "./components/AddBalanceButton";
import BalanceInfoTable from "./components/BalanceInfoTable";
import CreditCardView from "./components/CreditCardView";
import NoPaymentMethods from "./components/NoPaymentMethods";

type WalletProps = {};

export default function Wallet({}: WalletProps) {
    const [loading, setLoading] = useState(false);
    const [paymentMethods, setPaymentMethods] = useState([]);
    const token = useSelector((state: any) => state.auth.token);

    const getMethods = async () => {
        try {
            console.log("token", token);
            const response = await WalletAPI.getAllPaymentMethods(token);
            const paymentMethodsArray = response.data.data;
            setPaymentMethods(paymentMethodsArray);
        } catch (err) {
            console.log("this is an error", err);
        }
    };

    useEffect(() => {
        getMethods();
    }, []);

    return (
        <>
            <NavBar index={3} />

            <div className="py-10">
                <header>
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
                            Wallet
                        </h1>
                    </div>
                </header>
                <main>
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
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
                            <div className="px-4 py-8 sm:px-0">
                                <BalanceInfoTable />
                                <br></br>
                                <div className="ml-4">
                                    <div className="mt-10 border-t border-gray-200 pt-10">
                                        <h1>your payment methods</h1>
                                        <br></br>

                                        <h4>
                                            {paymentMethods.length === 0 &&
                                                "you don't have any payment methods yet"}
                                        </h4>
                                        <ul className="flex gap-1">
                                            {paymentMethods.map(
                                                (paymentMethod: any) => (
                                                    <div
                                                        className="w-64 h-40 bg-gradient-to-r from-indigo-600 via-indigo-800 to-gray-800 rounded-lg shadow-lg cursor-pointer"
                                                        onClick={() => {
                                                            console.log(
                                                                paymentMethod.cardInfo
                                                            );
                                                        }}
                                                    >
                                                        <div className="flex justify-between m-2">
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                width="34"
                                                                height="34"
                                                                viewBox="0 0 24 24"
                                                                strokeWidth="1.5"
                                                                stroke="#ffffff"
                                                                fill="none"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                            >
                                                                <path
                                                                    stroke="none"
                                                                    d="M0 0h24v24H0z"
                                                                    fill="none"
                                                                />
                                                                <rect
                                                                    x="3"
                                                                    y="5"
                                                                    width="18"
                                                                    height="14"
                                                                    rx="3"
                                                                />
                                                                <line
                                                                    x1="3"
                                                                    y1="10"
                                                                    x2="21"
                                                                    y2="10"
                                                                />
                                                                <line
                                                                    x1="7"
                                                                    y1="15"
                                                                    x2="7.01"
                                                                    y2="15"
                                                                />
                                                                <line
                                                                    x1="11"
                                                                    y1="15"
                                                                    x2="13"
                                                                    y2="15"
                                                                />
                                                            </svg>
                                                        </div>
                                                        <div className="flex justify-center mt-4">
                                                            <h1 className="text-gray-300 font-thin font-os">
                                                                {paymentMethod.cardInfo.number.toUpperCase()}
                                                            </h1>
                                                        </div>
                                                        <div className="flex flex-col justfiy-end mt-4 p-4 text-gray-400 font-quick">
                                                            <p className="font-bold text-xs">
                                                                {
                                                                    paymentMethod
                                                                        .cardInfo
                                                                        .expiryMonth
                                                                }{" "}
                                                                /{" "}
                                                                {
                                                                    paymentMethod
                                                                        .cardInfo
                                                                        .expiryYear
                                                                }
                                                            </p>
                                                            <h4 className="uppercase tracking-wider font-semibold text-xs">
                                                                {paymentMethod.cardInfo.brand.toUpperCase()}
                                                            </h4>
                                                        </div>
                                                    </div>
                                                    // </div>
                                                )
                                            )}
                                        </ul>
                                    </div>
                                    <br></br>
                                    <AddBalanceButton />
                                </div>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </>
    );
}
