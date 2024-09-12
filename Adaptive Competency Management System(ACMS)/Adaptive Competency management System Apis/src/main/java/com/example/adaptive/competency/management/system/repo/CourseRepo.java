package com.example.adaptive.competency.management.system.repo;

import com.example.adaptive.competency.management.system.model.Course;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
@Transactional
public interface CourseRepo extends JpaRepository<Course, Long> {


    @Modifying
    @Query("DELETE FROM AssessmentResults r WHERE r.enrollment.enrollmentId IN (SELECT e.enrollmentId FROM Enrollment e WHERE e.course.courseId = :courseId)")
    int deleteAssessmentResultsOfCourseId(@Param("courseId") Long courseId);

    @Modifying
    @Query("DELETE FROM Enrollment e WHERE e.course.courseId = :courseId")
    int deleteEnrollmentsOfCourseId(@Param("courseId") Long courseId);

}
