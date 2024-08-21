package com.example.Adaptive_Competency_Management_System.repo;

import com.example.Adaptive_Competency_Management_System.model.assessmentresults;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface assessmentresultsRepo extends JpaRepository<assessmentresults, Long> {


    // Custom query to find results by employeeId and enrollmentId
    @Query("SELECT a FROM assessmentresults a WHERE a.employee.id = :employeeId AND a.enrollment.id = :enrollmentId")
    List<assessmentresults> findByEmployeeIdAndEnrollmentId(
            @Param("employeeId") Long employeeId,
            @Param("enrollmentId") Long enrollmentId);

    // New query to find results by employeeId
    @Query("SELECT a FROM assessmentresults a WHERE a.employee.id = :employeeId")
    List<assessmentresults> findByEmployeeId(@Param("employeeId") Long employeeId);
}
