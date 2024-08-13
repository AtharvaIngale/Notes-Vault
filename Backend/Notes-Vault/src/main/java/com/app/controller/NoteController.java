   package com.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
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

import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.pdf.PdfWriter;

import java.io.ByteArrayOutputStream;
import java.util.List;

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
	
	// New endpoint for generating a note as a PDF
    @GetMapping("/notes/share/{id}/pdf")
    public ResponseEntity<byte[]> getNoteAsPDF(@PathVariable int id) throws DocumentException {
        Note note = service.findById(id).getBody().getData();

        Document document = new Document();
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        PdfWriter.getInstance(document, out);

        document.open();
        document.add(new Paragraph("Title: " + note.getTitle()));
        document.add(new Paragraph("Note: " + note.getNote()));
        document.close();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentDispositionFormData("filename", note.getTitle() + ".pdf");

        return ResponseEntity.ok()
                .headers(headers)
                .body(out.toByteArray());
    }
}
