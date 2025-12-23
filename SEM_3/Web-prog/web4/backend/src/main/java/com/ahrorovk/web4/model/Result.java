package com.ahrorovk.web4.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "results")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Result {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Min(-5) @Max(5) @NotNull
    @Column(nullable = false)
    private Double x;

    @Min(-3) @Max(3) @NotNull
    @Column(nullable = false)
    private Double y;

    @Min(-5) @Max(5) @NotNull
    @Column(nullable = false)
    private Double r;

    @NotNull
    @Column(nullable = false)
    @Builder.Default
    private Boolean result = false;

    @NotNull
    @Column(nullable = false)
    @Builder.Default
    private LocalDateTime time = LocalDateTime.now();

    @NotNull
    @Column(nullable = false)
    @Builder.Default
    private Long bench = 0L;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
}


