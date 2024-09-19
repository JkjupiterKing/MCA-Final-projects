package com.business.analytics.api.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Table(name = "Feedback")
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@ToString
public class Feedback {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        @Column(name = "feedback_ID")
        private Long feedbackId;

        @Column(name = "Question")
        private String question;

        @Column(name = "Answer")
        private String answer;

        @Column(name = "AddedBy")
        private String addedBy;

        @Column(name = "Username")
        private String username;

        @CreationTimestamp
        @Column(name = "Created_at",updatable = false)
        private LocalDateTime createdAt;
    }

