import { XCircleIcon } from "@heroicons/react/20/solid";
interface props {
    show: boolean;
}
export default function NoUserFound({ show }: props) {
    return (
        <div
            className="rounded-md bg-red-50 p-4"
            style={{ display: !show ? "none" : "block" }}
        >
            <div className="flex">
                <div className="flex-shrink-0">
                    <XCircleIcon
                        className="h-5 w-5 text-red-400"
                        aria-hidden="true"
                    />
                </div>
                <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">
                        No user Found with that email address
                    </h3>
                </div>
            </div>
        </div>
    );
}
