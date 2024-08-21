package com.business.analytics.api.controller;

import com.business.analytics.api.model.Feedback;
import com.business.analytics.api.repo.FeedbackRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/feedback") // Use lowercase for REST paths
@CrossOrigin
public class Feedbackcontroller {

    @Autowired
    private FeedbackRepo feedbackRepo;

    @GetMapping("/all")
    public ResponseEntity<List<Feedback>> getAllFeedbacks() {
        List<Feedback> feedbacks = feedbackRepo.findAll();
        return new ResponseEntity<>(feedbacks, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Feedback> getFeedbackById(@PathVariable Long id) {
        Feedback feedback = feedbackRepo.findById(id).orElse(null);
        return feedback != null ? new ResponseEntity<>(feedback, HttpStatus.OK) : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping("/addFeedback")
    public ResponseEntity<Feedback> createFeedback(@RequestBody Feedback feedback) {
        feedback.setCreatedAt(LocalDateTime.now()); // Automatically set the creation date
        Feedback createdFeedback = feedbackRepo.save(feedback);
        return new ResponseEntity<>(createdFeedback, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Feedback> updateFeedback(@PathVariable Long id, @RequestBody Feedback feedback) {
        Feedback existingFeedback = feedbackRepo.findById(id).orElse(null);
        if (existingFeedback != null) {
            feedback.setFeedbackId(id); // Set the ID to the existing feedback's ID
            feedback.setCreatedAt(existingFeedback.getCreatedAt()); // Preserve the original creation date
            Feedback updatedFeedback = feedbackRepo.save(feedback);
            return new ResponseEntity<>(updatedFeedback, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFeedback(@PathVariable Long id) {
        if (feedbackRepo.existsById(id)) {
            feedbackRepo.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
