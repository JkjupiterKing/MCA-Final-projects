package com.example.Adaptive_Competency_Management_System.controller;

import com.example.Adaptive_Competency_Management_System.model.assessmentresults;
import com.example.Adaptive_Competency_Management_System.repo.assessmentresultsRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/assessment-results")
@CrossOrigin
public class assessmentresultscontroller {

    @Autowired
    private assessmentresultsRepo assessmentResultsRepository;

    @GetMapping("/all")
    public List<assessmentresults> getAllAssessmentResults() {
        return assessmentResultsRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<assessmentresults> getAssessmentResultsById(@PathVariable("id") Long id) {
        Optional<assessmentresults> result = assessmentResultsRepository.findById(id);
        return result.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/addassessmentresults")
    public assessmentresults createAssessmentResults(@RequestBody assessmentresults assessmentResults) {
        return assessmentResultsRepository.save(assessmentResults);
    }

    @PutMapping("/{id}")
    public ResponseEntity<assessmentresults> updateAssessmentResults(
            @PathVariable("id") Long id,
            @RequestBody assessmentresults assessmentResults) {

        if (!assessmentResultsRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        assessmentResults.setResultId(id);
        assessmentresults updatedResult = assessmentResultsRepository.save(assessmentResults);
        return ResponseEntity.ok(updatedResult);
    }

    @GetMapping("/getResults")
    public ResponseEntity<List<assessmentresults>> getAssessmentResultsByEmployeeAndEnrollment(
            @RequestParam("employeeId") Long employeeId,
            @RequestParam("enrollmentId") Long enrollmentId) {

        List<assessmentresults> results = assessmentResultsRepository.findByEmployeeIdAndEnrollmentId(employeeId, enrollmentId);
        if (results.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(results);
    }

    @GetMapping("/byEmployee")
    public ResponseEntity<List<assessmentresults>> getAssessmentResultsByEmployee(@RequestParam("employeeId") Long employeeId) {
        List<assessmentresults> results = assessmentResultsRepository.findByEmployeeId(employeeId);
        if (results.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(results);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAssessmentResults(@PathVariable("id") Long id) {
        if (!assessmentResultsRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        assessmentResultsRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
