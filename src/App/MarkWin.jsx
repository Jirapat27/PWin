import React, { useState, useEffect } from "react";
import { db, databaseRef, onValue } from "../Config";
import { Card} from "@material-tailwind/react";
import { PencilIcon } from "@heroicons/react/24/solid";

function MarkTest() {
  const [wins, setWins] = useState([]);


  useEffect(() => {
    const fetchWins = () => {
      const winsRef = databaseRef(db, "MarkWin"); // Reference to the "MarkWin" collection
      onValue(winsRef, (snapshot) => {
        const winsData = snapshot.val(); // Data from the "MarkWin" collection
        if (winsData) {
          // Convert object to array for easier mapping
          const winsArray = Object.values(winsData);
          setWins(winsArray);

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
    <div
      className=" items-center text-center mt-10 mb-10"

    >

      <Card className="h-full w-full overflow-scroll">
        <table className=" w-full min-w-max table-auto text-left  ">
          <thead>
            <tr className=" p-4 bg-slate-100" >
              {/* <th className="w-auto h-12 text-white">ID</th> */}
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">Image</th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">Name</th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">Description</th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">Latitude</th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">Longitude</th>
              <th className=""></th>
            </tr>
          </thead>
          <tbody>
            {wins.map((win, index) => (
              <tr key={index}>
                {/* <td>{win.mid}</td> */}
                <td className="py-1 p-7">
                  {win.images && win.images.length > 0 && (
                    <img
                      className="h-20 w-20 m-auto rounded-md"
                      src={win.images[0]}
                      alt={win.name}
                    />
                  )}
                </td>
                <td  className="p-7" >{win.name}</td>
                <td  className="p-7">{win.description}</td>
                <td  className="p-7">{win.latitude}</td>
                <td className="p-7">{win.longitude}</td>
                <td>
                  <div className="p-7  mt-5">
                  <button className="bg-orange-400 px-3 py-1 rounded-lg w-10 h-10 ">
                        
                          <PencilIcon className="h-5 w-5 text-white " color="orange-700" 
                          //onClick={() => handleOnDelete(user.uid)}
                          />


                      </button>

                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

export default MarkTest;
