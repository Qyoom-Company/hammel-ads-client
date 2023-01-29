import { Link } from "react-router-dom";

interface CampaignsTableRowProps {
    campaign: any;
}

function dateFormater(date: Date, separator: string) {
    const day = date.getDate();
    // add +1 to month because getMonth() returns month from 0 to 11
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    // show date and month in two digits
    // if month is less than 10, add a 0 before it
    let dayString = String(day);
    let monthString = String(month);
    if (day < 10) {
        dayString = "0" + day;
    }
    if (month < 10) {
        monthString = "0" + month;
    }

    // now we have day, month and year
    // use the separator to join them
    return dayString + separator + monthString + separator + String(year);
}

function statusStyles(status: string): string {
    // console.log(status);
    switch (status) {
        case "ready":
        case "active":
            return "text-green-800 bg-green-100";
        case "in review":
        case "waiting for edit":
        case "waiting for funds":
            return "text-orange-800 bg-orange-100";
        case "stopped":
        case "ended":
            return "text-red-800 bg-red-100";

        default:
            return "text-gray-800 bg-gray-100";
    }
}

export default function CampaignTableRow({ campaign }: CampaignsTableRowProps) {
    return (
        <tr key={campaign.email}>
            {/* // title */}
            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                <div className="flex items-center">
                    <div className="font-medium text-gray-900">
                        {campaign.title}
                    </div>
                </div>
            </td>
            {/* // creation date */}
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {dateFormater(new Date(campaign.createdAt), "-")}
            </td>
            {/* // start date */}
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {dateFormater(new Date(campaign.startDate), "-")}
            </td>
            {/* // end date */}
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {dateFormater(new Date(campaign.endDate), "-")}
            </td>
            {/* // Budget */}
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {campaign.budget}
            </td>

            {/* // money spent */}
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {campaign.moneySpent}
            </td>

            {/* // clicks */}

            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {campaign.clicks}
            </td>

            {/* // click rate */}

            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {campaign.clickRate || "not calculated"}
            </td>

            {/* // status */}

            <td className="whitspace-nowrap px-3 py-4 text-sm text-gray-500">
                <span
                    className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${statusStyles(
                        campaign.status
                    )} `}
                >
                    {campaign.status.toUpperCase()}
                </span>
            </td>
            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                <Link
                    to={`/dashboard/campaigns/${campaign._id}`}
                    className="text-indigo-600 hover:text-indigo-900"
                >
                    Edit<span className="sr-only">, {campaign.name}</span>
                </Link>
            </td>
        </tr>
    );
}
