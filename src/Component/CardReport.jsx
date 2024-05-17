import { FlagIcon } from "@heroicons/react/24/outline";

import {
  Card,
  CardBody,
  Typography,
  CardHeader,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { databaseRef, db, onValue } from "../Config";

export function CardReport() {
  const [totalReport, settotalReport] = useState(0); // Initialize totalWin state with 0

  useEffect(() => {
    const fetchWins = () => {
      const reportRef = databaseRef(db, "Reports"); // Reference to the "MarkWin" collection
      onValue(reportRef, (snapshot) => {
        const reportsData = snapshot.val(); // Data from the "MarkWin" collection
        if (reportsData) {
          // If there is data, get the number of wins and update the state
          const numberReport = Object.values(reportsData).length;
          settotalReport(numberReport);

          // Log the total number of wins to the console
          console.log("Total number of reports:", numberReport);
        }
      });
    };

    fetchWins();

    // Cleanup function
    return () => {
      const winsRef = databaseRef(db, "Reports");
      onValue(winsRef, null);
    };
  }, []);

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
              Total of Reports
            </Typography>
          </div>
        </CardHeader>
        <CardBody className=" flex flex-col md:items-center p-2">
          {/* Display the number of wins */}
          <Typography className="font-bold text-7xl text-gray-">{totalReport}</Typography>
        </CardBody>
      </Card>
    </Link>
  );
}