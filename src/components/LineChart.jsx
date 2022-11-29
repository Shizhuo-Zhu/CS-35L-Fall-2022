import React from "react";
import Chart from 'chart.js/auto';
import { Line } from "react-chartjs-2";

const LineChart = ({person}) => {
	let data = {
		labels: ["01/01/2022", "01/02/2022", "01/03/2022"],
		datasets: [
			{
				label: "Weight (kgs)",
				backgroundColor: "rgb(255, 99, 132)",
				borderColor: "rgb(255, 99, 132)",
				data: [55, 84, 99],
			},
		],
	};
  return (
    <div>
      <Line data={data} />
    </div>
  );
};

export default LineChart;