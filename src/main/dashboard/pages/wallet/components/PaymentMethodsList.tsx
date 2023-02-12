import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/20/solid";
import CreditCardView from "./CreditCardView";

interface Props {
    paymentMethods: any;
}
export default function PaymentMethodsList({ paymentMethods }: Props) {
    return (
        <ul
            role="list"
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
            {paymentMethods.map((paymentMethod: any, index: number) => (
                <li
                    key={index}
                    className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow"
                >
                    {/* <CreditCardView cardInfo={paymentMethod.cardInfo} />
                    <CreditCardView cardInfo={paymentMethod.cardInfo} /> */}
                </li>
            ))}
        </ul>
    );
}
