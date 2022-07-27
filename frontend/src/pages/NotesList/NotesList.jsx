import React,{useState} from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
// import Header from './Header';
// import MainFeaturedPost from './MainFeaturedPost';
import NoteCard from './NoteCard';
import axios from "axios";


const theme = createTheme();

export default function NotesList() {
    const [notes , setNotes]= useState([]);
    const getData = () => {
        axios.get(`http://localhost:4040/note/`).then(res => {
            setNotes(res.data);
            //console.log(res.data);
        })
    }
    React.useEffect(() => {
        getData()
    }, [])

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Container maxWidth="lg">
                <h2 align={'center'}>Student Notes</h2>
                <main>
                    <Grid container spacing={4}>
                        {notes.map((note) => (
                            <NoteCard key={note.title} note={note}/>
                        ))}
                    </Grid>
                </main>
            </Container>
        </ThemeProvider>
    );
}