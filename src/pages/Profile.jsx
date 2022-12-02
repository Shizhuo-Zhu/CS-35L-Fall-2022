import '../App.css';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import LineChart from '../components/LineChart.jsx';
import ProfileInfo from '../components/ProfileInfo.jsx';
import Navbar from "../components/Navbar";
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import ProfilePic from '../pages/StickProfile.webp';
import { NavLink } from "react-router-dom";

function Profile() {
	return (<div>
				<Navbar/>
				<Box
					component="main"
					sx={{
						backgroundColor: (theme) =>
							theme.palette.mode === 'light'
							? theme.palette.grey[100]
							: theme.palette.grey[900],
						flexGrow: 1,
						height: '100vh',
						overflow: 'auto',
						}}
					>
						
						<Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
						<Grid container spacing={3}>
						<Grid item xs={4}>
								<Paper
								sx={{
									p: 2,
									display: 'flex',
									flexDirection: 'column',
									height: 240,
								}}
								>
									{/* Profile Picture */}
									<center><img src={ProfilePic} alt="Profile" width="220" height="220"/></center>
									<NavLink><center>Upload Picture</center></NavLink>
								</Paper>
							</Grid>

							{/* Profile Name and Info */}
							<Grid item xs={8}>
								<Paper
								sx={{
									p: 2,
									display: 'flex',
									flexDirection: 'column',
									height: 240,
									alignItems: "center",
									textAlign: "center",
								}}
								>
								<center><ProfileInfo /></center>
								</Paper>
							</Grid>
							
							{/* Chart of Weight */}
							<Grid item xs={12}>
								<Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
									<LineChart />
								</Paper>
							</Grid>
						</Grid>

						</Container>
				</Box>
			</div>);
}

export default Profile;






