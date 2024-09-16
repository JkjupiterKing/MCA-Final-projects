package adaptive_competency_management_system.controller;

import adaptive_competency_management_system.model.Course;
import adaptive_competency_management_system.repo.CourseRepo;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/courses")
@AllArgsConstructor
@CrossOrigin
public class CourseController {

    private final CourseRepo courseRepository;

    @GetMapping
    public ResponseEntity<List<Course>> getAllCourses() {
        List<Course> cours = courseRepository.findAll();
        return new ResponseEntity<>(cours, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Course> getCourseById(@PathVariable("id") Long id) {
        Optional<Course> courseOptional = courseRepository.findById(id);
        return courseOptional.map(Course -> new ResponseEntity<>(Course, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/addcourse")
    public ResponseEntity<Course> createCourse(@RequestBody Course course) {
        Course savedCourse = courseRepository.save(course);
        return new ResponseEntity<>(savedCourse, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Course> updateCourse(@PathVariable("id") Long id, @RequestBody Course course) {
        Optional<Course> courseOptional = courseRepository.findById(id);
        if (!courseOptional.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        Course updatedCourse = courseRepository.save(course);
        return new ResponseEntity<>(updatedCourse, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCourse(@PathVariable("id") Long id) {
        Optional<Course> courseOptional = courseRepository.findById(id);
        if (!courseOptional.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        courseRepository.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("/removeCourse/{courseId}")
    public ResponseEntity<Map<String,Integer>> deleteCourseWithEnrollmentsAndAssessment(@PathVariable("courseId") Long courseId) {
        int deletedAssessments =  courseRepository.deleteAssessmentResultsOfCourseId(courseId);
        int deletedEnrolments =  courseRepository.deleteEnrollmentsOfCourseId(courseId);
//        int deletedProgress =  courseRepository.deleteProgressOfCourseId(courseId);
        courseRepository.deleteById(courseId);
        Map<String,Integer> deleteCounts = new HashMap<>();
        deleteCounts.put("deletedAssessments",deletedAssessments);
        deleteCounts.put("deletedEnrolments",deletedEnrolments);
        deleteCounts.put("deletedCourse",1);
        return new ResponseEntity<>(deleteCounts, HttpStatus.OK);
    }
}

