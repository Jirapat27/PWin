
import React, { useState, useEffect } from 'react';
import { databaseRef, onValue, db } from '../Config';

const Comments = () => {
  const [placeComments, setPlaceComments] = useState([]);
  const [filteredPlaceName, setFilteredPlaceName] = useState('');

  useEffect(() => {
    const fetchCommentsData = () => {
      const commentsRef = databaseRef(db, 'comments');
      onValue(commentsRef, (snapshot) => {
        const commentsData = snapshot.val();
        if (commentsData) {
          const commentsArray = Object.values(commentsData);
          setPlaceComments(commentsArray);
        }
      });
    };

    fetchCommentsData();

    return () => {
      const commentsRef = databaseRef(db, 'comments');
      onValue(commentsRef, null);
    };
  }, []);

  const handleFilter = (event) => {
    setFilteredPlaceName(event.target.value);
  };

  const filteredComments = placeComments.filter(
    (comment) =>
      comment.placeName.toLowerCase().includes(filteredPlaceName.toLowerCase())
  );

  return (
    <div className="m-auto items-center text-center">
      <h1 className="justify-center mt-10 mb-10 font-bold text-3xl">Comments List</h1>
      <div className="m-4">
        <input
          type="text"
          placeholder="Filter by place name..."
          value={filteredPlaceName}
          onChange={handleFilter}
          className="p-2 border rounded"
        />
      </div>
      <table className="w-full m-auto bg-slate-50 bg-h-200 rounded-xl">
        <thead className="">
          <tr className="bg-orange-500">
            <th className="w-auto h-12 text-white">PlaceName</th>
            <th className="w-auto h-12 text-white">Comments</th>
            <th className="w-auto h-12 text-white">StarReview</th>
            <th className="w-auto h-12 text-white">Time</th>
            <th className="w-auto h-12 text-white">Username</th>
            <th className="w-auto h-12 text-white">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredComments.map((comment) => (
            <tr key={comment.cid}>
              <td>{comment.placeName}</td>
              <td>{comment.description}</td>
              <td>{comment.starReview}</td>
              <td>{comment.timestamp}</td>
              <td>{comment.username}</td>
              <td>
                <div className=" mt-5 pad-2">
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
