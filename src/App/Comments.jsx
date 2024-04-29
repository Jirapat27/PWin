import React, { useState } from 'react'

const Comments = () => {
    const [placeComments, setPlaceComments] = useState([]);
    return (
        <div className="m-auto  items-center text-center ">
          <h1 className="justify-center mt-3 mb-3 font-bold text-3xl ">
            Comments List
          </h1>
          <table className=" w-3/4  m-auto bg-slate-300 bg-h-200 rounded-xl">
            <thead className="">
              <tr className="bg-orange-500 ">
                <th className="w-auto h-12 text-white">ID</th>
                <th className="w-auto h-12 text-white">PlaceName</th>
                <th className="w-auto h-12 text-white">Comments</th>
                <th className="w-auto h-12 text-white">StarReview</th>
                <th className="w-auto h-12 text-white">Time</th>
                <th className="w-auto h-12 text-white">Username</th>
              </tr>
            </thead>
            <tbody>
              
                <tr key={placeComments._id}>
                  <td >{placeComments.placename}</td>
                  <td>{placeComments.comments}</td>
                  <td>{placeComments.starreview}</td>
                  <td>{placeComments.time}</td>
                  <td>{placeComments.username}</td>
                  <td>
                    <div className="pad-2">
                      <button
                        className="bg-orange-500 px-3 py-1 rounded-xl text-white"
                        //onClick={() => handleOnDelete(placeComments._id)}
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


export default Comments