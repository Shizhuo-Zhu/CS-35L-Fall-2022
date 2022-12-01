import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { db, auth, getExercise} from '../components/firebase.js';
import {collection, getDocs, addDoc, updateDoc, doc, deleteDoc, getDoc} from "firebase/firestore";
import { useEffect, useState } from 'react';
import FitnessCenterTwoToneIcon from '@mui/icons-material/FitnessCenterTwoTone';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import TodayTwoToneIcon from '@mui/icons-material/TodayTwoTone';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import MonitorWeightIcon from '@mui/icons-material/MonitorWeight';
import { onAuthStateChanged } from 'firebase/auth';

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  maxWidth: 500,
  color: theme.palette.text.primary,
}));

const BlueAvatar = styled(Avatar)`
  background-color: #1976d2;
`;

const Test = (props) => {
    const activities = props.activities;
    let testArray = [];
    for (let i = 0; i < activities.length; i++) {
        if(activities[i]){
            testArray.push(
                <Grid container wrap="nowrap" spacing={2}>
                <Grid item>
                    <BlueAvatar><FitnessCenterIcon></FitnessCenterIcon></BlueAvatar>
                </Grid>
                <Grid item xs>
                    <h4>{activities[i].exercise.name}</h4>
                </Grid>
                </Grid>
            )
            for (let j = 0; j < activities[i].exercise.reps.length; j++) {
                testArray.push(
                    <Grid container wrap="nowrap" spacing={2}>
                    <Grid item>
                        <ArrowRightIcon fontSize="small"></ArrowRightIcon>
                    </Grid>
                    <Grid item xs>
                        <p><b>Set {j + 1}</b>: {activities[i].exercise.weights[j]} lbs for {activities[i].exercise.reps[j]} repetitions</p>
                    </Grid>
                    </Grid>
                )
            }
        }
    }
    return(
        <div>
            {testArray}
        </div>
    );
}
const ActivityList = (props) => {
    const date = props.date;
    const [activities, setActivity] = useState([]);
    const [weight, setWeight] = useState('');
    //const activities = props.data;
    useEffect(() => {
        let exercises = [];
        onAuthStateChanged(auth, async (user) => {
            if (user) {
              const docs = await getDocs(collection(db, "users", user.uid, "dates", date, "exercises"));
              const docSnap = await getDoc(doc(db, "users", user.uid, "dates", date));
              let bodyweight = docSnap.data().weight;
              console.log(bodyweight);
              docs.forEach((doc) => {
                exercises.push(doc.data());
              });
              setActivity(exercises);
              setWeight(bodyweight);
              //console.log(exercises);
            }
          });
      }, [date]);
    return (
    <Box sx={{ flexGrow: 1, overflow: 'hidden', px: 3 }}>
        <StyledPaper
            sx={{
            my: 1,
            mx: 'auto',
            p: 2,
            }}
        >
            <Grid container wrap="nowrap" spacing={2}>
            <Grid item><BlueAvatar size="small"><TodayTwoToneIcon></TodayTwoToneIcon></BlueAvatar></Grid>
            <Grid item xs><h2>{date}</h2></Grid>
            </Grid>
            <Grid container wrap="nowrap" spacing={2}>
            <Grid item><BlueAvatar size="small"><MonitorWeightIcon></MonitorWeightIcon></BlueAvatar></Grid>
            <Grid item xs><h3>{weight} lbs</h3></Grid>
            </Grid>
            <Test activities={activities}></Test>
        </StyledPaper>
    </Box>
    );
}



export default ActivityList