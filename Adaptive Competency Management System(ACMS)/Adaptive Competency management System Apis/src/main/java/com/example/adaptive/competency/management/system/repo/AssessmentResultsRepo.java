package com.example.adaptive.competency.management.system.repo;

import com.example.adaptive.competency.management.system.model.AssessmentResults;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Transactional
public interface AssessmentResultsRepo extends JpaRepository<AssessmentResults, Long> {


    // Custom query to find results by employeeId and enrollmentId
    @Query("SELECT a FROM AssessmentResults a WHERE a.employee.id = :employeeId AND a.enrollment.id = :enrollmentId")
    List<AssessmentResults> findByEmployeeIdAndEnrollmentId(
            @Param("employeeId") Long employeeId,
            @Param("enrollmentId") Long enrollmentId);

    // New query to find results by employeeId
    @Query("SELECT a FROM AssessmentResults a WHERE a.employee.id = :employeeId")
    List<AssessmentResults> findByEmployeeId(@Param("employeeId") Long employeeId);



}
