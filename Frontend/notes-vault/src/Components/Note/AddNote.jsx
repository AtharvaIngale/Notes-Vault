import React, { useState, useEffect } from "react";
import axios from "axios";
import style from "./note.module.css"
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import useClipboard from "react-use-clipboard";

const AddNote=()=>{
    let [title, setTitle] = useState("")
    let [note, setNote] = useState("")

    let navigate = useNavigate()

    let add=(e)=>{
        e.preventDefault()
        let user = JSON.parse(localStorage.getItem("user"))
        let data = {title, note}
        axios.post(`http://localhost:8080/notes/${user.id}`, data)
        .then((res)=>{
            alert("Note added with ID: "+res.data.data.id)
            navigate('/home')
        }).catch(()=>{
            alert('Error, Something went wrong')
        })
    }

    const [textToCopy, setTextToCopy] = useState();
    const [isCopied, setCopied] = useClipboard(textToCopy, {
        successDuration:1000
    });



    return(
        <div>
        <Navbar/>
        <div className={style.main}>
        <div className={style.block}>
            <form action="" onSubmit={add} method="POST">
            <h1 className={style.color}>Add Note</h1><br/>
                <input type="text" value={title} placeholder="Enter Title" onChange={(e)=>{setTitle(e.target.value)}} /><br/><br/>
                <textarea rows="4" cols="50" value={note} placeholder="Enter Description" onChange={(e)=>{setNote(e.target.value)}} onClick={() =>  setTextToCopy()} > </textarea><br/><br/>
                <button className='btn btn-primary' style={{margin: '5px 0px', width: '300px'}} onClick={setCopied}>
                    {isCopied ? 'Copied!' : 'Copy to clipboard'}
                </button><br />
                <button className='btn btn-primary' style={{margin: '5px 0px', width: '300px'}}>ADD</button><br />
                <p className={style.color} style={{margin: '5px 0px'}} ><Link to="/home">Cancel</Link></p>
            </form>
        </div>
        </div>
        </div>
    )

}

export default AddNote