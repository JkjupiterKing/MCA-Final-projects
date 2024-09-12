package com.example.adaptive.competency.management.system.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "Questions")
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@ToString
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "question_text", nullable = false)
    private String questionText;

    @Column(name = "option_1", nullable = false, length = 255)
    private String option1;

    @Column(name = "option_2", nullable = false, length = 255)
    private String option2;

    @Column(name = "option_3", nullable = false, length = 255)
    private String option3;

    @Column(name = "option_4", nullable = false, length = 255)
    private String option4;

    @Column(name = "correct_answer", nullable = false)
    private String correctAnswer;

    @Column(name = "type_of_question", nullable = false)
    private String typeOfQuestion;
}
