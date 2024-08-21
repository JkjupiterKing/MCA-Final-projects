package com.example.Adaptive_Competency_Management_System.controller;

import com.example.Adaptive_Competency_Management_System.model.Question;
import com.example.Adaptive_Competency_Management_System.repo.questionRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/questions")
@CrossOrigin
public class questioncontroller {

    @Autowired
    private questionRepo questionRepository;

    @GetMapping("/all")
    public List<Question> getAllQuestions() {
        return questionRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Question> getQuestionById(@PathVariable Long id) {
        Optional<Question> question = questionRepository.findById(id);
        return question.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Question createQuestion(@RequestBody Question question) {
        return questionRepository.save(question);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Question> updateQuestion(@PathVariable Long id, @RequestBody Question questionDetails) {
        Optional<Question> question = questionRepository.findById(id);
        if (question.isPresent()) {
            Question updatedQuestion = question.get();
            updatedQuestion.setQuestionText(questionDetails.getQuestionText());
            updatedQuestion.setOption1(questionDetails.getOption1());
            updatedQuestion.setOption2(questionDetails.getOption2());
            updatedQuestion.setOption3(questionDetails.getOption3());
            updatedQuestion.setOption4(questionDetails.getOption4());
            updatedQuestion.setCorrectAnswer(questionDetails.getCorrectAnswer());
            updatedQuestion.setTypeOfQuestion(questionDetails.getTypeOfQuestion());
            return ResponseEntity.ok(questionRepository.save(updatedQuestion));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteQuestion(@PathVariable Long id) {
        Optional<Question> question = questionRepository.findById(id);
        if (question.isPresent()) {
            questionRepository.delete(question.get());
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // New endpoint to filter questions by typeOfQuestion
    @GetMapping("/type/{typeOfQuestion}")
    public List<Question> getQuestionsByType(@PathVariable String typeOfQuestion) {
        return questionRepository.findByTypeOfQuestion(typeOfQuestion);
    }
}
