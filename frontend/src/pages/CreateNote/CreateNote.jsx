import React, {useState} from "react";
import axios from "axios";
import Message from "../../utils/Message";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {Container} from "@mui/material";

const theme = createTheme();

export default function CreateNote() {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [errors, setErrors] = useState({});

    const submit = async (event) => {
        event.preventDefault();

        if(validate()){
            setTitle(event.target.value);
            setDesc(event.target.value);

            const newNote = {title: title,desc: desc};

            await axios.post(`http://localhost:4040/note`,newNote).then((response)=>{
                Message(`${response.data}`,"success",5000,"top-center");
                console.log(response);
            }).catch((error)=>{
                Message(`${error.response.data}`,"error",5000,"top-center");
            })
        }
    };

    const validate = ()=>{
        let temp = {};
        temp.title = !title ? "This field is required" : "";
        temp.desc = !desc ? "This field is required" : "";
        setErrors({
            ...temp
        })

        return Object.values(temp).every(x => x==="");
    }

    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth='lg'>
            <Paper sx={{ p: 10,mx:25,my:5, display: 'flex', flexDirection: 'column',maxWidth:950, alignContent:'center'}}>
                <Typography variant="h5" gutterBottom>
                    Create Note
                </Typography>
                <Box component="form" noValidate onSubmit={submit} >
                    <Grid container spacing={3}>
                        <Grid item xs={12} >
                            <TextField
                                onChange={(event)=>{setTitle(event.target.value)}}
                                value={title}
                                error={errors.title}
                                helperText={errors.title ? errors.title : ""}
                                required
                                id="title"
                                name="title"
                                label="Title"
                                fullWidth
                                autoComplete="given-name"
                                variant="standard"
                            />
                        </Grid>
                        <Grid item xs={12} >
                            <TextField
                                onChange={(event)=>{setDesc(event.target.value)}}
                                value={desc}
                                error={errors.desc}
                                helperText={errors.desc ? errors.desc : ""}
                                required
                                multiline={true}
                                id="desc"
                                name="desc"
                                label="Notes"
                                fullWidth
                                autoComplete="family-name"
                                variant="standard"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Box textAlign={"center"}>
                                <Button
                                    type="submit"
                                    size={"medium"}
                                    style={{width:"40%"}}
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                   Create Note
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
            </Container>
        </ThemeProvider>
    )
}