package com.app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.app.entity.Note;

public interface NoteRepository extends JpaRepository<Note, Integer> {
	
	@Query("select n from Note n where n.user.id = ?1")
	List<Note> findNotesByUserId(int id);
	
}

