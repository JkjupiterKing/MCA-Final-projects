package com.supplychainmanagement.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "Products")
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@ToString
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private double price;

    @Lob
    private String description;

    private String category;

    private String ImageURL;

    private String rating;
}

