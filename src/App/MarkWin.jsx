import React, { useState, useEffect } from "react";
import { db, databaseRef, onValue } from '../Config';

function MarkWin() {
  const [wins, setWins] = useState([]);

  useEffect(() => {
    const fetchWins = () => {
      const winsRef = databaseRef(db, 'MarkWin'); // Reference to the "MarkWin" collection
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
      const winsRef = databaseRef(db, 'MarkWin');
      onValue(winsRef, null);
    };
  }, []);

  return (
    <div className="m-auto items-center text-center">
      <h1 className="justify-center mt-3 mb-3 font-bold text-3xl">Wins List</h1>
      <table className="w-3/4 m-auto bg-slate-300 bg-h-200 rounded-xl">
        <thead>
          <tr className="bg-orange-500">
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
          {wins.map((win, index) => (
            <tr key={index}>
              <td>{win.mid}</td>
              <td className="py-1">
                {/* If images array exists, display the first image */}
                {win.images && win.images.length > 0 && (
                  <img
                    className="h-20 w-20 m-auto rounded-md"
                    src={win.images[0]}
                    alt={win.name}
                  />
                )}
              </td>
              <td>{win.name}</td>
              <td>{win.description}</td>
              <td>{win.latitude}</td>
              <td>{win.longitude}</td>
              <td>
                <div className="pad-2">
                  <button
                    className="bg-orange-500 px-3 py-1 rounded-xl text-white"
                    //onClick={() => handleOnDelete(win.mid)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MarkWin;
