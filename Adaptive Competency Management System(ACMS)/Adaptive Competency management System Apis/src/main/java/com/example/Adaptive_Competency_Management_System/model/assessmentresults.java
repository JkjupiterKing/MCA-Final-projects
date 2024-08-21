package com.example.Adaptive_Competency_Management_System.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.Date;

@Entity
@Table(name = "assessment_results")
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@ToString
public class assessmentresults {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "result_id")
    private Long resultId;

    @ManyToOne
    @JoinColumn(name = "enrollment_id")
    private enrollment enrollment;

    @ManyToOne
    @JoinColumn(name = "employee_Id") // Assume you have employee_id in the employee table
    private employee employee; // Replace learningActivity with Employee

    @Column(name = "score")
    private String score;

    @Column(name = "attempt_number")
    private Integer attemptNumber;

    @Column(name = "assessment_date")
    private Date assessmentDate;

    @Lob
    @Column(name = "user_answers")
    private String userAnswers; // Store user answers as JSON
}
