import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ProfilePic from '../pages/StickProfile.webp';

function ProfileInfo(){
	return(
		<Grid container spacing={10}>
            <Grid item xs={2}>
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
						<center><font size="6"><b>John Doe</b></font></center>
						<br></br>
						<center>example@example.com</center>
					</Typography>
				</Paper>
			</Grid>
		</Grid>
	);
}

export default ProfileInfo;