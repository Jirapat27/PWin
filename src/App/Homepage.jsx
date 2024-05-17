
import React from "react";

import PieChartProblem from "../Component/PieChartProblem";
import PieChartComments from "../Component/PieChartComments";
import { CardWin } from "../Component/CardWin";
import { CardUser } from "../Component/CardUser";
// import { CardComment } from "../Component/CardComment";
import { CardReport } from "../Component/CardReport";

function Homepage() {
  return (
    <div className=" items-center m-auto mt-5 ">

      <div className="flex justify-center  ">

        <CardWin/>
        <CardUser/>
        {/* <CardComment/> */}
        <CardReport/>
      </div>
      <div className="flex justify-center p-2 space-x-5  ">
      <PieChartProblem />
      <PieChartComments />
      </div>

    </div>
  );
}


export default Homepage;