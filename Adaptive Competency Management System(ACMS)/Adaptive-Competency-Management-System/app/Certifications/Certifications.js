// Load navBar
$("#mySidenav").load("../../app/user-Sidenav/sidenav.html");

const currentUser = JSON.parse(localStorage.getItem("User"));

document.addEventListener("DOMContentLoaded", function () {
  if (currentUser && currentUser.employeeId) {
    fetchCompletedCourses(currentUser.employeeId);
  } else {
    console.error(
      "No current user found or employee ID missing in localStorage."
    );
  }
});

function fetchCompletedCourses(employeeId) {
  const apiUrl = `http://localhost:8080/enrollments/status?employeeId=${employeeId}&status=Completed`;

  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((enrollments) => {
      console.log("Completed Enrollments:", enrollments);
      if (enrollments.length === 0) {
        displayNoEnrolledCoursesMessage();
      } else {
        const courseDetails = enrollments.map((enrollment) => ({
          courseId: enrollment.course.courseId,
          enrollmentId: enrollment.enrollmentId,
          courseName: enrollment.course.courseName,
        }));
        fetchCoursesByEnrollments(courseDetails);
      }
    })
    .catch((error) => {
      console.error("Error fetching completed courses:", error);
    });
}

function fetchCoursesByEnrollments(courseDetails) {
  if (courseDetails.length === 0) {
    console.log("No completed courses found for the employee.");
    displayNoEnrolledCoursesMessage();
    return;
  }

  Promise.all(courseDetails.map((detail) => fetchCourseById(detail.courseId)))
    .then((responses) =>
      Promise.all(responses.map((response) => response.json()))
    )
    .then((courses) => {
      console.log("Courses:", courses);
      displayCourses(courses, courseDetails);
    })
    .catch((error) => {
      console.error("Error fetching courses:", error);
    });
}

function fetchCourseById(courseId) {
  const apiUrl = `http://localhost:8080/courses/${courseId}`;
  return fetch(apiUrl).then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok for course ID " + courseId);
    }
    return response;
  });
}

function displayCourses(courses, courseDetails) {
  const container = document.getElementById("assessmentList");
  container.innerHTML = "";

  if (courses.length === 0) {
    displayNoEnrolledCoursesMessage();
    return;
  }

  courses.forEach((course) => {
    const courseDetail = courseDetails.find(
      (detail) => detail.courseId === course.courseId
    );
    if (!courseDetail) return;

    const courseHtml = `
      <div class="col-md-6 mb-4">
        <div class="assessment-item card">
          <img src="${course.imageUrl}" class="card-img-top" alt="${course.courseName}">
          <div class="card-body">
            <h5 class="card-title">${course.courseName}</h5>
            <p class="card-text">${course.description}</p>
            <button class="btn btn-primary view-certificate" data-enrollment-id="${courseDetail.enrollmentId}">Certificate</button>  
          </div>
        </div>
      </div>
    `;
    container.innerHTML += courseHtml;
  });

  // Add event listeners for certificate buttons
  document.querySelectorAll(".view-certificate").forEach((button) => {
    button.addEventListener("click", function () {
      const enrollmentId = this.getAttribute("data-enrollment-id");
      fetchAssessmentResults(enrollmentId);
    });
  });
}

function fetchAssessmentResults(enrollmentId) {
  const apiUrl = `http://localhost:8080/assessment-results/getResults?enrollmentId=${enrollmentId}&employeeId=${currentUser.employeeId}`;

  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((results) => {
      if (results.length === 0) {
        alert("No assessment results found.");
      } else {
        const score = results[0].score;
        if (score < 3) {
          alert("You need a score 3 or above  to obtain the certificate.");
        } else {
          // Redirect to the certificate
          const courseName = results[0].enrollment.course.courseName;
          window.open(
            `../../app/Certificate/Certificate.html?courseName=${encodeURIComponent(
              courseName
            )}&studentName=${encodeURIComponent(
              currentUser.firstName
            )}&completionDate=${new Date().toLocaleDateString()}`,
            "_blank"
          );
        }
      }
    })
    .catch((error) => {
      console.error("Error fetching assessment results:", error);
      alert(
        "Take assessment and Score above 5 on First attempt to Unlock the Certificate"
      );
    });
}

function displayNoEnrolledCoursesMessage() {
  const container = $("#assessmentList");
  container.html("<p>No completed courses found.</p>");
}
