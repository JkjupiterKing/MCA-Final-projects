package com.example.adaptive.competency.management.system.controller;

import com.example.adaptive.competency.management.system.model.AssessmentResults;
import com.example.adaptive.competency.management.system.repo.AssessmentResultsRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/assessment-results")
@CrossOrigin
public class AssessmentResultsController {

    @Autowired
    private AssessmentResultsRepo assessmentResultsRepository;

    @GetMapping("/all")
    public List<AssessmentResults> getAllAssessmentResults() {
        return assessmentResultsRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<AssessmentResults> getAssessmentResultsById(@PathVariable("id") Long id) {
        Optional<AssessmentResults> result = assessmentResultsRepository.findById(id);
        return result.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/addassessmentresults")
    public AssessmentResults createAssessmentResults(@RequestBody AssessmentResults assessmentResults) {
        return assessmentResultsRepository.save(assessmentResults);
    }

    @PutMapping("/{id}")
    public ResponseEntity<AssessmentResults> updateAssessmentResults(
            @PathVariable("id") Long id,
            @RequestBody AssessmentResults assessmentResults) {

        if (!assessmentResultsRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        assessmentResults.setResultId(id);
        AssessmentResults updatedResult = assessmentResultsRepository.save(assessmentResults);
        return ResponseEntity.ok(updatedResult);
    }

    @GetMapping("/getResults")
    public ResponseEntity<List<AssessmentResults>> getAssessmentResultsByEmployeeAndEnrollment(
            @RequestParam("employeeId") Long employeeId,
            @RequestParam("enrollmentId") Long enrollmentId) {

        List<AssessmentResults> results = assessmentResultsRepository.findByEmployeeIdAndEnrollmentId(employeeId, enrollmentId);
        if (results.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(results);
    }

    @GetMapping("/byEmployee")
    public ResponseEntity<List<AssessmentResults>> getAssessmentResultsByEmployee(@RequestParam("employeeId") Long employeeId) {
        List<AssessmentResults> results = assessmentResultsRepository.findByEmployeeId(employeeId);
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
