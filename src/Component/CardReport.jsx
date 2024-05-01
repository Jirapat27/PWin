import { FlagIcon} from "@heroicons/react/24/outline";

import {
  Card,
  CardBody,
  Typography,
  CardHeader,
} from "@material-tailwind/react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

export function CardReport() {
  return (
    <Link to={"reports"}>
      <Card className="m-6 w-80 rounded-3xl">
        <CardHeader
          floated={false}
          shadow={false}
          color="transparent"
          className="flex flex-col gap-4 rounded-none md:flex-row md:items-center "
        >
          <div className="w-max rounded-lg bg-gray-100 p-5 text-orange-700">
            <FlagIcon className="h-6 w-6" />
          </div>
          <div>
            <Typography
              variant="h6"
              className="font-bold text-lg text-orange-600 "
            >
              Total of Report
            </Typography>
          </div>
        </CardHeader>
        <CardBody className=" flex flex-col md:items-center p-2">
          <Typography className="font-bold text-7xl ">2</Typography>
        </CardBody>
      </Card>
    </Link>
  );
}
