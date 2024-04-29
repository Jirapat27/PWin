import React, { useState } from 'react'

const Userpage = () => {
    const [users, setUsers] = useState([]);
    return (
        <div className="m-auto  items-center text-center ">
          <h1 className="justify-center mt-3 mb-3 font-bold text-3xl ">
            Users List
          </h1>
          <table className=" w-3/4  m-auto bg-slate-300 bg-h-200 rounded-xl">
            <thead className="">
              <tr className="bg-orange-500 ">
                <th className="w-auto h-12 text-white">Image</th>
                <th className="w-auto h-12 text-white">ID</th>
                <th className="w-auto h-12 text-white">Email</th>
                <th className="w-auto h-12 text-white">UserName</th>
                <th className="w-auto h-12 text-white">Actions</th>
              </tr>
            </thead>
            <tbody>
              
                <tr key={users._id}>
                  <td className="py-1">
                    <img
                      className="h-20 w-20 m-auto rounded-md "
                      src={users.image}
                      alt={users.name}
                    />
                  </td>
                  <td>{users.id}</td>
                  <td>{users.email}</td>
                  <td>{users.username}</td>
                  <td>
                    <div className="pad-2">
                      <button
                        className="bg-orange-500 px-3 py-1 rounded-xl text-white"
                        //onClick={() => handleOnDelete(users._id)}
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

export default Userpage