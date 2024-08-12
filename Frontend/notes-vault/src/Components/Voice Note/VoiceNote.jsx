import MicRecorder from "mic-recorder-to-mp3"
import { useEffect, useState, useRef } from "react"
import axios from "axios"
import style from "./VoiceNote.module.css"
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import Navbar from "../Navbar/Navbar";
import StopIcon from '@mui/icons-material/Stop';
import { useNavigate } from "react-router-dom";

  // Set AssemblyAI Axios Header
  const assembly = axios.create({
    baseURL: "https://api.assemblyai.com/v2",
    headers: {
      authorization: "b8a987d0ed6b46bd893f7621851f7c26",
      "content-type": "application/json",
      "transfer-encoding": "chunked",
    },
  })

const S2t = () => {
  // Mic-Recorder-To-MP3
  const recorder = useRef(null) //Recorder
  const audioPlayer = useRef(null) //Ref for the HTML Audio Tag
  const [blobURL, setBlobUrl] = useState(null)
  const [audioFile, setAudioFile] = useState(null)
  const [isRecording, setIsRecording] = useState(null)

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

  let [title, setTitle] = useState("")
  let [note, setNote] = useState("")

  let navigate = useNavigate

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

  return (
    <div>
      <Navbar />
      <div className={style.main}>
      <div className={style.block}>
      <form>
      <input type="text" value={title} placeholder="Enter Title" onChange={(e)=>{setTitle(e.target.value)}} /><br/><br/>
      {transcriptData.status === "completed" ? (
        <textarea>{transcript}</textarea>
      ) : (
        <textarea>{transcriptData.status}</textarea>
      )}
        <button className='btn btn-primary' style={{margin: '5px 0px', width: '300px'}}  disabled={isRecording} onClick={startRecording}>
        <GraphicEqIcon />
          START
        </button><br />
        <button className='btn btn-primary' style={{margin: '5px 0px', width: '300px'}}  disabled={!isRecording} onClick={stopRecording}>
        <StopIcon />  
          STOP
        </button><br />
        <button className='btn btn-primary' style={{margin: '5px 0px', width: '300px'}}  onClick={submitTranscriptionHandler}>SUBMIT</button>
        </form>
    </div>
    </div>
    </div>
  )
}

export default S2t
