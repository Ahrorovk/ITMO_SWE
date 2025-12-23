package com.ahrorovk.web4.service;

import com.ahrorovk.web4.dto.PointRequest;
import com.ahrorovk.web4.dto.ResultResponse;
import com.ahrorovk.web4.model.Result;
import com.ahrorovk.web4.model.User;
import com.ahrorovk.web4.repository.ResultRepository;
import com.ahrorovk.web4.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ResultService {
    private final ResultRepository resultRepository;
    private final UserRepository userRepository;

    public ResultResponse checkPoint(PointRequest request, String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        long startTime = System.nanoTime();
        boolean hit = checkHit(request.getX(), request.getY(), request.getR());
        long endTime = System.nanoTime();
        long executionTime = (endTime - startTime) / 1000; // микросекунды

        Result result = Result.builder()
                .x(request.getX())
                .y(request.getY())
                .r(request.getR())
                .result(hit)
                .time(LocalDateTime.now())
                .bench(executionTime)
                .user(user)
                .build();

        result = resultRepository.save(result);

        return ResultResponse.builder()
                .id(result.getId())
                .x(result.getX())
                .y(result.getY())
                .r(result.getR())
                .result(result.getResult())
                .time(result.getTime())
                .bench(result.getBench())
                .build();
    }

    private boolean checkHit(double x, double y, double r) {
        boolean inTriangle = (x >= 0 && y >= 0 && x + y <= r);
        boolean inRectangle = (x >= 0 && x <= r/2 && y <= 0 && y >= -r);
        boolean inCircle = (x <= 0 && y <= 0 && (x * x + y * y <= (r/2) * (r/2)));
        return inTriangle || inRectangle || inCircle;
    }

    public List<ResultResponse> getUserResults(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return resultRepository.findByUserOrderByTimeDesc(user).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public Page<ResultResponse> getUserResults(String username, Pageable pageable) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return resultRepository.findByUserOrderByTimeDesc(user, pageable)
                .map(this::mapToResponse);
    }

    @Transactional
    public void clearUserResults(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        resultRepository.deleteByUser(user);
    }

    private ResultResponse mapToResponse(Result result) {
        return ResultResponse.builder()
                .id(result.getId())
                .x(result.getX())
                .y(result.getY())
                .r(result.getR())
                .result(result.getResult())
                .time(result.getTime())
                .bench(result.getBench())
                .build();
    }
}


