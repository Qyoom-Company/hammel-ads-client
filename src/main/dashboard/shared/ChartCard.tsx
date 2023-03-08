import React, { ReactNode } from "react";
import PropTypes from "prop-types";

interface ChartCardProps {
    name: string;
    from: string;
    to: string;
    children: ReactNode;
}

const ChartCard: React.FC<ChartCardProps> = ({ name, from, to, children }) => {
    return (
        <div className="bg-white shadow rounded-lg p-4">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">{name}</h2>
                <div className="text-sm font-medium text-gray-500">
                    {from} - {to}
                </div>
            </div>
            <div className="mt-4">{children}</div>
        </div>
    );
};

export default ChartCard;
