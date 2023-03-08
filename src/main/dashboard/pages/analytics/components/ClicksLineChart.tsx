import { Chart, registerables } from "chart.js";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

Chart.register(...registerables);

interface Props {
    clicks: any;
}

interface ChartData {
    labels: string[];
    datasets: ChartDataset[];
}

interface ChartDataset {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
    fill: boolean;
    pointBorderColor: string;
    pointBackgroundColor: string;
    pointRadius: number;
    pointBorderWidth: number;
    borderWidth: number;
    tension: number;
}

function formatDateToLabel(dateString: string): string {
    const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];
    const dateParts = dateString.split("-");
    const monthIndex = parseInt(dateParts[1], 10) - 1;
    const month = months[monthIndex];
    const day = parseInt(dateParts[2], 10);
    return `${month} ${day}`;
}

function ClicksLineChart({ clicks }: Props) {
    const [chartData, setChartData] = useState<ChartData>({
        labels: [],
        datasets: [],
    });

    useEffect(() => {
        setChartData({
            labels:
                clicks?.labels?.map((label: string) =>
                    formatDateToLabel(label)
                ) || [],
            datasets: [
                {
                    label: "Number Of Clicks",
                    data: clicks.datasets,
                    borderColor: "#f74d64",
                    backgroundColor: "transparent",
                    pointBorderColor: "transparent",
                    pointBackgroundColor: "#f74d64",
                    pointBorderWidth: 8,
                    borderWidth: 7,
                    fill: false,
                    tension: 0.4,
                    pointRadius: 7,
                },
            ],
        });
    }, [clicks]);

    const options = {
        scales: {
            x: {
                ticks: {
                    display: false,
                    font: {
                        size: 10,
                    },
                },
                grid: {
                    display: false,
                },
            },
            y: {
                grid: {},
                ticks: {
                    precision: 0,
                },
                beginAtZero: true,
            },
        },
        plugins: {
            legend: {
                display: false,
            },
        },
    };

    return <Line data={chartData} options={options} />;
}

export default ClicksLineChart;
