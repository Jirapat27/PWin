import React, { useState, useEffect } from 'react';
import { Card } from "@material-tailwind/react";
import { databaseRef, onValue, db } from '../Config';
import { TrashIcon } from "@heroicons/react/24/solid";
const UserTest = () => {
  const [users, setUsers] = useState([]);


  useEffect(() => {
    const fetchUserData = () => {
      const usersRef = databaseRef(db, 'users');
      onValue(usersRef, (snapshot) => {
        const userData = snapshot.val();
        if (userData) {
          // Convert object to array for easier mapping
          const userArray = Object.values(userData);
          setUsers(userArray);

        }
      });
    };

    fetchUserData();

    // Cleanup function
    return () => {
      const usersRef = databaseRef(db, 'users');
      onValue(usersRef, null);
    };
  }, []);


  return (
    <div className="m-auto items-center text-center  mt-10 mb-10" >
      
      <Card className="h-full w-full overflow-scroll">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr className=" p-4 bg-slate-100">
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">ID</th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">Email</th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">UserName</th>
              <th ></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.uid} >
                <td className="p-4">{user.uid}</td>
                <td className="p-4">{user.email}</td>
                <td className="p-4">{user.username}</td>
                <td>
                  <div className="p-7 m-5 items-center text-center">
                  <button className="justify-center bg-orange-400  rounded-lg w-10 h-10 ">
                        
                        <TrashIcon className="h-7 w-8 pl-2 text-white " 
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
};

export default UserTest;