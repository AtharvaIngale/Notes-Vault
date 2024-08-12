import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { Grid, Card, CardContent, Typography, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { styled, alpha } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';

const Home = () => {
    let [notes, setNotes] = useState([])
    let [search, setSearch] = useState([])

    let user = JSON.parse(localStorage.getItem("user"))

    let navigate = useNavigate()
    let editNotes=((id)=>{
        axios.get(`http://localhost:8080/notes/${id}`)
        .then((res)=>{
            localStorage.setItem("note", JSON.stringify(res.data.data))
            navigate("/editNote")
        })
        .catch(()=>{
            alert("Something went wrong")
        })
    })

    let deleteNotes=((id)=>{
        axios.delete(`http://localhost:8080/notes/${id}`)
        .then((res)=>{
            alert(res.data.data)
            
        })
        .catch(()=>{
            alert("Cannot Delete Product")
        })
    })

    useEffect(()=>{
        let fetchData=()=>{
            axios.get(`http://localhost:8080/notes/byUser-ID/${user.id}`)
            .then((res)=>{
                setNotes(res.data.data)
                setSearch(res.data.data)
            })
            .catch(()=>{
                alert("Bad Request")
            })
            
        }
        fetchData()
    },
    [user.id]
)

    let searchNotes=(e)=>{
        setSearch(notes.filter((x)=>x.title.toLowerCase().includes(e.target.value)))
      }

    const handleAddNoteClick = () => {
        navigate("/addNote");
    };

    const handleVoiceNoteClick = () => {
        navigate("/voiceNote");
    };


    return (
        <div>
        <Navbar />
        <input type='text' placeholder='Search Note By Title' onChange={searchNotes}/>
        <div>
        <Grid container spacing={3} style={{ marginTop: '10px', marginLeft: '5px' }}>
                {search.map((note) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={note.id}>
                        <Card variant="outlined">
                            <CardContent>
                                <Typography variant="h5" component="div">
                                    {note.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" style={{ marginTop: '10px' }}>
                                    {note.note}
                                </Typography>
                                <Typography variant="caption" display="block" gutterBottom style={{ marginTop: '10px' }}>
                                    Date: {note.date}
                                </Typography>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                                    <Button variant="contained" color="primary" 
                                    onClick={() => editNotes(note.id)} 
                                    style={{margin: '2px'}}>
                                        <EditIcon />
                                        EDIT
                                    </Button>
                                    <Button variant="contained" color="secondary" 
                                    onClick={() => deleteNotes(note.id)} 
                                    style={{margin: '2px'}}>
                                        <DeleteIcon />
                                        DELETE
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

        </div>
        <Fab color="primary" aria-label="Add Note" 
        sx={{position: 'absolute', margin: '10px', marginLeft: '94%'}} 
        onClick={handleAddNoteClick}
        title="Add Note" >
        <AddIcon />
        </Fab>
        <Fab color="secondary" aria-label="Voice Note" 
        sx={{position: 'absolute', margin: '10px', marginLeft: '89%'}} 
        onClick={handleVoiceNoteClick}
        title="Voice Note" >
        <KeyboardVoiceIcon />
        </Fab>
        </div>
    )
}
export default Home