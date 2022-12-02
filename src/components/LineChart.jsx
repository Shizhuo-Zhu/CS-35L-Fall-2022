import React, {useState, useEffect} from 'react';
import { Line } from "react-chartjs-2";
import { auth } from "../components/firebase.js";
import { db } from "../components/Firebase/firebase.js";
import { query, collection, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { MonthView } from 'react-calendar';
import Chart from 'chart.js/auto';

function monthNum(month){
	switch(month){
		case 'Jan':
			return '01';
		case 'Feb':
			return '02';
		case 'Mar':
			return '03';
		case 'Apr':
			return '04';
		case 'May':
			return '05';
		case 'Jun':
			return '06';
		case 'Jul':
			return '07';
		case 'Aug':
			return '08';
		case 'Sep':
			return '09';
		case 'Oct':
			return '10';
		case 'Nov':
			return '11';
		default:
			return '12';
	}
}

function dateToNum(date)
{
	return Number(date.substring(11,15) + monthNum(date.substring(4,7)) + date.substring(8,10));
}

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
	
				
				let fb_dates_num = [];
				snapshot.forEach((rec) => {
					fb_dates_num.push(dateToNum(rec.id));
				});

				fb_dates_num.sort();

				let fb_dates = [];
				for (let o = 0; o < fb_dates_num.length; o++)
				{
					fb_dates.push("c");
				}
				
				let fb_weights = [];
				for (let q = 0; q < fb_dates_num.length; q++)
				{
					fb_weights.push(0);
				}

				

				snapshot.forEach((rec) => {

					let index = 0;
					for (let c = 0; c < fb_dates_num.length; c++)
					{
						if(dateToNum(rec.id) == fb_dates_num[c])
						{
							index = c;
							break;
						}
					}
					
					fb_dates[index] = rec.id;
					fb_weights[index] = rec.data().weight;

				});	

				console.log("Final Length of Dates Array: ", fb_dates.length);
				for(let x = 0; x < fb_dates.length; x++)
				{
					console.log(fb_dates[x]);
				}

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
				console.log ("Data Added");
			
				setData(newData);
				console.log ("Data Set");
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