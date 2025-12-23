package com.ahrorovk.web4.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String username;

    @Column(nullable = false)
    private String password; // хранится как хэш

    @Column(nullable = false)
    private String fullName;

    @Column(nullable = false)
    private String groupNumber;

    @Column(nullable = false)
    private Integer variant;
}


