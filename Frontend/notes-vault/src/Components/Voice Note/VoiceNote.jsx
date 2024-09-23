import MicRecorder from "mic-recorder-to-mp3"
import { useEffect, useState, useRef, useNavigate } from "react"
import axios from "axios"
import Navbar from "../Navbar/Navbar"
import style from "./VoiceNote.module.css";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

  // Set AssemblyAI Axios Header
  const assembly = axios.create({
    baseURL: "https://api.assemblyai.com/v2",
    headers: {
      authorization: "ASSEMBLY_API_KEY",
      "content-type": "application/json",
      "transfer-encoding": "chunked",
    },
  })

const VoiceNote = () => {
  // Mic-Recorder-To-MP3
  const recorder = useRef(null) //Recorder
  const audioPlayer = useRef(null) //Ref for the HTML Audio Tag
  const [blobURL, setBlobUrl] = useState(null)
  const [audioFile, setAudioFile] = useState(null)
  const [isRecording, setIsRecording] = useState(null)
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  
  const navigate = useNavigate;

  useEffect(() => {
    //Declares the recorder object and stores it inside of ref
    recorder.current = new MicRecorder({ bitRate: 128 })
  }, [])

  const startRecording = () => {
    // Check if recording isn't blocked by browser
    recorder.current.start().then(() => {
      setIsRecording(true)
    })
  }

  const stopRecording = () => {
    recorder.current
      .stop()
      .getMp3()
      .then(([buffer, blob]) => {
        const file = new File(buffer, "audio.mp3", {
          type: blob.type,
          lastModified: Date.now(),
        })
        const newBlobUrl = URL.createObjectURL(blob)
        setBlobUrl(newBlobUrl)
        setIsRecording(false)
        setAudioFile(file)
      })
      .catch((e) => console.log(e))
  }

  // AssemblyAI API

  // State variables
  const [uploadURL, setUploadURL] = useState("")
  const [transcriptID, setTranscriptID] = useState("")
  const [transcriptData, setTranscriptData] = useState("")
  const [transcript, setTranscript] = useState("")
  const [isLoading, setIsLoading] = useState(false)


  const add = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("user"));
    const data = { title, note };

    try {
      const response = await axios.post(`http://localhost:8080/notes/${user.id}`, data);
      alert("Note added with ID: " + response.data.data.id);
      navigate("/home");
    } catch (error) {
      alert("Error, Something went wrong");
      console.error(error); // Log error for debugging
    }
  };

  // Upload the Audio File and retrieve the Upload URL
  useEffect(() => {
    if (audioFile) {
      assembly
        .post("/upload", audioFile)
        .then((res) => setUploadURL(res.data.upload_url))
        .catch((err) => console.error(err))
    }
  }, [audioFile])

  // Submit the Upload URL to AssemblyAI and retrieve the Transcript ID
  const submitTranscriptionHandler = () => {
    assembly
      .post("/transcript", {
        audio_url: uploadURL,
      })
      .then((res) => {
        setTranscriptID(res.data.id)

        checkStatusHandler()
      })
      .catch((err) => console.error(err))
  }

  // Check the status of the Transcript
  const checkStatusHandler = async () => {
    setIsLoading(true)
    try {
      await assembly.get(`/transcript/${transcriptID}`).then((res) => {
        setTranscriptData(res.data)
      })
    } catch (err) {
      console.error(err)
    }
  }

  // Periodically check the status of the Transcript
  useEffect(() => {
    const interval = setInterval(() => {
      if (transcriptData.status !== "completed" && isLoading) {
        checkStatusHandler()
      } else {
        setIsLoading(false)
        setTranscript(transcriptData.text)

        clearInterval(interval)
      }
    }, 1000)
    return () => clearInterval(interval)
  },)

  return (
    <div>
      <Navbar />
      <div className={style.main}>
      <div className={style.block}>
      <form action="" onSubmit={add} method="POST">      
      <h1 className={style.color}>Voice Note</h1>
        <input
              type="text"
              value={title}
              placeholder="Enter Title"
              onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <br />
        {transcriptData.status === "completed" ? (
        <ReactQuill 
        theme="snow" 
        value={note} 
        placeholder="Enter Description"
        style={{ backgroundColor: 'white'}}
        onChange={setNote}>
        {transcript}
        </ReactQuill>) 
        : 
        (<ReactQuill 
        theme="snow" 
        value={note} 
        placeholder="Enter Description"
        style={{ backgroundColor: 'white'}}
        onChange={setNote}>
          {transcriptData.status}
        </ReactQuill>
        )}
        <br />
        <br />
        <button className="btn btn-primary" type="button"
              style={{ margin: "5px 0px", width: "300px" }} 
              disabled={isRecording} onClick={startRecording}>
          START RECORDING
        </button>
        <br />
        <button className="btn btn-primary" type="button"
          style={{ margin: "5px 0px", width: "300px" }}
          disabled={!isRecording} onClick={stopRecording}>
          STOP RECORDING
        </button>
        <br />
        <button className="btn btn-primary" type="button"
          style={{ margin: "5px 0px", width: "300px" }} 
          onClick={submitTranscriptionHandler}>
          TRANSCRIPTION
        </button>
        <br />
        <button className="btn btn-primary" type="submit"
          style={{margin: "5px 0px", width: "300px" }}>
            ADD
        </button>

      
      </form>
    </div>
    </div>
    </div>
  )
}

export default VoiceNote
