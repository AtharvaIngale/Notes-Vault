import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import style from "./note.module.css";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import useClipboard from "react-use-clipboard";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const AddNote = () => {
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [label, setLabel] = useState("");
  const navigate = useNavigate();


  const [textToCopy, setTextToCopy] = useState();
  const [isCopied, setCopied] = useClipboard(textToCopy, {
    successDuration: 1000,
  });

  const add = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("user"));
    const data = { title, note, label };

    try {
      const response = await axios.post(`http://localhost:8080/notes/${user.id}`, data);
      alert("Note added with ID: " + response.data.data.id);
      navigate("/home");
    } catch (error) {
      alert("Error, Something went wrong");
      console.error(error); // Log error for debugging
    }
  };

  return (
    <div>
      <Navbar />
      <div className={style.main}>
        <div className={style.block}>
          <form action="" onSubmit={add} method="POST">
            <h1 className={style.color}>Add Note</h1>
            <br />
            <input
              type="text"
              value={title}
              placeholder="Enter Title"
              onChange={(e) => setTitle(e.target.value)}
            />
            <br />
            <br />
            <ReactQuill 
                theme="snow" 
                value={note} 
                placeholder="Enter Description"
                style={{ backgroundColor: 'white'}}
                onChange={setNote}
                />
            <br />
            <br />
            {/* <input
              type="text"
              value={label}
              placeholder="Enter Label"
              onChange={(e) => setLabel(e.target.value)}
            />
            <br />
            <br /> */}
            <button
              className="btn btn-primary"
              style={{ margin: "5px 0px", width: "300px" }}
              onClick={() => setTextToCopy(note)}
            >
              {isCopied ? "Copied!" : "Copy to clipboard"}
            </button>
            <br />
            <button type="submit" className="btn btn-primary" style={{ margin: "5px 0px", width: "300px" }}>
              ADD
            </button>
            <br />
            <p className={style.color} style={{ margin: "5px 0px" }}>
              <Link to="/home">Cancel</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddNote;