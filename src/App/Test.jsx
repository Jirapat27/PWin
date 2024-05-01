import React from "react";

import ChartWin from "../Component/ChartWin";
import ChartUser from "../Component/ChartUser";

import PieChartProblem from "../Component/PieChartProblem";
import PieChartComments from "../Component/PieChartComments";

function Test() {
  return (
    <div className=" items-center">
      '
      <div className="flex justify-center  p-5  ">
        <ChartWin />

        <ChartUser className=" " />
      </div>
      <div className="flex justify-center     ">
      <PieChartProblem />
      <PieChartComments />
      </div>

    </div>
  );
}

export default Test;
