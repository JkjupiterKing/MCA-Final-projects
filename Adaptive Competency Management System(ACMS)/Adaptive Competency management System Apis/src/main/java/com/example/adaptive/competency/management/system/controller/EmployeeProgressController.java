package com.example.adaptive.competency.management.system.controller;

import com.example.adaptive.competency.management.system.model.EmployeeProgress;
import com.example.adaptive.competency.management.system.repo.EmployeeProgressRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/employee-progress")
@CrossOrigin
public class EmployeeProgressController {

    @Autowired
    private EmployeeProgressRepo employeeProgressRepository;

    // Endpoint to retrieve all employee progress
    @GetMapping
    public ResponseEntity<List<EmployeeProgress>> getAllEmployeeProgress() {
        try {
            List<EmployeeProgress> employeeProgressList = employeeProgressRepository.findAll();

            if (employeeProgressList.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(employeeProgressList, HttpStatus.OK);
        } catch (Exception ex) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Endpoint to retrieve employee progress by ID
    @GetMapping("/{id}")
    public ResponseEntity<EmployeeProgress> getEmployeeProgressById(@PathVariable Long id) {
        Optional<EmployeeProgress> employeeProgressData = employeeProgressRepository.findById(id);

        return employeeProgressData.map(employeeProgress ->
                        new ResponseEntity<>(employeeProgress, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // Endpoint to create a new employee progress entry
    @PostMapping
    public ResponseEntity<EmployeeProgress> createEmployeeProgress(@RequestBody EmployeeProgress employeeProgress) {
        try {
            EmployeeProgress savedEmployeeProgress = employeeProgressRepository.save(employeeProgress);
            return new ResponseEntity<>(savedEmployeeProgress, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Endpoint to update employee progress
    @PutMapping("/{id}")
    public ResponseEntity<EmployeeProgress> updateEmployeeProgress(@PathVariable Long id, @RequestBody EmployeeProgress employeeProgress) {
        Optional<EmployeeProgress> oldEmployeeProgressData = employeeProgressRepository.findById(id);

        if (oldEmployeeProgressData.isPresent()) {
            EmployeeProgress updatedEmployeeProgress = oldEmployeeProgressData.get();
            updatedEmployeeProgress.setEnrollment(employeeProgress.getEnrollment());
            updatedEmployeeProgress.setCompletionStatus(employeeProgress.getCompletionStatus());
            updatedEmployeeProgress.setCompletionDate(employeeProgress.getCompletionDate());

            EmployeeProgress savedEmployeeProgress = employeeProgressRepository.save(updatedEmployeeProgress);
            return new ResponseEntity<>(savedEmployeeProgress, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Endpoint to delete employee progress
    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteEmployeeProgress(@PathVariable Long id) {
        try {
            employeeProgressRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
