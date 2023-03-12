import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

type Props = {};

const BalanceInfoTable = (props: Props) => {
    const user = useSelector((state: any) => state.user.user);
    const { t, i18n } = useTranslation();
    const language = i18n.language;
    useEffect(() => {
        if (!user) return;
    }, [user]);
    console.log("user from balance", user);
    return (
        <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
            <dl className="sm:divide-y sm:divide-gray-200">
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                        {t("full_name")}
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                        {`${user?.firstName} ${user?.lastName}`}
                    </dd>
                </div>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                        {t("email")}
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                        {user?.email}
                    </dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                        {t("account_balance")}
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                        ${user?.balance?.toFixed(2)}
                    </dd>
                </div>
            </dl>
        </div>
    );
};

export default BalanceInfoTable;
