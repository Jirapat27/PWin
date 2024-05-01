import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import Chart from "react-apexcharts";
import { MapPinIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

function ChartWin() {
  const chartConfig = {
    type: "line",
    height: 300,
    width: 500,
    series: [
      {
        name: "Sales",
        data: [1, 2, 3, 7, 10, 5, 6, 1, 3],
      },
    ],
    options: {
      chart: {
        toolbar: {
          show: false,
        },
      },
      title: {
        show: "",
      },
      dataLabels: {
        enabled: false,
      },
      colors: ["#020617"],
      stroke: {
        lineCap: "round",
        curve: "smooth",
      },
      markers: {
        size: 0,
      },
      xaxis: {
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        labels: {
          style: {
            colors: "#616161",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
        categories: [
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
        ],
      },
      yaxis: {
        labels: {
          style: {
            colors: "#616161",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
      },
      grid: {
        show: true,
        borderColor: "#dddddd",
        strokeDashArray: 5,
        xaxis: {
          lines: {
            show: true,
          },
        },
        padding: {
          top: 5,
          right: 20,
        },
      },
      fill: {
        opacity: 0.8,
        
      },
      tooltip: {
        theme: "orange",
      },
    },
  };

  return (
    <Card>
      <Link to={"markwin"}>
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
      >
        <div className="w-max rounded-lg bg-gray-100 p-5 text-orange-700">
          <MapPinIcon className="h-6 w-6" />
        </div>
        <div>
          <Typography
            variant="h6"
            className="font-bold text-lg text-orange-600 "
          >
            Line Chart Amount of markwin
          </Typography>
          <Typography
            variant="small"
            color="gray"
            className="max-w-sm font-normal text-md"
          >
            แสดงจำนวนจุดให้บริการวินมอเตอร์ไซค์ที่ถูกเพิ่มเข้าสู่ระบบ
          </Typography>

        </div>
      </CardHeader>
      </Link>
      <CardBody className="px-2 pb-0">
        <Chart {...chartConfig} />
      </CardBody>
    </Card>
  );
}

export default ChartWin;
