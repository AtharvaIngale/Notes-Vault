import axios from "axios";
import React, { useState } from "react";
import style from "./note.module.css"
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import useClipboard from "react-use-clipboard";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const EditNote = () => {

    let navigate = useNavigate()

    let p = JSON.parse(localStorage.getItem("note"))
    let [title, setTitle] = useState(p.title)
    let [note, setNote] = useState(p.note)
    let [id, setId] = useState(p.id)

    let edit = (e) => {
        let user = JSON.parse(localStorage.getItem("user"))
        e.preventDefault()
        let data = { id, title, note }
        axios.put(`http://localhost:8080/notes/${user.id}`, data)
            .then((res) => {
                setId(user.id)
                alert("Note Updated with ID: "+res.data.data.id)
                navigate('/home')
            })
            .catch(() => {
                alert("Title is not UNIQUE")
            })
    }

    const [textToCopy, setTextToCopy] = useState();
    const [isCopied, setCopied] = useClipboard(textToCopy, {
        successDuration:1000
    });

    return (
        <div>
            <Navbar />
            <div className={style.main}>
                <div className={style.block}>
                    <form action="" onSubmit={edit} method="PUT">
                        <h1 className={style.color}>Edit Note</h1><br />
                        <input type="text" value={title} placeholder="Enter Title" onChange={(e) => { setTitle(e.target.value) }} />
                        <br /><br />
                        <ReactQuill theme="snow" value={note} 
                        id="Description"
                        placeholder="Enter Description"
                        style={{backgroundColor: 'white'}}
                        onChange={setNote} />
                        <br /><br />
                        <button className='btn btn-primary' style={{margin: '5px 0px', width: '300px'}} onClick={setCopied}>
                            {isCopied ? 'Copied!' : 'Copy to clipboard'}
                        </button>
                        <br />
                        <button className='btn btn-primary' style={{margin: '5px 0px', width: '300px'}}>Edit</button>
                        <br />
                        <p className={style.color}><Link to="/home">Cancel</Link></p>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default EditNote