import '../App.css';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import LineChart from '../components/LineChart.jsx';
import ProfileInfo from '../components/ProfileInfo.jsx';
import Navbar from '../components/Navbar';
import { useEffect, useState } from "react";
import { useAuth, upload } from "../components/firebase.js";


function Profile() {

	const currentUser = useAuth();
	const [photo, setPhoto] = useState(null);
	const [loading, setLoading] = useState(false);
	const [photoURL, setPhotoURL] = useState("https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png");

	function handleChange(e) {
		if (e.target.files[0]) {
		  setPhoto(e.target.files[0])
		}
	}

	function handleClick() {
		upload(photo, currentUser, setLoading);
	}

	useEffect(() => {
		if (currentUser?.photoURL) {
		  setPhotoURL(currentUser.photoURL);
		}
	  }, [currentUser])
	  

	return (<>
				<Navbar/>
				<div className="fields">
      				<input type="file" onChange={handleChange} />
      				<button disabled={loading || !photo} onClick={handleClick}>Upload</button>
      				<img src={photoURL} alt="Avatar" className="avatar" />
    			</div>
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