
import React, { useState, useEffect } from 'react';
import '../CSS/Homepage.css';
import { db, onValue, databaseRef } from '../Config'; // Assuming firebaseConfig.js is in the same directory

function Homepage() {
  const [markWinData, setMarkWinData] = useState(null);
  const [usersData, setUsersData] = useState(null);
  const [commentsData, setCommentsData] = useState(null);

  useEffect(() => {
    const fetchMarkWinData = async () => {
      const markWinRef = databaseRef(db, 'MarkWin');
      onValue(markWinRef, (snapshot) => {
        const dataSnapshot = snapshot.val();
        setMarkWinData(dataSnapshot);
      });
    };

    const fetchUsersData = async () => {
      const usersRef = databaseRef(db, 'users');
      onValue(usersRef, (snapshot) => {
        const dataSnapshot = snapshot.val();
        setUsersData(dataSnapshot);
      });
    };

    const fetchCommentsData = async () => {
      const commentsRef = databaseRef(db, 'comments');
      onValue(commentsRef, (snapshot) => {
        const dataSnapshot = snapshot.val();
        setCommentsData(dataSnapshot);
      });
    };

    fetchMarkWinData();
    fetchUsersData();
    fetchCommentsData();

    return () => {
      const markWinRef = databaseRef(db, 'MarkWin');
      onValue(markWinRef, null);

      const usersRef = databaseRef(db, 'users');
      onValue(usersRef, null);

      const commentsRef = databaseRef(db, 'comments');
      onValue(commentsRef, null);
    };
  }, []);

  return (

    <div className='headerText'>
      <p>Homepage</p>
      <div className="dataBoxContainer"> {/* Container for the data boxes */}
        {markWinData && (
          <div className="dataBox"> {/* Apply the "dataBox" class here */}
            <h2>MarkWin</h2>
            <pre>{JSON.stringify(markWinData, null, 2)}</pre>
          </div>
        )}
        {usersData && (
          <div className="dataBox"> {/* Apply the "dataBox" class here */}
            <h2>Users</h2>
            <pre>{JSON.stringify(usersData, null, 2)}</pre>
          </div>
        )}
        {commentsData && (
          <div className="dataBox"> {/* Apply the "dataBox" class here */}
            <h2>Comments</h2>
            <pre>{JSON.stringify(commentsData, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default Homepage;
