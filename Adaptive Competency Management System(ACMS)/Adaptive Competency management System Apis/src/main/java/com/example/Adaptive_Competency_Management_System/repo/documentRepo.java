package com.example.Adaptive_Competency_Management_System.repo;

import com.example.Adaptive_Competency_Management_System.model.Document;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface documentRepo extends JpaRepository<Document, Long> {
    List<Document> findByEmployeeEmployeeId(Long employeeId);
}

