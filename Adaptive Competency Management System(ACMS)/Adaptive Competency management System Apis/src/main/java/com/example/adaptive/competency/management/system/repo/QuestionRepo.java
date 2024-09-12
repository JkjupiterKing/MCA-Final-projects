package com.example.adaptive.competency.management.system.repo;

import com.example.adaptive.competency.management.system.model.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionRepo extends JpaRepository<Question, Long> {
    List<Question> findByTypeOfQuestion(String typeOfQuestion);
}
