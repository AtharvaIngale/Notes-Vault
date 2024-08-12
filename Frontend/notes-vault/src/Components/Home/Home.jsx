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

    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        border: '1px solid',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
          backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        margin: '20px',
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(1),
          width: 'auto',
        },
      }));
      
      const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }));
      
      const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        width: '100%',
        '& .MuiInputBase-input': {
          padding: theme.spacing(1, 1, 1, 0),
          paddingLeft: `calc(1em + ${theme.spacing(4)})`,
          transition: theme.transitions.create('width'),
          [theme.breakpoints.up('sm')]: {
            width: '30ch', '&:focus': { width: '20ch' },
          },
        },
      }));

    return (
        <div>
        <Navbar />
        <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder='Search Note By Title' 
              onChange={searchNotes}
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
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
        <Fab color="primary" aria-label="add" 
        sx={{position: 'absolute', margin: '10px', marginLeft: '94%'}} 
        onClick={handleAddNoteClick}
        title="Add Note" >
        <AddIcon />
        </Fab>
        </div>
    )
}
export default Home