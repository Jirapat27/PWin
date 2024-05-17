import React, { useState, useEffect } from 'react';
import { databaseRef, onValue, db } from '../Config';
import { TrashIcon } from "@heroicons/react/24/solid";
import { Card } from "@material-tailwind/react";

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [filteredPlaceName, setFilteredPlaceName] = useState('');

  useEffect(() => {
    const fetchReportsData = () => {
      const reportsRef = databaseRef(db, 'Reports');
      onValue(reportsRef, (snapshot) => {
        const reportsData = snapshot.val();
        if (reportsData) {
          const reportsArray = Object.values(reportsData);
          setReports(reportsArray);
        }
      });
    };

    fetchReportsData();

    return () => {
      const reportsRef = databaseRef(db, 'Reports');
      onValue(reportsRef, null);
    };
  }, []);

  const handleFilter = (event) => {
    setFilteredPlaceName(event.target.value);
  };

  const filteredReports = reports.filter(
    (report) =>
      report.placename.toLowerCase().includes(filteredPlaceName.toLowerCase())
  );

  const getTypeText = (types) => {
    const typeMap = {
      incorrectName: "ชื่อไม่ถูกต้อง",
      incorrectPosition: "สถานที่ไม่มี",
      missingLocation: "ตำแหน่งไม่ถูกต้อง",
      other: "อื่นๆ"
    };

    return Object.keys(types)
      .filter((type) => types[type])
      .map((type) => typeMap[type])
      .join(", ");
  };

  return (
    <div className=" items-center text-center p-20 ml-180 mb-5">
      <div className="mb-4 justify-end">
        <input
          type="text"
          placeholder="Filter by place name"
          value={filteredPlaceName}
          onChange={handleFilter}
          className="flex-auto p-2 border rounded"
        />
      </div>
      <Card className="h-full w-full overflow-scroll">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr className="p-4 bg-slate-100">
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">ReportID</th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">Types</th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">Placename</th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">New Placename</th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">Description</th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">Images</th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredReports.map((report) => (
              <tr key={report.rid}>
                <td className="p-4">{report.rid}</td>
                <td className="p-4">{getTypeText(report.types)}</td>
                <td className="p-4">{report.placename}</td>
                <td className="p-4">{report.new_placename}</td>
                <td className="p-4">{report.description}</td>
                <td className="p-4">{/* Render your image here */}</td>
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
