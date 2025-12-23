package com.ahrorovk.web4.service;

import com.ahrorovk.web4.dto.AuthResponse;
import com.ahrorovk.web4.dto.LoginRequest;
import com.ahrorovk.web4.dto.RegisterRequest;
import com.ahrorovk.web4.model.User;
import com.ahrorovk.web4.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    @Transactional
    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new RuntimeException("Username already exists");
        }

        User user = User.builder()
                .username(request.getUsername())
                .password(passwordEncoder.encode(request.getPassword()))
                .fullName(request.getFullName())
                .groupNumber(request.getGroupNumber())
                .variant(request.getVariant())
                .build();

        user = userRepository.save(user);

        String token = jwtService.generateToken(user.getUsername());

        return new AuthResponse(
                token,
                user.getUsername(),
                user.getFullName(),
                user.getGroupNumber(),
                user.getVariant()
        );
    }

    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new RuntimeException("Invalid username or password"));

        if (!passwordEncoder.matches(request.(getPassword), user.getPassword())) {
            throw new RuntimeException("Invalid username or password");
        }

        String token = jwtService.generateToken(user.getUsername());

        return new AuthResponse(
                token,
                user.getUsername(),
                user.getFullName(),
                user.getGroupNumber(),
                user.getVariant()
        );
    }
}


