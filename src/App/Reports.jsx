import React, { useState, useEffect } from 'react';
import { databaseRef, db, onValue, off } from "../Config";
import { TrashIcon } from "@heroicons/react/24/solid";
import { Card } from "@material-tailwind/react";

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [filteredType, setFilteredType] = useState('');

  useEffect(() => {
    const reportsRef = databaseRef(db, "Reports");
    const fetchReportsData = () => {
      onValue(reportsRef, (snapshot) => {
        const reportsData = snapshot.val();
        if (reportsData) {
          const reportsArray = Object.values(reportsData);
          setReports(reportsArray);
        } else {
          setReports([]);
        }
      });
    };

    fetchReportsData();

    return () => {
      off(reportsRef); // Stop listening to changes
    };
  }, []);

  const handleFilter = (event) => {
    setFilteredType(event.target.value);
  };

  const filteredReports = reports.filter(
    (report) =>
      report.category.toLowerCase().includes(filteredType.toLowerCase())
  );

  return (
    <div className="m-auto items-center text-center mt-10 mb-10">
      <div className="mb-4 flex justify-end">
        <input
          type="text"
          placeholder="Filter by category"
          value={filteredType}
          onChange={handleFilter}
          className="flex-auto p-2 border rounded"
        />
      </div>
      <Card className="h-full w-full overflow-scroll">
        <table className="w-full min-w-max table-auto text-center">
          <thead>
            <tr className="p-4 bg-slate-100">
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 text-center">ReportID</th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 text-center">Time</th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 text-center">Category</th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 text-center">Placename</th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 text-center">New Placename</th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 text-center">Description</th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 text-center">Images</th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 text-center">Username</th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 text-center">Actions</th>
            </tr> 
          </thead>
          <tbody className="text-center"> {/* Aligning content center */}
            {filteredReports.map((report) => (
              <tr key={report.rid}>
                <td className="p-4">{report.rid}</td>
                <td className="p-4">{report.timestamp}</td>
                <td className="p-4">{report.category || '-----'}</td>
                <td className="p-4">{report.placename || '-----'}</td>
                <td className="p-4">{report.new_placename || '-----'}</td>
                <td className="p-4">{report.description || '-----'}</td>
                <td className="p-4">
                  {report.images && report.images.length > 0 ? (
                    <img
                      src={report.images[0]}
                      alt="Report Image"
                      className="w-16 h-16 m-auto rounded-md" // Existing Tailwind classes
                      style={{ width: '300px', height: '300px' }} // Custom width and height
                    />
                  ) : (
                    '-----'
                  )}
                </td>
                <td className="p-4">{report.username}</td>
                <td>
                  <div className="p-7 m-5 items-center text-center">
                    <button className="justify-center bg-orange-400 rounded-lg w-10 h-10">
                      <TrashIcon className="h-7 w-8 pl-2 text-white" />
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
};

export default Reports;
