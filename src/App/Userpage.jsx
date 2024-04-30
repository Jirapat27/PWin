import React, { useState, useEffect } from 'react';
import { databaseRef, onValue, db } from '../Config';

const Userpage = () => {
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
    <div className="m-auto items-center text-center">
      <h1 className="justify-center mt-3 mb-3 font-bold text-3xl">Users List</h1>
      <table className="w-3/4 m-auto bg-slate-300 bg-h-200 rounded-xl">
        <thead className="">
          <tr className="bg-orange-500">
            <th className="w-auto h-12 text-white">Image</th>
            <th className="w-auto h-12 text-white">ID</th>
            <th className="w-auto h-12 text-white">Email</th>
            <th className="w-auto h-12 text-white">UserName</th>
            <th className="w-auto h-12 text-white">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.uid}>
              <td className="py-1">
                <img
                  className="h-20 w-20 m-auto rounded-md"
                  src={user.profilePic}
                  alt={user.username}
                />
              </td>
              <td>{user.uid}</td>
              <td>{user.email}</td>
              <td>{user.username}</td>
              <td>
                <div className="pad-2">
                  <button
                    className="bg-orange-500 px-3 py-1 rounded-xl text-white"
                    //onClick={() => handleOnDelete(user.uid)}
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
};

export default Userpage;
