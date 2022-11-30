import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { db, getExercise} from '../components/firebase.js';
import {collection, getDocs, addDoc, updateDoc, doc, deleteDoc} from "firebase/firestore";
import { useEffect, useState } from 'react';
import FitnessCenterTwoToneIcon from '@mui/icons-material/FitnessCenterTwoTone';

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  maxWidth: 400,
  color: theme.palette.text.primary,
}));

const message = "Truncation should be conditionally applicable on this long line of text";



export default function ActivityList(props) {
    const date = props.date
    const [activity, setActivity] = useState("")
    useEffect(() => {
        const getData = async () => {
            const data = await getExercise(date);
            setActivity(data);
        };
        getData();
    },[])
    console.log(activity);
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
            <Avatar>W</Avatar>
          </Grid>
          <Grid item xs>
            <Typography>{message}</Typography>
          </Grid>
        </Grid>
      </StyledPaper>
    </Box>
  );
}

    {/*
  <Box sx={{ flexGrow: 1, overflow: 'hidden', px: 3 }}>
    {activity.forEach((i) => {
        <StyledPaper sx={{my: 1, mx: 'auto', p:2,}}
        >
            <Grid container wrap="nowrap" spacing={2}>
                <Grid item>
                    <FitnessCenterTwoToneIcon></FitnessCenterTwoToneIcon>
                </Grid>
                <Grid item>
                    <p>{i.data().name}</p>
                    {displaySets}
                </Grid>
            </Grid>
        </StyledPaper>
    })}
    </Box>
*/}