import { UsersIcon } from "@heroicons/react/24/outline";
import { Card, CardBody, Typography, CardHeader } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { databaseRef, db, onValue, off } from "../Config";

export function CardUser() {
  const [totalUser, setTotalUser] = useState(0); // Initialize totalUser state with 0

  useEffect(() => {
    const usersRef = databaseRef(db, "users"); // Reference to the "users" collection

    const fetchUsers = () => {
      onValue(usersRef, (snapshot) => {
        const userData = snapshot.val(); // Data from the "users" collection
        if (userData) {
          const numberUser = Object.values(userData).length;
          setTotalUser(numberUser);
          console.log("Total number of users:", numberUser);
        }
      });
    };

    fetchUsers();

    // Cleanup function
    return () => {
      off(usersRef);
    };
  }, []);

  return (
    <Link to={"user"}>
      <Card className="m-6 w-80 rounded-3xl">
        <CardHeader
          floated={false}
          shadow={false}
          color="transparent"
          className="flex flex-col gap-4 rounded-none md:flex-row md:items-center "
        >
          <div className="w-max rounded-lg bg-gray-100 p-5 text-orange-700">
            <UsersIcon className="h-6 w-6" />
          </div>
          <div>
            <Typography
              variant="h6"
              className="font-bold text-lg text-orange-600 "
            >
              Total of User
            </Typography>
          </div>
        </CardHeader>
        <CardBody className=" flex flex-col md:items-center p-2">
          <Typography className="font-bold text-7xl">{totalUser}</Typography>
        </CardBody>
      </Card>
    </Link>
  );
}
