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

async function getUser() {
	const usersRef = collection(db, "users");
	const q = query(usersRef, where("email", "==", "eggman@cs35l.edu"));
	const querySnapshot = await getDocs(q);
	querySnapshot.forEach((doc) => {
  		console.log(doc.id, " => ", doc.data());
	});
}

function Profile() {
	getUser();
	return (<>
				<Box padding={5}>
					<ProfileInfo />
				</Box>
				<Container>
					<Box paddingY={1}
						 sx = {{
								width: 600,
								height: 400
							  }}
					>
						<LineChart />
					</Box>
				</Container>
			</>);
}

export default Profile;
