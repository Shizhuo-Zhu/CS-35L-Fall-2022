import '../App.css';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import LineChart from '../components/LineChart.jsx';
import ProfileInfo from '../components/ProfileInfo.jsx';

function Profile() {
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
