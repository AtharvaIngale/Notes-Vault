import React, { useState } from 'react';
import axios from 'axios';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

function RegistrationForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/register', formData);
      console.log(response.data);
      alert("Registered successfully");
    } catch (error) {
      console.error(error);
      alert("Registration failed");
    }
  };

  return (
    <Box
    component="form"
    sx={{
      '& > :not(style)': { m: 1, width: '25ch' },
    }}
    noValidate
    autoComplete="off">
    <TextField id="outlined-basic" label="Outlined" variant="outlined" />
    <TextField id="filled-basic" label="Filled" variant="filled" />
    <TextField id="standard-basic" label="Standard" variant="standard" />
  </Box>
  );
}

export default RegistrationForm;
