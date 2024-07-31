package org.example.todo.service.impl;

import org.example.todo.dto.JWTAuthResponse;
import org.example.todo.dto.RefreshTokenRequest;
import org.example.todo.dto.SignInRequest;
import org.example.todo.dto.SignUpRequest;
import org.example.todo.entity.Role;
import org.example.todo.entity.User;
import org.example.todo.exception.AuthenticationFailedException;
import org.example.todo.exception.InvalidEmailOrPasswordException;
import org.example.todo.repository.UserRepository;
import org.example.todo.service.AuthenticationService;
import org.example.todo.service.JWTService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;


@Service
public class AuthenticationServiceImpl implements AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JWTService jwtService;

    @Autowired
    public AuthenticationServiceImpl(UserRepository userRepository,
                                     PasswordEncoder passwordEncoder,
                                     AuthenticationManager authenticationManager,
                                     JWTService jwtService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
    }

    public User signUp(SignUpRequest signUpRequest) {
        if (userRepository.findByEmail(signUpRequest.getEmail()).isPresent()) {
            throw new IllegalArgumentException("Email is already in use");
        }

        User user = new User();
        user.setEmail(signUpRequest.getEmail());
        user.setName(signUpRequest.getName());

        Role role;
        try {
            role = Role.valueOf(signUpRequest.getRole().toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Invalid role provided");
        }
        user.setRole(role);

        user.setPassword(passwordEncoder.encode(signUpRequest.getPassword()));
        return userRepository.save(user);
    }

    public JWTAuthResponse signIn(SignInRequest signInRequest) {
        try {
            System.out.println("Authenticating user: " + signInRequest.getEmail());
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            signInRequest.getEmail(),
                            signInRequest.getPassword()));
            SecurityContextHolder.getContext().setAuthentication(authentication);
            System.out.println("Authentication successful");

            var user = userRepository.findByEmail(signInRequest.getEmail())
                    .orElseThrow(() -> new InvalidEmailOrPasswordException("Invalid email or password"));
            System.out.println("User found: " + user);

            var jwt = jwtService.generateToken(user);
            System.out.println("JWT generated: " + jwt);

            var refreshToken = jwtService.generateRefreshToken(new HashMap<>(), user);
            System.out.println("Refresh token generated: " + refreshToken);

            JWTAuthResponse jwtAuthResponse = new JWTAuthResponse();
            jwtAuthResponse.setToken(jwt);
            jwtAuthResponse.setRefreshToken(refreshToken);

            return jwtAuthResponse;
        } catch (BadCredentialsException e) {
            System.err.println("Bad credentials: " + e.getMessage());
            throw new InvalidEmailOrPasswordException("Invalid email or password", e);
        } catch (AuthenticationException e) {
            System.err.println("Authentication failed: " + e.getMessage());
            throw new AuthenticationFailedException("Authentication failed", e);
        } catch (Exception e) {
            System.err.println("Unexpected error during authentication: " + e.getMessage());
            e.printStackTrace();
            throw new AuthenticationFailedException("Unexpected error during authentication", e);
        }
    }

    public JWTAuthResponse refreshToken(RefreshTokenRequest refreshTokenRequest) {
        try {
            System.out.println("refreshToken");
            String userEmail = jwtService.extractUserName(refreshTokenRequest.getToken());

            var user = userRepository.findByEmail(userEmail)
                    .orElseThrow(() -> new IllegalArgumentException("Invalid email or password"));

            var jwt = jwtService.generateToken(user);
            System.out.println("Refresh JWT generated: " + jwt);

            var refreshToken = jwtService.generateRefreshToken(new HashMap<>(), user);
            System.out.println("Refresh token generated: " + refreshToken);

            JWTAuthResponse jwtAuthResponse = new JWTAuthResponse();
            jwtAuthResponse.setToken(jwt);
            jwtAuthResponse.setRefreshToken(refreshToken);

            return jwtAuthResponse;

        } catch (BadCredentialsException e) {
            System.err.println("Bad credentials: " + e.getMessage());
            throw new IllegalArgumentException("Invalid email or password", e);
        } catch (AuthenticationException e) {
            System.err.println("Authentication failed: " + e.getMessage());
            throw new RuntimeException("Authentication failed", e);
        } catch (Exception e) {
            System.err.println("Unexpected error during authentication: " + e.getMessage());
            e.printStackTrace();
            throw new RuntimeException("Authentication failed", e);
        }
    }
}
