import React, {useState} from "react";
import axios from "axios";
import Message from "../../utils/Message";

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import {createTheme, ThemeProvider} from '@mui/material/styles';

const theme = createTheme();

export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});

    const submit = async (event) => {
        event.preventDefault();

        if (validate()) {
            setEmail(event.target.value);
            setPassword(event.target.value);

            const newUser = {email, password};

            await axios.post(`http://localhost:4040/user/login`, newUser).then((response) => {
                Message("You are logged in", "success", 5000, "top-center");
                console.log(response)
                if (response.data.status === false) {
                    if (response.data.accountType === "admin") {
                        //Message(`${response.data}`, "success", 5000, "top-center");
                        window.location.assign("/admin")
                    } else {
                        //Message(`${response.data}`, "success", 5000, "top-center");
                        window.location.assign("/notes")
                    }
                } else {
                    Message("You are first time visiting", "success", 5000, "top-center");
                    window.location.assign("/aa")
                }
            }).catch((error) => {
                Message(`${error.response.data}`, "error", 5000, "top-center");
            })
        }
    };

    const validate = () => {
        let temp = {};
        temp.email = !email ? "This field is required" : "";
        temp.password = !password ? "This field is required" : "";
        setErrors({
            ...temp
        })
        return Object.values(temp).every(x => x === "");
    }

    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{height: '100vh'}}>
                <CssBaseline/>
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(https://source.unsplash.com/random)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                            <LockOutlinedIcon/>
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <Box component="form" noValidate onSubmit={submit} sx={{mt: 1}}>
                            <TextField
                                onChange={(event) => {
                                    setEmail(event.target.value)
                                }}
                                value={email}
                                error={errors.email}
                                helperText={errors.email ? errors.email : ""}
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                            />
                            <TextField
                                onChange={(event) => {
                                    setPassword(event.target.value)
                                }}
                                value={password}
                                error={errors.password}
                                helperText={errors.password ? errors.password : ""}
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary"/>}
                                label="Remember me"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{mt: 3, mb: 2}}
                            >
                                Sign In
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}