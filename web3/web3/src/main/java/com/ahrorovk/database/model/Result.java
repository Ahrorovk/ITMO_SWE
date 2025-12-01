package com.ahrorovk.database.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Date;

@Entity
@Table(name = "results")
@FieldDefaults(level = AccessLevel.PRIVATE)
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Builder
public class Result {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) Long id;

    @Min(-4) @Max(4) @NotNull
    @Column(name = "x", nullable = false)
    double x;

    @Min(-3) @Max(5) @NotNull
    @Column(name = "y", nullable = false)
    double y;

    @Min(1) @Max(5) @NotNull
    @Column(name = "r", nullable = false)
    double r;

    @NotNull
    @Column(name = "result", nullable = false)
    @Builder.Default boolean result = false;

    @NotNull
    @Column(name = "time", nullable = false)
    @Builder.Default Date time = new Date();

    @NotNull
    @Column(name = "bench", nullable = false)
    @Builder.Default
    long bench = 0;
}
