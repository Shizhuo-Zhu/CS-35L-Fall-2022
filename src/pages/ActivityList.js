import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { db, auth, getExercise} from '../components/firebase.js';
import {collection, getDocs, addDoc, updateDoc, doc, deleteDoc} from "firebase/firestore";
import { useEffect, useState } from 'react';
import FitnessCenterTwoToneIcon from '@mui/icons-material/FitnessCenterTwoTone';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import TodayTwoToneIcon from '@mui/icons-material/TodayTwoTone';
import LabelImportantTwoToneIcon from '@mui/icons-material/LabelImportantTwoTone';
import { onAuthStateChanged } from 'firebase/auth';
const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  maxWidth: 500,
  color: theme.palette.text.primary,
}));


const Test = (props) => {
    const activities = props.activities;
    console.log(activities[0])
    let testArray = [];
    for (let i = 0; i < activities.length; i++) {
        if(activities[i]){
            testArray.push(
                <Grid container wrap="nowrap" spacing={2}>
                <Grid item>
                    <Avatar><FitnessCenterIcon></FitnessCenterIcon></Avatar>
                </Grid>
                <Grid item xs>
                    <h3>{activities[i].exercise.name}</h3>
                </Grid>
                </Grid>
            )
            for (let j = 0; j < activities[i].exercise.reps.length; j++) {
                testArray.push(
                    <Grid container wrap="nowrap" spacing={2}>
                    <Grid item>
                        <LabelImportantTwoToneIcon fontSize="small"></LabelImportantTwoToneIcon>
                    </Grid>
                    <Grid item xs>
                        <p>Set {j + 1}: {activities[i].exercise.weights[j]} lbs for {activities[i].exercise.reps[j]} repetitions</p>
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
    //const activities = props.data;
    useEffect(() => {
        let exercises = [];
        onAuthStateChanged(auth, async (user) => {
            if (user) {
              const docs = await getDocs(collection(db, "users", user.uid, "dates", date, "exercises"));
              docs.forEach((doc) => {
                exercises.push(doc.data());
              });
              setActivity(exercises);
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
            <Grid item>
                <Avatar><TodayTwoToneIcon></TodayTwoToneIcon></Avatar>
            </Grid>
            <Grid item xs alignContent={'center'} alignItems='center'>
                <h2>{date}</h2>
            </Grid>
            </Grid>
            <Test activities={activities}></Test>
        </StyledPaper>
    </Box>
    );
}



export default ActivityList

    {/*
    <Box sx={{ flexGrow: 1, overflow: 'hidden', px: 3 }}>
        <StyledPaper sx={{my: 1, mx: 'auto', p:2,}}>
            <h3>{date}</h3>
            {activities.map((i) => {
                {console.log(i.exercise.name)}
                <div className="Activity" key={i.exercise.name}>
                    <h2>{i.exercise.name}</h2>
                </div>
            })}
        </StyledPaper>
    </Box>
        */}