import React, { useState, useEffect } from "react";

import { Card } from "@material-tailwind/react";
import { PencilIcon } from "@heroicons/react/24/solid";
const Reports = () => {
  const [placeProblems, setplaceProblems] = useState([]);

  return (
    <div className="m-auto items-center text-center    mt-10 mb-10">

      <Card className="h-full w-full overflow-scroll">
        <table className="w-full min-w-max table-auto text-left ">
          <thead >
            <tr className=" p-4 bg-slate-100">
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">PlaceName</th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">Problems</th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">Photos</th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">Etc.</th>
              <th ></th>
            </tr>
          </thead>
          <tbody>
            <tr key={placeProblems._id}>
              <td className="p-7">{placeProblems.name}</td>
              <td className="p-7">{placeProblems.problem}</td>
              <td>
                {placeProblems.id}
                <td className="py-1 p-7">
                  <img
                    className="h-20 w-20 m-auto rounded-md "
                    src={placeProblems.image}
                    alt={placeProblems.newimage}
                  />
                </td>
              </td>
              <td  className="p-7">{placeProblems.etc}</td>
              <td>
                <div className="p-7  mt-5">
                  <button
                    className="bg-orange-400 px-3 py-1 rounded-lg w-10 h-10 ">

                    <PencilIcon className="h-5 w-5 text-white " color="orange-700" 
                          //onClick={() => handleOnDelete(user.uid)}
                          />

                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default Reports;
