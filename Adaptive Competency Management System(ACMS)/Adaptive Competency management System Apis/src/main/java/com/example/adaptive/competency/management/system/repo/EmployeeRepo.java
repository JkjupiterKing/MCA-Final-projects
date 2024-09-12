package com.example.adaptive.competency.management.system.repo;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.adaptive.competency.management.system.model.Employee;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EmployeeRepo extends JpaRepository<Employee, Long> {
    Optional<Employee> findByEmail(String email);
}

