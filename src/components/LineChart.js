import React, {useState, useEffect} from 'react';
import Chart from 'chart.js/auto';
import { Line } from "react-chartjs-2";
import { auth } from "../components/firebase.js";
import { db } from "../components/firebase.js";
import { query, collection, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const LineChart = (props) => {
	const emptyData = {
		labels: [],
		datasets: [
			{
				label: "Weight (kgs)",
				backgroundColor: "rgb(255, 99, 132)",
				borderColor: "rgb(255, 99, 132)",
				data: [],
			},
		],
	};
	
	const [data, setData] = useState(emptyData);

	useEffect(() => {
		onAuthStateChanged(auth, async (user) => {
			if (user) {
				const q = query(collection(db, "users", user.uid, "dates"));
				const snapshot = await getDocs(q);

				let fb_dates   = [];
				let fb_weights = [];	
			
				snapshot.forEach((rec) => {
					fb_dates.push(rec.id);
					fb_weights.push(rec.data().weight);
				});	

				const newData = {
					labels: fb_dates,
					datasets: [
						{
							label: "Weight (kgs)",
							backgroundColor: "rgb(255, 99, 132)",
							borderColor: "rgb(255, 99, 132)",
							data: fb_weights,
						},
					],
				};
			
				setData(newData);
			}
		});
	}, []);

    return (
    	<div>
      		<Line data={data} />
    	</div>
  	);
};

export default LineChart;