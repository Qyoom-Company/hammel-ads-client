import React from "react";
import { Chart, registerables } from "chart.js";
import { Line, Pie } from "react-chartjs-2";
Chart.register(...registerables);

type Props = {};
function ClicksLineChart({}: Props) {
    const Data = [
        {
            id: 1,
            year: 2016,
            userGain: 80000,
            userLost: 823,
        },
        {
            id: 2,
            year: 2017,
            userGain: 45677,
            userLost: 345,
        },
        {
            id: 3,
            year: 2018,
            userGain: 78888,
            userLost: 555,
        },
        {
            id: 4,
            year: 2019,
            userGain: 90000,
            userLost: 4555,
        },
        {
            id: 5,
            year: 2020,
            userGain: 4300,
            userLost: 234,
        },
    ];
    const data = {
        labels: Data.map((data) => data.year),
        datasets: [
            {
                label: "Popularity of colours",
                data: Data.map((data) => data.userGain),
                backgroundColor: [
                    "rgba(75,192,192,1)",
                    "#ecf0f1",
                    "#50AF95",
                    "#f3ba2f",
                    "#2a71d0",
                ],
                borderColor: "black",
            },
        ],
    };
    return (
        <>
            <div>
                <Line
                    data={data}
                    options={{
                        plugins: {
                            title: {
                                display: true,
                                text: "Users Gained between 2016-2020",
                            },
                        },
                    }}
                />
            </div>
        </>
    );
}

export default ClicksLineChart;
