package com.example.adaptive.competency.management.system.controller;

import com.example.adaptive.competency.management.system.model.Employee; // Assuming your model class is named Employee
import com.example.adaptive.competency.management.system.repo.EmployeeRepo; // Assuming your repository interface is named EmployeeRepo
import org.apache.velocity.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Base64;
import java.util.List;

@RestController
@RequestMapping("/employees")
@CrossOrigin
public class EmployeeController {

    @Autowired
    private EmployeeRepo employeeRepository;

    // GET all employees
    @GetMapping
    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    // GET employee by ID
    @GetMapping("/{id}")
    public ResponseEntity<Employee> getEmployeeById(@PathVariable Long id) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id: " + id));
        return ResponseEntity.ok(employee);
    }

    // POST create a new employee
    @PostMapping("/addEmployee")
    public ResponseEntity<Employee> createEmployee(@RequestBody Employee emp) {
        try {
            String encodedPassword = Base64.getEncoder().encodeToString(emp.getPassword().getBytes());
            emp.setPassword(encodedPassword);
            Employee savedEmployee = employeeRepository.save(emp);
            return new ResponseEntity<>(savedEmployee, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    // PUT update an existing employee
    @PutMapping("/{id}")
    public ResponseEntity<Employee> updateEmployee(@PathVariable Long id, @RequestBody Employee empDetails) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id: " + id));

        employee.setFirstName(empDetails.getFirstName());
        employee.setLastName(empDetails.getLastName());
        employee.setEmail(empDetails.getEmail());
        employee.setDepartment(empDetails.getDepartment());
        employee.setPosition(empDetails.getPosition());
        employee.setHireDate(empDetails.getHireDate());
        employee.setBirthDate(empDetails.getBirthDate());
        employee.setAddress(empDetails.getAddress());
        employee.setPassword(empDetails.getPassword()); // Update password field

        Employee updatedEmployee = employeeRepository.save(employee);
        return ResponseEntity.ok(updatedEmployee);
    }

    // DELETE an employee
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEmployee(@PathVariable Long id) {
        employeeRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
