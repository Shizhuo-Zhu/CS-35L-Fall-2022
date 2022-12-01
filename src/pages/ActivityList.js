import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { db, auth, getExercise, DeleteExercise} from '../components/firebase.js';
import {collection, getDocs, addDoc, updateDoc, doc, deleteDoc} from "firebase/firestore";
import { useEffect, useState } from 'react';
import FitnessCenterTwoToneIcon from '@mui/icons-material/FitnessCenterTwoTone';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import TodayTwoToneIcon from '@mui/icons-material/TodayTwoTone';
import LabelImportantTwoToneIcon from '@mui/icons-material/LabelImportantTwoTone';
import { onAuthStateChanged } from 'firebase/auth';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import IconButton from '@mui/material/IconButton';
import { Icon } from '@mui/material';
const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  maxWidth: 500,
  color: theme.palette.text.primary,
}));

const handleDelete = (date, id) => {
    console.log(id);
    DeleteExercise(date, id);
}

const Test = (props) => {
    const activities = props.activities;
    const ids = props.ids;
    const date = props.date;
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
                <IconButton onClick={() => {handleDelete(date, ids[i])}}>
                    <DeleteTwoToneIcon></DeleteTwoToneIcon>
                </IconButton>
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
    const [exerciseIDs, setIDs] = useState([]);
    const [rerender, setRerender] = useState(0);
    useEffect(() => {
        let exercises = [];
        let ids = [];
        onAuthStateChanged(auth, async (user) => {
            if (user) {
              const docs = await getDocs(collection(db, "users", user.uid, "dates", date, "exercises"));
              docs.forEach((doc) => {
                exercises.push(doc.data());
                ids.push(doc.id);
              });
              setActivity(exercises);
              setIDs(ids)
              //setRerender(rerender + 1);
            }
          });
      }, [date, rerender]);
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
            <Grid item xs>
                <h2>{date}</h2>
            </Grid>
            </Grid>
            <Test activities={activities} ids={exerciseIDs} date={date}></Test>
        </StyledPaper>
    </Box>
    );
}



export default ActivityList
