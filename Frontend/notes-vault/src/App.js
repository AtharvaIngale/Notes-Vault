import React, {useEffect} from 'react';
import "./App.css";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import SignUp from './Components/Authentication/SignUp';
import SignIn from './Components/Authentication/SignIn';
import Home from './Components/Home/Home';
import ViewUser from './Components/User/ViewUser';
import UpdateUser from './Components/User/UpdateUser';
import SignOut from './Components/Authentication/SignOut';
import DeleteUser from './Components/User/DeleteUser';
import Protect from './Components/Authentication/Protect';
import AddNote from './Components/Note/AddNote';
import EditNote from './Components/Note/EditNote';
import S2t from './Components/Voice Note/VoiceNote';

function App() {
  useEffect(() => {
    document.title = 'Notes-Vault';
  }, []);
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<SignIn />}/>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/home" element={<Protect Child={Home} />} />
          <Route path="/viewUser" element={<Protect Child={ViewUser}/>} />
          <Route path="/updateUser" element={<Protect Child={UpdateUser}/>} />
          <Route path="/deleteUser" element={<Protect Child={DeleteUser}/>} />
          <Route path="/signout" element={<Protect Child={SignOut}/>} />
          <Route path="/addNote" element={<Protect Child={AddNote}/>} />
          <Route path="/editNote" element={<Protect Child={EditNote}/>} />
          <Route path="/deleteNote" />
          <Route path="/voiceNote" element={<S2t />} />
          </Routes>
      </Router>
      </div>
  );
}

export default App;

