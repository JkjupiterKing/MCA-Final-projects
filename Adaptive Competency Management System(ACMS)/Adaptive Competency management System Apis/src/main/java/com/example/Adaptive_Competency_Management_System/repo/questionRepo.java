package com.example.Adaptive_Competency_Management_System.repo;

import com.example.Adaptive_Competency_Management_System.model.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface questionRepo extends JpaRepository<Question, Long> {
    List<Question> findByTypeOfQuestion(String typeOfQuestion);
}
