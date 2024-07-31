package org.example.todo.dto;

import lombok.Data;

@Data
public class JWTAuthResponse {

    private String token;

    private String refreshToken;

}
