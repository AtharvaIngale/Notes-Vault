package com.app.entity;

import java.time.LocalDate;

import org.hibernate.annotations.UpdateTimestamp;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Note {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	@Column(nullable = false, unique = true)
	private String title;
	@Column(nullable = false)
	private String note;
	@Column(nullable = false)
	@UpdateTimestamp
	private LocalDate date;
	
	@ManyToOne
	@JoinColumn(name = "user_id")
	@JsonIgnore
	private User user;

	public void setUser(User user2) {
		// TODO Auto-generated method stub
		user = user2;
	}

}
