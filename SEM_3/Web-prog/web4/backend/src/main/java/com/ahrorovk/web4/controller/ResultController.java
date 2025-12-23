package com.ahrorovk.web4.controller;

import com.ahrorovk.web4.dto.PointRequest;
import com.ahrorovk.web4.dto.ResultResponse;
import com.ahrorovk.web4.service.ResultService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/results")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
@Slf4j
public class ResultController {
    private final ResultService resultService;

    @PostMapping("/check")
    public ResponseEntity<ResultResponse> checkPoint(
            @Valid @RequestBody PointRequest request,
            Authentication authentication
    ) {
        if (authentication == null) {
            log.error("ResultController: Authentication is NULL!");
            throw new RuntimeException("Authentication required");
        }
        
        String username = authentication.getName();
        log.info("ResultController: Processing checkPoint for user: {}", username);
        return ResponseEntity.ok(resultService.checkPoint(request, username));
    }

    @GetMapping
    public ResponseEntity<List<ResultResponse>> getUserResults(
            Authentication authentication,
            @RequestParam(required = false) Integer page,
            @RequestParam(required = false) Integer size
    ) {
        String username = authentication.getName();
        if (page != null && size != null) {
            Pageable pageable = PageRequest.of(page, size);
            Page<ResultResponse> results = resultService.getUserResults(username, pageable);
            return ResponseEntity.ok(results.getContent());
        }
        return ResponseEntity.ok(resultService.getUserResults(username));
    }

    @DeleteMapping
    public ResponseEntity<Void> clearResults(Authentication authentication) {
        String username = authentication.getName();
        resultService.clearUserResults(username);
        return ResponseEntity.ok().build();
    }
}


