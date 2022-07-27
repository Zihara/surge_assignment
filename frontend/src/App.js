import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import {ToastContainer} from "react-toastify";
import Login from "./pages/Login/Login";
import UpdateUser from "./pages/UpdateUser/UpdateUser";
import AdminDash from "./pages/AdminDash/AdminDash";
import NotesList from "./pages/NotesList/NotesList";
import CreateNote from "./pages/CreateNote/CreateNote"
import UpdateNote from "./pages/UpdateNote/UpdateNote";


function App() {
    return (
        <BrowserRouter>
            {/*<TopBar />*/}
            <Routes>

                <Route path={"/"} element={<Login/>}/>
                <Route path={"/aa"} element={<UpdateUser/>}/>
                <Route path={"/admin"} element={<AdminDash/>}/>
                <Route path={"/notes"} element={<NotesList/>}/>
                <Route path={"/create_note"} element={<CreateNote/>}/>
                <Route path={"/note/:noteId"} element={<UpdateNote/>}/>

            </Routes>

            <ToastContainer style={{width: "400px"}}/>
        </BrowserRouter>
    );
}

export default App;
