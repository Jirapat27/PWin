
import React from "react";

import ChartWin from "../Component/ChartWin";
import ChartUser from "../Component/ChartUser";

import PieChartProblem from "../Component/PieChartProblem";
import PieChartComments from "../Component/PieChartComments";

function Homepage() {
  return (
    <div className=" items-center m-auto ">

      <div className="flex justify-center p-2 space-x-20  ">
        <ChartWin />

        <ChartUser className=" " />
      </div>
      <div className="flex justify-center p-2 space-x-20  ">
      <PieChartProblem />
      <PieChartComments />
      </div>

    </div>
  );
}



// function Homepage() {
//   const [markWinData, setMarkWinData] = useState(null);
//   const [usersData, setUsersData] = useState(null);
//   const [commentsData, setCommentsData] = useState(null);

//   useEffect(() => {
//     const fetchMarkWinData = async () => {
//       const markWinRef = databaseRef(db, 'MarkWin');
//       if (markWinRef) {
//         onValue(markWinRef, (snapshot) => {
//           const dataSnapshot = snapshot.val();
//           if (dataSnapshot) {
//             setMarkWinData(dataSnapshot);
//           }
//         });
//       }
//     };
  
//     const fetchUsersData = async () => {
//       const usersRef = databaseRef(db, 'users');
//       if (usersRef) {
//         onValue(usersRef, (snapshot) => {
//           const dataSnapshot = snapshot.val();
//           if (dataSnapshot) {
//             setUsersData(dataSnapshot);
//           }
//         });
//       }
//     };
  
//     const fetchCommentsData = async () => {
//       const commentsRef = databaseRef(db, 'comments');
//       if (commentsRef) {
//         onValue(commentsRef, (snapshot) => {
//           const dataSnapshot = snapshot.val();
//           if (dataSnapshot) {
//             setCommentsData(dataSnapshot);
//           }
//         });
//       }
//     };
  
//     fetchMarkWinData();
//     fetchUsersData();
//     fetchCommentsData();

//     return () => {
//       const markWinRef = databaseRef(db, 'MarkWin');
//       onValue(markWinRef, null);

//       const usersRef = databaseRef(db, 'users');
//       onValue(usersRef, null);

//       const commentsRef = databaseRef(db, 'comments');
//       onValue(commentsRef, null);
//     };
//   }, []);

//   return (
//     <div className='homepageContainer'>
//       <div className='headerText'>
//         <p>Homepage</p>
//         <div className="dataBoxContainer">
//           {markWinData && (
//             <Link to="/markwin" className="dataBox">
//               <h2>MarkWin</h2>
//               <div>
//                 {Object.values(markWinData).map((data, index) => (
//                   <div key={index}>
//                     <h3>{data.name}</h3>
//                     <img src={data.images[0]} alt="MarkWin" />
//                   </div>
//                 ))}
//               </div>
//             </Link>
//           )}
//           {usersData && (
//             <Link to="/user" className="dataBox">
//               <h2>Users</h2>
//               <div>
//                 {Object.values(usersData).map((user, index) => (
//                   <div key={index}>
//                     <h3>{user.username}</h3>
//                     <img src={user.profilePic} alt="Profile" />
//                   </div>
//                 ))}
//               </div>
//             </Link>
//           )}
//           {commentsData && (
//             <Link to="/comment" className="dataBox">
//               <h2>Comments</h2>
//               <pre>{JSON.stringify(commentsData, null, 2)}</pre>
//             </Link>
//           )}
//         </div>
//       </div>
//       <SignOut />
//     </div>
//   );
// }

export default Homepage;