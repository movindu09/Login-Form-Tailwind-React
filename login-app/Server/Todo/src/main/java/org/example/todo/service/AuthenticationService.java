package org.example.todo.service;


import org.example.todo.dto.JWTAuthResponse;
import org.example.todo.dto.RefreshTokenRequest;
import org.example.todo.dto.SignInRequest;
import org.example.todo.dto.SignUpRequest;
import org.example.todo.entity.User;

public interface AuthenticationService {
    User signUp(SignUpRequest signUpRequest);

    JWTAuthResponse signIn(SignInRequest signInRequest);

    JWTAuthResponse refreshToken(RefreshTokenRequest refreshTokenRequest);
}
