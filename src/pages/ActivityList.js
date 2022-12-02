import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import {collection, getDocs, doc, getDoc} from "firebase/firestore";
import { db, auth, DeleteExercise} from '../components/firebase.js';
import { useEffect, useState } from 'react';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import TodayTwoToneIcon from '@mui/icons-material/TodayTwoTone';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import MonitorWeightIcon from '@mui/icons-material/MonitorWeight';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import IconButton from '@mui/material/IconButton';
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

const handleDelete = (date, id) => {
    DeleteExercise(date, id);
}

const ShowNotes = (props) => {
    const notes = props.notes;
    if (notes !== '') {
        return (
            <p><u>Notes</u>: {notes}</p>
        )
    }
    else {
        return (<div></div>)
    }
}

const Test = (props) => {
    const activities = props.activities;
    const ids = props.ids;
    const date = props.date;
    const renderCount = props.renderCount;
    const setRenderCount = props.setRenderCount;
    let testArray = [];
    for (let i = 0; i < activities.length; i++) {
        if(activities[i]){
            testArray.push(
                    <Grid container direction="row" alignItems="center" spacing={2}>
                    <Grid item>
                    <BlueAvatar><FitnessCenterIcon></FitnessCenterIcon></BlueAvatar>
                </Grid>
                <Grid item xs>
                    <h3>{activities[i].exercise.name}</h3>
                </Grid>
                <IconButton onClick={() => {handleDelete(date, ids[i]); 
                    setRenderCount(renderCount + 1)}}>
                    <DeleteTwoToneIcon></DeleteTwoToneIcon>
                </IconButton>
                </Grid>
            )
            for (let j = 0; j < activities[i].exercise.reps.length; j++) {
                testArray.push(
                    <Grid container direction="row" alignItems="center" spacing={2}>
                    <Grid item>
                        <ArrowRightIcon fontSize="small"></ArrowRightIcon>
                    </Grid>
                    <Grid item xs>
                        <p><b>Set {j + 1}</b>: {activities[i].exercise.weights[j]} lbs for {activities[i].exercise.reps[j]} repetitions</p>
                        <ShowNotes notes = {activities[i].exercise.notes[j]}/>
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
const ShowBodyweight = (props) => {
    const bodyweight = props.bodyweight;
    if (bodyweight === '') return (<div></div>);
    else {
        return (
            <Grid container direction="row" alignItems="center" spacing={2}>
            <Grid item><BlueAvatar size="small"><MonitorWeightIcon></MonitorWeightIcon></BlueAvatar></Grid>
            <Grid item xs><h3>{bodyweight} lbs</h3></Grid>
            </Grid>
        )
    }
 }

const ActivityList = (props) => {
    const date = props.date;
    const renderCount = props.renderCount;
    const setRenderCount = props.setRenderCount;
    const [activities, setActivity] = useState([]);
    const [bodyweight, setBodyweight] = useState('');
    const [exerciseIDs, setIDs] = useState([]);
    useEffect(() => {
        let exercises = [];
        let ids = [];
        onAuthStateChanged(auth, async (user) => {
            if (user) {
              try {
                const docs = await getDocs(collection(db, "users", user.uid, "dates", date, "exercises"));
                const docSnap = await getDoc(doc(db, "users", user.uid, "dates", date));
                if (docSnap.exists() && docSnap.data().weight !== undefined) {
                    let bodyweight = docSnap.data().weight;
                    setBodyweight(bodyweight);
                }
                else {
                    setBodyweight('');
                }
                docs.forEach((doc) => {
                  exercises.push(doc.data());
                  ids.push(doc.id);
                });
              } catch (err) {               
              }
              setActivity(exercises);
              setIDs(ids)
            }         
          });
      }, [date, renderCount]);
    return (
    <Box sx={{ flexGrow: 1, overflow: 'hidden', px: 3 }}>
        <StyledPaper
            sx={{
            my: 1,
            mx: 'auto',
            p: 2,
            }}
        >
            <Grid container direction="row" alignItems="center" spacing={2}>
            <Grid item><BlueAvatar size="small"><TodayTwoToneIcon></TodayTwoToneIcon></BlueAvatar></Grid>
            <Grid item xs><h2>{date}</h2></Grid>
            </Grid>
            <ShowBodyweight bodyweight={bodyweight}/>
            <Test activities={activities} ids={exerciseIDs} date={date} renderCount={renderCount} 
                setRenderCount={setRenderCount}></Test>
        </StyledPaper>
    </Box>
    );
}

export default ActivityList;