import React, { useState } from "react";

function MarkWin() {
  const [wins, setWins] = useState([]);

  return (
    <div className="m-auto  items-center text-center ">
      <h1 className="justify-center mt-3 mb-3 font-bold text-3xl ">
        wins List
      </h1>
      <table className=" w-3/4  m-auto bg-slate-300 bg-h-200 rounded-xl">
        <thead className="">
          <tr className="bg-orange-500 ">
            <th className="w-auto h-12 text-white">ID</th>
            <th className="w-auto h-12 text-white">Image</th>
            <th className="w-auto h-12 text-white">Name</th>
            <th className="w-auto h-12 text-white">Description</th>
            <th className="w-auto h-12 text-white">Latitude</th>
            <th className="w-auto h-12 text-white">Longitude</th>
            <th className="w-auto h-12 text-white">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr key={wins._id}>
          <td>{wins.id}</td>
            <td className="py-1">
              <img
                className="h-20 w-20 m-auto rounded-md "
                src={wins.image}
                alt={wins.name}
              />
            </td>
            <td>{wins.name}</td>
            <td>{wins.description}</td>
            <td>{wins.latitude}</td>
            <td>{wins.longitude}</td>
            <td>
              <div className="pad-2">
                <button
                  className="bg-orange-500 px-3 py-1 rounded-xl text-white"
                  //onClick={() => handleOnDelete(wins._id)}
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
}

export default MarkWin;
