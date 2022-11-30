import React, {useState, useEffect} from 'react';
import '../App.css';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import LineChart from '../components/LineChart.jsx';
import ProfileInfo from '../components/ProfileInfo.jsx';
import {db} from '../components/Firebase/firebase.js';
import {
	query,
	collection,
	where,
	getDocs
  } from "firebase/firestore";
import {auth} from '../components/firebase.js';


async function getUser() {
	const user = auth.currentUser;
	console.log("auth is: ");
	console.log(auth);
	const usersRef = collection(db, "users");
	const q = query(usersRef, where("uid", "==", auth.currentUser.uid));
	const querySnapshot = await getDocs(q);
	querySnapshot.forEach((doc) => {
  		console.log(doc.id, " => ", doc.data());
	});
/*	
	let dates = [];
	let weights = [];
	const q2 = query(collection(db, "users", user.uid, "dates"));
	const querySnapshot2 = getDocs(q2);
	querySnapshot2.forEach((doc) => {
   		const date = doc.id;
   		dates.push(date);
   		const weight = doc.data().weight;
   		weights.push(weight);
	});
	console.log('dates: ', dates);
	console.log('weights: ', weights); 
	return ({"dates": dates,
         	 "weights": weights,
        	}); 
*/
}

const Profile = () => {
	//getUser();
	const [weights, setWeights] = useState([]);
	useEffect(() => {
	    const user = auth.currentUser;
		console.log(user)
		const q = query(collection(db, "users", user.uid, "dates"));
		const snapshot = getDocs(q);
		let dates = [];
		let wghts = [];
		snapshot.forEach((rec) => {
			dates.push(rec.id);
			wghts.push(rec.data().weight);
		});
		
		const values = {"dates": dates,
		                "weights": wghts,
					   };
		setWeights(values);
	}, []);

	console.log("plotdata: " + weights);
	console.log("dates: " + weights.dates);
	console.log("weights: " + weights.weights);

	return (<>
				<Box padding={5}>
					<ProfileInfo />
				</Box>
				<Container>
					<Box paddingY={1}
						 sx = {{
								width: 700,
								height: 400
							  }}
					>
						<LineChart />
					</Box>
				</Container>
			</>);
}
export default Profile;
