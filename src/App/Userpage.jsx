import React, { useState, useEffect } from 'react';
import { Card } from "@material-tailwind/react";
import { databaseRef, db, onValue, off } from "../Config";
import { TrashIcon } from "@heroicons/react/24/solid";
const Userpage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const usersRef = databaseRef(db, 'users');
    const fetchUserData = () => {
      onValue(usersRef, (snapshot) => {
        const userData = snapshot.val();
        if (userData) {
          // Convert object to array for easier mapping
          const userArray = Object.values(userData);
          setUsers(userArray);
        } else {
          setUsers([]);
        }
      });
    };

    fetchUserData();

    // Cleanup function
    return () => {
      off(usersRef); // Stop listening to changes
    };
  }, []);

  return (
    <div className="m-auto items-center text-center mt-10 mb-10">
      <Card className="h-full w-full overflow-scroll">
        <table className="w-full min-w-max table-auto text-center">
          <thead>
            <tr className="p-4 bg-slate-100">
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">ID</th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">Email</th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">Profile Picture</th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">Username</th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">Action</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.uid}>
                <td className="p-4">{user.uid}</td>
                <td className="p-4">{user.email}</td>
                <td className="py-1 p-7">
                  {user.profilePic && user.profilePic.length > 0 && (
                    <img
                      className="h-20 w-20 m-auto rounded-md"
                      style={{ width: '100px', height: '100px' }} // Custom width and height
                      src={user.profilePic}
                      alt={user.username}
                    />
                  )}
                </td>
                <td className="p-4">{user.username}</td>
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

export default Userpage;
