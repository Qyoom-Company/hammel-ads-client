import React from "react";

interface CardInfoType {
    brand: String; // "MASTERCARD";
    expiryMonth: String; // "12";
    expiryYear: String; // "25";
    issuer: String; // "JPMORGAN CHASE BANK, N.A.";
    number: String; // "545301xxxxxx5539";
}

type Props = {
    cardInfo: CardInfoType;
    setSelectedPaymentMethod: any;
    selectedPaymentMethod: string;
};

const CreditCardView = ({
    cardInfo,
    setSelectedPaymentMethod,
    selectedPaymentMethod,
}: Props) => {
    console.log(
        "hello",
        selectedPaymentMethod,
        cardInfo.number === selectedPaymentMethod,
        cardInfo
    );
    return (
        <div
            className="w-64 h-40 bg-gradient-to-r from-indigo-600 via-indigo-800 to-gray-800 rounded-lg shadow-lg cursor-pointer"
            style={{
                backgroundColor: "red",
                marginBottom: "5px",
                border:
                    selectedPaymentMethod === cardInfo.number
                        ? "2px solid black"
                        : "1px solid blue",
                opacity: selectedPaymentMethod === cardInfo.number ? 1 : 0.8,
            }}
            onClick={() => setSelectedPaymentMethod(cardInfo.number)}
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
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <rect x="3" y="5" width="18" height="14" rx="3" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                    <line x1="7" y1="15" x2="7.01" y2="15" />
                    <line x1="11" y1="15" x2="13" y2="15" />
                </svg>
                {/* <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="34"
                    height="34"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="#ffffff"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <circle cx="9.5" cy="9.5" r="5.5" fill="#fff" />
                    <circle cx="14.5" cy="14.5" r="5.5" />
                </svg> */}
            </div>
            <div className="flex justify-center mt-4">
                <h1 className="text-gray-300 font-thin font-os">
                    {cardInfo.number.toUpperCase()}
                </h1>
            </div>
            <div className="flex flex-col justfiy-end mt-4 p-4 text-gray-400 font-quick">
                <p className="font-bold text-xs">
                    {cardInfo.expiryMonth} / {cardInfo.expiryYear}
                </p>
                <h4 className="uppercase tracking-wider font-semibold text-xs">
                    {cardInfo.brand.toUpperCase()}
                </h4>
            </div>
        </div>
    );
};

export default CreditCardView;
