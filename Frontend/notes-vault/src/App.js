import './App.css';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

import Header from './Components/Header/Sidebar/Sidebar';
import Notes from './Components/Notes/Notes';
import Archive from './Components/Archive/Archives';
import Trash from './Components/Trash/TrashNotes';
import RegistrationForm from './Components/Register/RegistrationForm';
import LoginForm from './Components/Login/LoginForm';

const DrawerHeader = styled('div')(({ theme }) => ({
  ...theme.mixins.toolbar,
}));

function App() {
  return (
    <Box style={{ display: 'flex', width: '100%' }}>
      <Router>
        <Header />
        <Box sx={{ display: 'flex', width: '100%' }}>
          <Box sx={{ p: 3, width: '100%' }}>
            <DrawerHeader />
            <Routes>
              <Route path="/" element={<Notes />} />
              <Route path="/archive" element={<Archive />} />
              <Route path="/trash" element={<Trash />} />
              <Route path="/Register" element={<RegistrationForm />} />
              <Route path="/Login" element={<LoginForm />} />
            </Routes>
          </Box>
        </Box>
      </Router>
    </Box>
  );
}

export default App;
