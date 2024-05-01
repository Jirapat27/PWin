import React, { useState } from "react";

const Reports = () => {
  const [placeProblems, setplaceProblems] = useState([]);

  return (
    <div className="m-auto items-center text-center">
      <h1 className="justify-center mt-10 mb-10 font-bold text-3xl">
        Reports List
      </h1>

      <table className="w-full m-auto bg-slate-50 bg-h-200 rounded-xl">
        <thead className="">
          <tr className="bg-orange-500">
            <th className="w-auto h-12 text-white">PlaceName</th>
            <th className="w-auto h-12 text-white">Problems</th>
            <th className="w-auto h-12 text-white">Photos</th>
            <th className="w-auto h-12 text-white">Etc.</th>
            <th className="w-auto h-12 text-white">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr key={placeProblems._id}>
            <td>{placeProblems.name}</td>
            <td>{placeProblems.problem}</td>
            <td>
              {placeProblems.id}
              <td className="py-1">
                <img
                  className="h-20 w-20 m-auto rounded-md "
                  src={placeProblems.image}
                  alt={placeProblems.newimage}
                />
              </td>
            </td>
            <td>{placeProblems.etc}</td>
            <td>
              <div className=" mt-5 pad-2">
                <button
                  className="bg-orange-500 px-3 py-1 rounded-xl text-white"
                  // onClick={() => handleOnDelete(comment.cid)}
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Reports;
