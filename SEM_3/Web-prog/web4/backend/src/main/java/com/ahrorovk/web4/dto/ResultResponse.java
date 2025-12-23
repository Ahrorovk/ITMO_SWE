package com.ahrorovk.web4.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ResultResponse {
    private Long id;
    private Double x;
    private Double y;
    private Double r;
    private Boolean result;
    private LocalDateTime time;
    private Long bench;
}


