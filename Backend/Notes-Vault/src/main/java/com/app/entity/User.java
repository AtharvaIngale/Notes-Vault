package com.app.entity;

import java.util.List;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class User {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	@Column(nullable = false)
	private String name;
	@Column(nullable = false, unique = true)
	private String email;
	@Column(nullable = false, unique = true)
	private long phone;
	@Column(nullable = false)
	private String password;
	
	@OneToMany
	@JoinColumn
	private List<Note> notes;

	public List<Note> getNotes() {
		// TODO Auto-generated method stub
		for (Note note : notes) {
			System.out.println(note);
		}
		return null;
	}

	public int getId() {
		// TODO Auto-generated method stub
		return id;
	}

}
