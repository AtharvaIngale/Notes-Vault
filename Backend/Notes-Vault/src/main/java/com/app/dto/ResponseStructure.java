package com.app.dto;

import lombok.Data;

@Data
public class ResponseStructure<T> {

	private T Data;
	private String message;
	private int statusCode;
	public void setData(T string) {
		// TODO Auto-generated method stub
		Data = string;
	}
	public void setMessage(String message2) {
		// TODO Auto-generated method stub
		message = message2;
	}
	public void setStatusCode(int value) {
		// TODO Auto-generated method stub
		statusCode = value;
	}
	
}
