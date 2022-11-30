import React, {useState, useEffect} from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ProfilePic from '../pages/StickProfile.webp';
import { auth } from "../components/firebase.js";
import { db } from "../components/Firebase/firebase.js";
import { query, collection, getDocs, where } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

function ProfileInfo(){
	
	const defaultData = {"name": "John Doe",
	                     "email": "johndoe@somecompany.com",
						};

	const [data, setData] = useState(defaultData);
	useEffect(() => {
		onAuthStateChanged(auth, async (user) => {
			if (user) {
				let info = {};
				const usersRef = collection(db, "users");
				const q = query(usersRef, where("uid", "==", user.uid));

				const querySnapshot = await getDocs(q);
				querySnapshot.forEach((doc) => {
					console.log(doc.id, " => ", doc.data());
					info = doc.data();
				});

				setData(info);
			}
		});
		}, []);	
	
	return(
		<Grid container spacing={10}>
            <Grid item xs={3}>
				<Paper elevation={10}>
					<center><img src={ProfilePic} alt="Profile" width="190" height="190"/></center>
				</Paper>
			</Grid>
			<Grid item xs={5}>
				<Paper 
				 elevation={10}
				 style={{ margin: "0px 0px 8px 0px" }}
				 >
					<Typography variant="p" component="p">
						<center><font size="6"><b>{data.name}</b></font></center>
						<br></br>
						<center>{data.email}</center>
					</Typography>
				</Paper>
			</Grid>
		</Grid>
	);
}

export default ProfileInfo;