import React, {useState} from "react";
import axios from "axios";
import Message from "../../utils/Message";
import Button from '@mui/material/Button';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import {createTheme, ThemeProvider} from '@mui/material/styles';

const theme = createTheme();

export default function UpdateUser() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState('2014-08-18T21:11:54');
    const [mobile, setMobile] = useState("");
    const [password, setPassword] = useState("");
    const [repassword, setRePassword] = useState("");
    const [errors, setErrors] = useState({});

    const submit = async (event) => {
        event.preventDefault();

        if(validate()){
            setEmail(event.target.value);
            setPassword(event.target.value);

            const newUser = {firstName,lastName,dateOfBirth,mobile,password};

            await axios.post(`http://localhost:4040/user/login`,newUser).then((response)=>{
                Message("You are logged in","success",5000,"top-center");
                console.log(response)
                if(response.data.status===false){
                    if (response.data.accountType === "admin") {
                        Message("You are a admin", "success", 5000, "top-center");
                    } else {
                        Message("You are a student", "success", 5000, "top-center");
                    }
                }
                else{
                    Message("You are first time visiting", "success", 5000, "top-center");
                }
            }).catch((error)=>{
                Message(`${error.response.data}`,"error",5000,"top-center");
            })

        }
    };

    const validate = ()=>{
        let temp = {};
        temp.firstName = !firstName ? "This field is required" : "";
        temp.LastName = !lastName ? "This field is required" : "";
        temp.dateOfBirth = !dateOfBirth ? "This field is required" : "";
        temp.mobile = !mobile ? "This field is required" : mobile.length===10? "Mobile number is only have 10 numbers":"";
        temp.password = !password ? "This field is required" : "";
        temp.repassword = !repassword ? "This field is required" : password===repassword ? "Re-enter the password again":"";

        setErrors({
            ...temp
        })

        return Object.values(temp).every(x => x==="");
    }

    return (
        <ThemeProvider theme={theme}>
            <Paper sx={{ p: 10,mx:25,my:5, display: 'flex', flexDirection: 'column',maxWidth:950, alignContent:'center'}}>
                    <Typography variant="h6" gutterBottom>
                        Update Details
                    </Typography>
                <Box component="form" noValidate onSubmit={submit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                onChange={(event)=>{setFirstName(event.target.value)}}
                                value={firstName}
                                error={errors.firstName}
                                helperText={errors.firstName ? errors.firstName : ""}
                                required
                                id="firstName"
                                name="firstName"
                                label="First name"
                                fullWidth
                                autoComplete="given-name"
                                variant="standard"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                onChange={(event)=>{setLastName(event.target.value)}}
                                value={lastName}
                                error={errors.lastName}
                                helperText={errors.lastName ? errors.lastName : ""}
                                required
                                id="lastName"
                                name="lastName"
                                label="Last name"
                                fullWidth
                                autoComplete="family-name"
                                variant="standard"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                onChange={(event)=>{setEmail(event.target.value)}}
                                value={email}
                                disabled={true}
                                error={errors.email}
                                helperText={errors.email ? errors.email : ""}
                                required
                                id="address1"
                                name="address1"
                                label="Address line 1"
                                fullWidth
                                autoComplete="shipping address-line1"
                                variant="standard"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                onChange={(event)=>{setMobile(event.target.value)}}
                                value={mobile}
                                error={errors.mobile}
                                helperText={errors.mobile ? errors.mobile : ""}
                                id="mobile"
                                name="mobile"
                                label="Mobile phone number"
                                fullWidth
                                variant="standard"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                onChange={(event)=>{setPassword(event.target.value)}}
                                value={password}
                                error={errors.password}
                                helperText={errors.password ? errors.password : ""}
                                required
                                id="password"
                                name="password"
                                label="Password"
                                fullWidth
                                type={"password"}
                                variant="standard"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                onChange={(event)=>{setRePassword(event.target.value)}}
                                value={repassword}
                                error={errors.repassword}
                                helperText={errors.repassword ? errors.repassword : ""}
                                id="state"
                                name="state"
                                label="State/Province/Region"
                                fullWidth
                                variant="standard"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DesktopDatePicker
                                    onChange={(event)=>{setDateOfBirth(event.target.value)}}
                                    inputFormat="MM/dd/yyyy"
                                    value={dateOfBirth}
                                    required
                                    id="dateOfBirth"
                                    name="dateOfBirth"
                                    label="Date Of Birth"
                                    rawValue={''} renderInput={(params)=><TextField {...params}/>}/>
                                    </LocalizationProvider>
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
                                Update Your Details
                            </Button>
                           </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </ThemeProvider>
    )
}