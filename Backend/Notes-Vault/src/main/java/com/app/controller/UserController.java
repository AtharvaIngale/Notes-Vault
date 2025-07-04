package com.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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

import com.app.entity.ResponseStructure;
import com.app.entity.User;
import com.app.service.UserService;

@RestController
@CrossOrigin(origins = {"http://localhost:3000", "https://notes-vault-frontend.onrender.com"})
public class UserController {

	@Autowired
	private UserService service;
	
	@PostMapping(value = "/users", consumes = "application/json", produces = "application/json")
	public ResponseEntity<ResponseStructure<User>> saveUser(@RequestBody User u)
	{
		return service.saveUser(u);
	}
	
	@PutMapping("/users")
	public ResponseEntity<ResponseStructure<User>> updateUser(@RequestBody User u)
	{
		return service.updateUser(u);
	}
	
	@GetMapping("/users/{id}")
	public ResponseEntity<ResponseStructure<User>> findById(@PathVariable int id)
	{
		return service.findById(id);
	}
	
	@DeleteMapping("/users/{id}")
	public ResponseEntity<ResponseStructure<String>> deleteUser(@PathVariable int id)
	{
		return service.deleteUser(id);
	}
	
	@GetMapping("/users")
	public ResponseEntity<ResponseStructure<List<User>>> findAll()
	{
		return service.findAll();
	}
	
	@PostMapping("/users/verifyByphone")
	public ResponseEntity<ResponseStructure<User>> verifyUser(@RequestParam long phone, @RequestParam String password)
	{
		return service.verifyUser(phone, password);
	}
	
	@PostMapping("/users/verifyByEmail")
	public ResponseEntity<ResponseStructure<User>> verifyUser(@RequestParam String email, @RequestParam String password)
	{
		return service.verifyUser(email, password);
	}
	
}
