package com.example.adaptive.competency.management.system.repo;

import com.example.adaptive.competency.management.system.model.Document;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DocumentRepo extends JpaRepository<Document, Long> {
    List<Document> findByEmployeeEmployeeId(Long employeeId);
}

