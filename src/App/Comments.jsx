import React, { useState, useEffect } from 'react';
import { databaseRef, onValue, db } from '../Config';

const Comments = () => {
  const [placeComments, setPlaceComments] = useState([]);

  useEffect(() => {
    const fetchCommentsData = () => {
      const commentsRef = databaseRef(db, 'comments');
      onValue(commentsRef, (snapshot) => {
        const commentsData = snapshot.val();
        if (commentsData) {
          // Convert object to array for easier mapping
          const commentsArray = Object.values(commentsData);
          setPlaceComments(commentsArray);
        }
      });
    };

    fetchCommentsData();

    // Cleanup function
    return () => {
      const commentsRef = databaseRef(db, 'comments');
      onValue(commentsRef, null);
    };
  }, []);

  return (
    <div className="m-auto items-center text-center">
      <h1 className="justify-center mt-3 mb-3 font-bold text-3xl">Comments List</h1>
      <table className="w-3/4 m-auto bg-slate-300 bg-h-200 rounded-xl">
        <thead className="">
          <tr className="bg-orange-500">
            <th className="w-auto h-12 text-white">ID</th>
            <th className="w-auto h-12 text-white">PlaceName</th>
            <th className="w-auto h-12 text-white">Comments</th>
            <th className="w-auto h-12 text-white">StarReview</th>
            <th className="w-auto h-12 text-white">Time</th>
            <th className="w-auto h-12 text-white">Username</th>
            <th className="w-auto h-12 text-white">Actions</th>
          </tr>
        </thead>
        <tbody>
          {placeComments.map((comment) => (
            <tr key={comment.cid}>
              <td>{comment.cid}</td>
              <td>{comment.placeName}</td>
              <td>{comment.description}</td>
              <td>{comment.starReview}</td>
              <td>{comment.timestamp}</td>
              <td>{comment.username}</td>
              <td>
                <div className="pad-2">
                  <button
                    className="bg-orange-500 px-3 py-1 rounded-xl text-white"
                    // onClick={() => handleOnDelete(comment.cid)}
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

export default Comments;
