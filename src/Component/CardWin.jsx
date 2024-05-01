import { MapPinIcon } from "@heroicons/react/24/outline";

import {
  Card,
  CardBody,
  Typography,
  CardHeader,
} from "@material-tailwind/react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

export function CardWin() {
  return (
    <Link to={"markwin"}>
      <Card className="m-6 w-80 rounded-3xl">
        <CardHeader
          floated={false}
          shadow={false}
          color="transparent"
          className="flex flex-col gap-4 rounded-none md:flex-row md:items-center "
        >
          <div className="w-max rounded-lg bg-gray-100 p-5 text-orange-700">
            <MapPinIcon className="h-6 w-6" />
          </div>
          <div>
            <Typography
              variant="h6"
              className="font-bold text-lg text-orange-600 "
            >
              Total of P'Win Marker
            </Typography>
          </div>
        </CardHeader>
        <CardBody className=" flex flex-col md:items-center p-2">
          <Typography className="font-bold text-7xl text-gray-">12</Typography>
        </CardBody>
      </Card>
    </Link>
  );
}
