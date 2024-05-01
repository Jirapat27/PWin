import React from 'react'
import {
    Card,
    CardBody,
    CardHeader,
    Typography,
  } from "@material-tailwind/react";
  import Chart from "react-apexcharts";
  import { FlagIcon } from "@heroicons/react/24/outline";
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

  const chartConfig = {
    type: "pie",
    width: 550,
    height: 350,
    series: [44, 55, 13, 43, 22],
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
      colors: ["#020617", "#ff8f00", "#00897b", "#1e88e5", "#d81b60"],
      legend: {
        show: false,
      },
    },
  };
export default function PieChartProblem() {

    
  return (
    <Card className=' rounded-3xl'>
      <Link to={"reports"}>
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
      >
        <div className="w-max rounded-lg bg-gray-100 p-5 text-orange-700">
          <FlagIcon className="h-6 w-6" />
        </div>
        <div>
          <Typography variant="h6" className=' font-bold text-lg text-orange-600'>
          Pie Chart All Rate Category of Reports
          </Typography>
          <Typography
            variant="small"
            color="gray"
            className="max-w-sm  text-md"
          >
            แสดงถึงหมวดหมู่ปัญหาที่ถูกรายงานเข้าระบบ
          </Typography>
        </div>
      </CardHeader>
      </Link>
      <CardBody className="mt-4 grid place-items-center px-2">
        <Chart {...chartConfig} />
      </CardBody>
    </Card>
  )
}
