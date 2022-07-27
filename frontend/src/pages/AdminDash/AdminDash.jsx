import React, {useState} from "react";
import axios from "axios";
import {Container} from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Backdrop from '@mui/material/Backdrop';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Message from "../../utils/Message";

const theme = createTheme();

export default function AdminDash() {
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const handleToggle = () => {
        setOpen(!open);
    };

    const [count, setCount] = React.useState("");
    const [students, setStudents] = React.useState([]);
    const [student, setStudent] = React.useState({});

    const [email, setEmail] = useState("");
    const [errors, setErrors] = useState({});

    const register = async (event) => {
        event.preventDefault();

        if (validate()) {
            setEmail(event.target.value);
            const newUser = {email};

            await axios.post(`http://localhost:4040/user`, newUser).then((response) => {
                Message(`${response.data}`, "success");
            }).catch((error) => {
                Message(`${error.response.data}`, "error");
            })

        }
    };

    const validate = () => {
        let temp = {};
        temp.email = !email ? "This field is required" : "";
        setErrors({
            ...temp
        })
        return Object.values(temp).every(x => x === "");
    }

    const getData = () => {
        axios.get(`http://localhost:4040/user/`).then(res => {
            setStudents(res.data);
            setCount(res.data.length);
        })
    }
    React.useEffect(() => {
        getData()
    }, [0])

    const ViewAGroup = (id) => {

        axios.get(`http://localhost:4040/user/${id}`).then(res => {
            console.log(res.data);
            setStudent(res.data);
            handleToggle();
        }).catch((error) => {
            console.log(error.message)
        })
    }

    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth='xl'>
                <Paper sx={{p: 8, mx: 25, my: 5, display: 'flex', flexDirection: 'column', maxWidth: 950}}>
                    <h2 align={'center'}>Admin DashBoard</h2>
                    <h3 align="right">Users' Count: {count}</h3>
                    <br/>
                    <Table size="small" sx={{maxWidth: 950}} component={Paper} elevation={12}>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>First Name</TableCell>
                                <TableCell>Mobile</TableCell>
                                <TableCell align={"left"}>View</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {students.map((student) => (
                                <TableRow key={student._id}>
                                    <TableCell>{student.id}</TableCell>
                                    <TableCell>{student.email}</TableCell>
                                    <TableCell>{student.firstName}</TableCell>
                                    <TableCell>{student.mobile}</TableCell>
                                    <TableCell>
                                        <Stack direction="row" spacing={1} align="center">
                                            <IconButton color="info" aria-label="add to shopping cart" onClick={() => {
                                                ViewAGroup(student._id)
                                            }}>
                                                <VisibilityIcon/>
                                            </IconButton>
                                        </Stack>
                                    </TableCell>
                                </TableRow>
                            ))}
                            <div>
                                <Backdrop
                                    sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                                    open={open}
                                    onClick={handleClose}>
                                    <Card sx={{maxWidth: 345}}>
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div">
                                                First Name: {student.firstName}
                                            </Typography>
                                            <Typography variant="body2" color="text.primary">
                                                Last Name: {student.lastName}
                                            </Typography>
                                            <Typography variant="body2" color="text.primary">
                                                Email: {student.email}
                                            </Typography>
                                            <Typography variant="body2" color="text.primary">
                                                Date Of Birth: {student.dateOfBirth}
                                            </Typography>
                                            <Typography variant="body2" color="text.primary">
                                                Mobile: {student.mobile}
                                            </Typography>
                                            <Typography variant="body2" color="text.primary">
                                                User type: {student.accountType}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Backdrop>
                            </div>
                        </TableBody>
                    </Table>
                </Paper>
            </Container>
            <Container maxWidth='lg'>
                <Paper sx={{p: 8, mx: 25, my: 5, display: 'flex', flexDirection: 'column', maxWidth: 750}}>
                    <h2 align={'center'}>User Registration</h2>
                    <h3 align="right">  </h3>
                    <br/>
                    <Box component="form" noValidate onSubmit={register} sx={{mt: 1}}>
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
                        <Box textAlign={"center"}>
                            <Button
                                type="submit"
                                style={{width: "50%"}}
                                variant="contained"
                                sx={{mt: 3, mb: 2}}
                            >
                                Register
                            </Button>
                        </Box>
                    </Box>
                </Paper>
            </Container>
        </ThemeProvider>
    );
}