import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

function ProfileInfo(){
	return(
		<Grid container spacing={10}>
			<Grid item xs={5}>
				<Paper elevation={10}>
					<Typography variant="p" component="p">
						<center><font size="6"><b>John Doe</b></font></center>
						<br></br>
						<p><b>Email: </b>example@example.com</p>
						<p><b>Bio: </b>Example Bio</p>
					</Typography>
				</Paper>
			</Grid>
		</Grid>
	);
}

export default ProfileInfo;