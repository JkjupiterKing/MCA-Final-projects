package com.example.adaptive.competency.management.system.repo;

import com.example.adaptive.competency.management.system.model.EmployeeProgress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeProgressRepo extends JpaRepository<EmployeeProgress, Long> {
}
