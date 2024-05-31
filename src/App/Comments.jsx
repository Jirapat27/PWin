import React, { useState, useEffect } from 'react';
import { databaseRef, db, onValue, off } from "../Config";
import { TrashIcon } from "@heroicons/react/24/solid";
import { Card } from "@material-tailwind/react";

const Comments = () => {
  const [placeComments, setPlaceComments] = useState([]);
  const [filteredPlaceName, setFilteredPlaceName] = useState('');

  useEffect(() => {
    const commentsRef = databaseRef(db, 'comments');

    const fetchCommentsData = () => {
      onValue(commentsRef, (snapshot) => {
        const commentsData = snapshot.val();
        if (commentsData) {
          const commentsArray = Object.values(commentsData);
          setPlaceComments(commentsArray);
        } else {
          setPlaceComments([]);
        }
      });
    };

    fetchCommentsData();

    return () => {
      off(commentsRef); // Stop listening to changes
    };
  }, []);

  const handleFilter = (event) => {
    setFilteredPlaceName(event.target.value);
  };

  const filteredComments = placeComments.filter(
    (comment) =>
      comment.placeName.toLowerCase().includes(filteredPlaceName.toLowerCase())
  );

  // Sort comments by timestamp in descending order
  const sortedComments = [...filteredComments].sort((a, b) => b.timestamp - a.timestamp);

  return (
    <div className="items-center text-center p-20 ml-180 mb-5">
      <div className="mb-4 flex justify-end">
        <input
          type="text"
          placeholder="Filter by place name"
          value={filteredPlaceName}
          onChange={handleFilter}
          className="flex-auto p-2 border rounded"
        />
      </div>
      <Card className="h-full w-full overflow-scroll">
        <table className="w-full min-w-max table-auto text-center">
          <thead>
            <tr className="p-4 bg-slate-100">
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">PlaceName</th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">Comments</th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">StarReview</th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">Time</th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">Username</th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedComments.map((comment) => (
              <tr key={comment.cid}>
                <td className="p-4">{comment.placeName}</td>
                <td className="p-4">{comment.description}</td>
                <td className="p-4">{comment.starReview}</td>
                <td className="p-4">{new Date(comment.timestamp).toLocaleString()}</td>
                <td className="p-4">{comment.username}</td>
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

export default Comments;
