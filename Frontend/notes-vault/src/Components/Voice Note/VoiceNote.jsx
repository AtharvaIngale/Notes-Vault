// import MicRecorder from "mic-recorder-to-mp3"
// import { useEffect, useState, useRef } from "react"
// import axios from "axios"

//   // Set AssemblyAI Axios Header
//   const assembly = axios.create({
//     baseURL: "https://api.assemblyai.com/v2",
//     headers: {
//       authorization: "b8a987d0ed6b46bd893f7621851f7c26",
//       "content-type": "application/json",
//       "transfer-encoding": "chunked",
//     },
//   })

// const VoiceNote = () => {
//   // Mic-Recorder-To-MP3
//   const recorder = useRef(null) //Recorder
//   const audioPlayer = useRef(null) //Ref for the HTML Audio Tag
//   const [blobURL, setBlobUrl] = useState(null)
//   const [audioFile, setAudioFile] = useState(null)
//   const [isRecording, setIsRecording] = useState(null)

//   useEffect(() => {
//     //Declares the recorder object and stores it inside of ref
//     recorder.current = new MicRecorder({ bitRate: 128 })
//   }, [])

//   const startRecording = () => {
//     // Check if recording isn't blocked by browser
//     recorder.current.start().then(() => {
//       setIsRecording(true)
//     })
//   }

//   const stopRecording = () => {
//     recorder.current
//       .stop()
//       .getMp3()
//       .then(([buffer, blob]) => {
//         const file = new File(buffer, "audio.mp3", {
//           type: blob.type,
//           lastModified: Date.now(),
//         })
//         const newBlobUrl = URL.createObjectURL(blob)
//         setBlobUrl(newBlobUrl)
//         setIsRecording(false)
//         setAudioFile(file)
//       })
//       .catch((e) => console.log(e))
//   }

//   // AssemblyAI API

//   // State variables
//   const [uploadURL, setUploadURL] = useState("")
//   const [transcriptID, setTranscriptID] = useState("")
//   const [transcriptData, setTranscriptData] = useState("")
//   const [transcript, setTranscript] = useState("")
//   const [isLoading, setIsLoading] = useState(false)

//   // Upload the Audio File and retrieve the Upload URL
//   useEffect(() => {
//     if (audioFile) {
//       assembly
//         .post("/upload", audioFile)
//         .then((res) => setUploadURL(res.data.upload_url))
//         .catch((err) => console.error(err))
//     }
//   }, [audioFile])

//   // Submit the Upload URL to AssemblyAI and retrieve the Transcript ID
//   const submitTranscriptionHandler = () => {
//     assembly
//       .post("/transcript", {
//         audio_url: uploadURL,
//       })
//       .then((res) => {
//         setTranscriptID(res.data.id)

//         checkStatusHandler()
//       })
//       .catch((err) => console.error(err))
//   }

//   // Check the status of the Transcript
//   const checkStatusHandler = async () => {
//     setIsLoading(true)
//     try {
//       await assembly.get(`/transcript/${transcriptID}`).then((res) => {
//         setTranscriptData(res.data)
//       })
//     } catch (err) {
//       console.error(err)
//     }
//   }

//   // Periodically check the status of the Transcript
//   useEffect(() => {
//     const interval = setInterval(() => {
//       if (transcriptData.status !== "completed" && isLoading) {
//         checkStatusHandler()
//       } else {
//         setIsLoading(false)
//         setTranscript(transcriptData.text)

//         clearInterval(interval)
//       }
//     }, 1000)
//     return () => clearInterval(interval)
//   },)

//   return (
//     <div>
//       <h1>React Speech Recognition App</h1>
//       <audio ref={audioPlayer} src={blobURL} controls='controls' />
//       <div>
//         <button disabled={isRecording} onClick={startRecording}>
//           START
//         </button>
//         <button disabled={!isRecording} onClick={stopRecording}>
//           STOP
//         </button>
//         <button onClick={submitTranscriptionHandler}>SUBMIT</button>
//       </div>
//       {transcriptData.status === "completed" ? (
//         <textarea>{transcript}</textarea>
//       ) : (
//         <textarea>{transcriptData.status}</textarea>
//       )}
//     </div>
//   )
// }

// export default VoiceNote


// import React, { useState } from "react";

// const SpeechToText = () => {
//   const [transcript, setTranscript] = useState("");
//   const [isListening, setIsListening] = useState(false);

//   const handleListen = () => {
//     if (!('webkitSpeechRecognition' in window)) {
//       alert("Sorry, your browser doesn't support speech recognition.");
//       return;
//     }

//     const recognition = new window.webkitSpeechRecognition();
//     recognition.continuous = true;
//     recognition.interimResults = true;
//     recognition.lang = "en-US";

//     recognition.onstart = () => {
//       setIsListening(true);
//     };

//     recognition.onresult = (event) => {
//       let interimTranscript = '';
//       for (let i = event.resultIndex; i < event.results.length; i++) {
//         const transcriptPart = event.results[i][0].transcript;
//         if (event.results[i].isFinal) {
//           setTranscript((prev) => prev + transcriptPart);
//         } else {
//           interimTranscript += transcriptPart;
//         }
//       }
//       setTranscript((prev) => prev + interimTranscript);
//     };

//     recognition.onerror = (event) => {
//       console.error("Speech recognition error detected: " + event.error);
//       setIsListening(false);
//     };

//     recognition.onend = () => {
//       setIsListening(false);
//     };

//     if (isListening) {
//       recognition.stop();
//     } else {
//       recognition.start();
//     }
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h1>Speech to Text Demo</h1>
//       <button onClick={handleListen}>
//         {isListening ? "Stop Listening" : "Start Listening"}
//       </button>
//       <div style={{ marginTop: "20px", border: "1px solid black", padding: "10px", minHeight: "100px" }}>
//         <p>{transcript}</p>
//       </div>
//     </div>
//   );
// };

// export default SpeechToText;


// import React, { useState, useEffect } from 'react';

// function SpeechToText() {
//   const [transcript, setTranscript] = useState('');
//   const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//   const recognition = new SpeechRecognition();

//   useEffect(() => {
//     recognition.continuous = true;
//     recognition.interimResults = true;

//     recognition.onresult = (event) => {
//       const transcriptArray = [];
//       for (let i = event.resultIndex; i < event.results.length; i++) {
//         if (event.results[i].isFinal) {
//           transcriptArray.push(event.results[i][0].transcript);
//         }
//       }
//       setTranscript(transcriptArray.join(''));
//     };

//     recognition.onerror = (error) => {
//       console.error('Speech recognition error:', error);
//     };
//   }, []);

//   const startListening = () => {
//     recognition.start();
//   };

//   const stopListening = () => {
//     recognition.stop();
//   };

//   return (
//     <div>
//       <button onClick={startListening}>Start</button>
//       <button onClick={stopListening}>Stop</button>
//       <p>{transcript}</p>
//     </div>
//   );
// }

// export default SpeechToText;


import React, { useState, useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const SpeechToText = () => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (browserSupportsSpeechRecognition) {
      SpeechRecognition.startListening({ continuous: true });
    }
  }, [browserSupportsSpeechRecognition]);

  const handleStartListening = () => {
    SpeechRecognition.startListening({ continuous: true });
    setIsListening(true);
    setError(null); // Clear any previous errors
  };

  const handleStopListening = () => {
    SpeechRecognition.stopListening();
    setIsListening(false);
  };

  const handleError = (err) => {
    console.error('Speech recognition error:', err);
    setError(err.message);
  };

  return (
    <div>
      <p>Microphone: {listening ? 'on' : 'off'}</p>
      <button onClick={handleStartListening}>Start</button>
      <button onClick={handleStopListening}>Stop</button>
      <p>{transcript}</p>
      {error && <p className="error">Error: {error}</p>}
    </div>
  );
};

export default SpeechToText;
