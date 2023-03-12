import { useTranslation } from "react-i18next";

interface LastTwoWeeksStatsProps {
    stats: {
        name: string;
        stat: string;
    }[];
}

export default function LastTwoWeeksStats({ stats }: LastTwoWeeksStatsProps) {
    const { t } = useTranslation();
    return (
        <div className="mx-4 sm:mx-0">
            <h3 className="text-md font-medium leading-6 text-gray-900 ml-2">
                {t("last_14_days")}
            </h3>
            <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-4">
                {stats.map((item) => (
                    <div
                        key={item.name}
                        className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6"
                    >
                        <dt className="truncate text-sm font-medium text-gray-500">
                            {item.name}
                        </dt>
                        <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
                            {item.stat}
                        </dd>
                    </div>
                ))}
            </dl>
        </div>
    );
}
