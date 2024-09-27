package com.business.analytics.api.model;

import jakarta.persistence.*;
import lombok.*;

import java.security.SecureRandom;

@Entity
@Table(name = "Employee")
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@ToString
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;
    @Column(unique = true)
    private String username;
    private String email;
    private String password;
    private String phone;
    private String address;
    private Double salary;
    @ManyToOne
    @JoinColumn(name = "role_id", nullable = false)
    private Role role;
    private String manager;
}


