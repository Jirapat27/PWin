import { useEffect, useState } from "react";
import { MapPinIcon } from "@heroicons/react/24/outline";
import { onValue } from "firebase/database";
import { databaseRef, db } from "../Config";

import {
  Card,
  CardBody,
  Typography,
  CardHeader,
} from "@material-tailwind/react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

export function CardWin() {
  const [totalWin, setTotalWin] = useState(0); // Initialize totalWin state with 0

  useEffect(() => {
    const fetchWins = () => {
      const winsRef = databaseRef(db, "MarkWin"); // Reference to the "MarkWin" collection
      onValue(winsRef, (snapshot) => {
        const winsData = snapshot.val(); // Data from the "MarkWin" collection
        if (winsData) {
          // If there is data, get the number of wins and update the state
          const numberWin = Object.values(winsData).length;
          setTotalWin(numberWin);

          // Log the total number of wins to the console
          console.log("Total number of wins:", numberWin);
        }
      });
    };

    fetchWins();

    // Cleanup function
    return () => {
      const winsRef = databaseRef(db, "MarkWin");
      onValue(winsRef, null);
    };
  }, []);

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
          {/* Display the number of wins */}
          <Typography className="font-bold text-7xl text-gray-">{totalWin}</Typography>
        </CardBody>
      </Card>
    </Link>
  );
}