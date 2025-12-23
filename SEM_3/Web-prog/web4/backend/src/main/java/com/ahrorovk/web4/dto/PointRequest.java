package com.ahrorovk.web4.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PointRequest {
    @NotNull(message = "X is required")
    @Min(value = -5, message = "X must be between -5 and 5")
    @Max(value = 5, message = "X must be between -5 and 5")
    private Double x;

    @NotNull(message = "Y is required")
    @Min(value = -3, message = "Y must be between -3 and 3")
    @Max(value = 3, message = "Y must be between -3 and 3")
    private Double y;

    @NotNull(message = "R is required")
    @Min(value = -5, message = "R must be between -5 and 5")
    @Max(value = 5, message = "R must be between -5 and 5")
    private Double r;
}


