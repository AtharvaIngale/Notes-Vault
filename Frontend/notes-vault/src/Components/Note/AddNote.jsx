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

    //subscribe to thapa technical for more awesome videos

    const startListening = () => SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });
    const { transcript, browserSupportsSpeechRecognition } = useSpeechRecognition();

    if (!browserSupportsSpeechRecognition) {
        return null
    }    

        // const [transcript, setTranscript] = useState('');
        // const [isRecording, setIsRecording] = useState(false);
        // const [recorder, setRecorder] = useState(null);
      
        // const startRecording = async () => {
        //   setIsRecording(true);
      
        //   // Request access to the microphone
        //   const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        //   const mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
      
        //   // Set up a handler for when data is available
        //   mediaRecorder.ondataavailable = async (event) => {
        //     if (event.data.size > 0) {
        //       const formData = new FormData();
        //       formData.append('audio', event.data, 'recording.webm');
      
        //       // Send the audio chunk to your Spring Boot backend, which will forward it to AssemblyAI
        //       try {
        //         const response = await axios.post('http://localhost:8080/notes/transcribe', formData, {
        //           headers: {
        //             'Content-Type': 'multipart/form-data'
        //           }
        //         });
      
        //         setTranscript((prev) => prev + response.data);
        //       } catch (error) {
        //         console.error('Error during transcription:', error);
        //       }
        //     }
        //   };
      
        //   mediaRecorder.start(1000); // send data every second
        //   setRecorder(mediaRecorder);
        // };
      
        // const stopRecording = () => {
        //   setIsRecording(false);
        //   if (recorder) {
        //     recorder.stop();
        //   }
        // };
      
        // useEffect(() => {
        //   return () => {
        //     // Clean up recorder on unmount
        //     if (recorder) {
        //       recorder.stream.getTracks().forEach((track) => track.stop());
        //     }
        //   };
        // }, [recorder]);


    return(
        <div>
        <Navbar/>
        <div className={style.main}>
        <div className={style.block}>
            <form action="" onSubmit={add} method="POST">
            <h1 className={style.color}>Add Note</h1><br/>
                <input type="text" value={title} placeholder="Enter Title" onChange={(e)=>{setTitle(e.target.value)}} /><br/><br/>
                <textarea rows="4" cols="50" value={note} placeholder="Enter Description" onChange={(e)=>{setNote(e.target.value)}} onClick={() =>  setTextToCopy(transcript)} > {transcript} </textarea><br/><br/>
                <button className='btn btn-primary' style={{margin: '5px 0px', width: '300px'}} onClick={setCopied}>
                    {isCopied ? 'Copied!' : 'Copy to clipboard'}
                </button><br />
                <button className='btn btn-primary' style={{margin: '5px 0px', width: '300px'}} onClick={startListening}>Start Listening</button><br />
                <button className='btn btn-primary' style={{margin: '5px 0px', width: '300px'}} onClick={SpeechRecognition.stopListening}>Stop Listening</button><br />
                <button className='btn btn-primary' style={{margin: '5px 0px', width: '300px'}}>ADD</button><br />
                <p className={style.color} style={{margin: '5px 0px'}} ><Link to="/home">Cancel</Link></p>
            </form>
        </div>
        </div>
        </div>
    )

}

export default AddNote