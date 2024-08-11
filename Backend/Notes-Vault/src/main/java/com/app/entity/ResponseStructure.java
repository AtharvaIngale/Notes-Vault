package com.app.entity;

import lombok.Data;
import lombok.Setter;

@Data
@Setter
public class ResponseStructure<T> {

	private T Data;
	private String message;
	private int statusCode;
	
	public T getData() {
		return Data;
	}
	
	public void setData(T data) {
		Data = data;
	}
	
	public String getMessage() {
		return message;
	}
	
	public void setMessage(String message) {
		this.message = message;
	}
	
	public int getStatusCode() {
		return statusCode;
	}
	
	public void setStatusCode(int statusCode) {
		this.statusCode = statusCode;
	}
	
}
