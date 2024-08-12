package com.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.assemblyai.api.RealtimeTranscriber;
import javax.sound.sampled.*;
import static java.lang.Thread.interrupted;

import java.io.IOException;

import com.app.entity.Note;
import com.app.entity.ResponseStructure;
import com.app.service.NoteService;

@RestController
@CrossOrigin(origins = "http://localhost:3000/")
public class NoteController {
	
	@Autowired
	private NoteService service;
	
	@PostMapping("/notes/{user_id}")
	public ResponseEntity<ResponseStructure<Note>> saveNote(@RequestBody Note note, @PathVariable int user_id)
	{
		return service.saveNote(note, user_id);
	}
	
	@PutMapping("/notes/{user_id}")
	public ResponseEntity<ResponseStructure<Note>> updateNote(@RequestBody Note note, @PathVariable int user_id)
	{
		return service.updateNote(note, user_id);
	}
	
	@GetMapping("/notes/{id}")
	public ResponseEntity<ResponseStructure<Note>> findById(@PathVariable int id)
	{
		return service.findById(id);
	}
	
	@DeleteMapping("/notes/{id}")
	public ResponseEntity<ResponseStructure<String>> deleteNote(@PathVariable int id)
	{
		return service.deleteNote(id);
	}
	
	@GetMapping("/notes/byUser-ID/{user_id}")
	public ResponseEntity<ResponseStructure<List<Note>>> findNotesByUserId(@PathVariable int user_id)
	{
		return service.findNotesByUserId(user_id);
	}
	
	@PostMapping(value = "/notes/transcribe", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ResponseEntity<String> transcribe(@RequestParam("audio") MultipartFile audio)
	{
			try {
	            RealtimeTranscriber realtimeTranscriber = RealtimeTranscriber.builder()
	                    .apiKey("YOUR_ASSEMBLYAI_API_KEY")
	                    .sampleRate(16_000)
	                    .onSessionBegins(sessionBegins -> System.out.println(
	                            "Session opened with ID: " + sessionBegins.getSessionId()))
	                    .onPartialTranscript(transcript -> {
	                        if (!transcript.getText().isEmpty()) {
	                            // Send partial transcript back to the client
	                            System.out.println("Partial: " + transcript.getText());
	                        }
	                    })
	                    .onFinalTranscript(transcript -> {
	                        // Send final transcript back to the client
	                        System.out.println("Final: " + transcript.getText());
	                    })
	                    .onError(err -> System.out.println("Error: " + err.getMessage()))
	                    .build();

	            // Connect to AssemblyAI
	            realtimeTranscriber.connect();

	            // Read the audio data from the multipart file and send it to AssemblyAI
	            byte[] data = audio.getBytes();
	            realtimeTranscriber.sendAudio(data);

	            // Close the connection
	            realtimeTranscriber.close();

	            // Return a response to the client
	            return new ResponseEntity<>("Transcription Complete", HttpStatus.OK);

	        } catch (IOException e) {
	            e.printStackTrace();
	            return new ResponseEntity<>("Failed to transcribe audio", HttpStatus.INTERNAL_SERVER_ERROR);
	        }
	}

}
