// Load the sidenav
$('#mySidenav').load('../../app/user-Sidenav/sidenav.html');

const currentUser = JSON.parse(localStorage.getItem('User'));

document.addEventListener('DOMContentLoaded', function () {
    // Initialize UI with enrolled courses for the current user
    if (currentUser && currentUser.employeeId) {
        fetchCompletedCourses(currentUser.employeeId);
    } else {
        console.error('No current user found or employee ID missing in localStorage.');
        // Display message or handle redirect to login, etc.
    }
});

function fetchCompletedCourses(employeeId) {
    // Include 'status=completed' in the query parameters
    const apiUrl = `http://localhost:8080/enrollments/status?employeeId=${employeeId}&status=Completed`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(enrollments => {
            console.log('Completed Enrollments:', enrollments);
            if (enrollments.length === 0) {
                displayNoEnrolledCoursesMessage();
            } else {
                // Extract course IDs and enrollment IDs from enrollments
                const courseDetails = enrollments.map(enrollment => ({
                    courseId: enrollment.course.courseId,
                    enrollmentId: enrollment.enrollmentId,
                    courseName: enrollment.course.courseName
                }));
                // Fetch courses based on course IDs
                fetchCoursesByEnrollments(courseDetails);
            }
        })
        .catch(error => {
            console.error('Error fetching completed courses:', error);
            // Display error message or handle accordingly
        });
}

// Function to fetch courses based on course details (including enrollmentId)
function fetchCoursesByEnrollments(courseDetails) {
    if (courseDetails.length === 0) {
        console.log('No completed courses found for the employee.');
        displayNoEnrolledCoursesMessage();
        return;
    }

    // Fetch courses individually as backend does not support multiple IDs in one request
    Promise.all(courseDetails.map(detail => fetchCourseById(detail.courseId)))
        .then(responses => Promise.all(responses.map(response => response.json())))
        .then(courses => {
            console.log('Courses:', courses);
            displayCourses(courses, courseDetails);
        })
        .catch(error => {
            console.error('Error fetching courses:', error);
        });
}

// Function to fetch a single course by ID
function fetchCourseById(courseId) {
    const apiUrl = `http://localhost:8080/courses/${courseId}`;
    return fetch(apiUrl).then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok for course ID ' + courseId);
        }
        return response;
    });
}

function displayCourses(courses, courseDetails) {
    const container = document.getElementById('assessmentList');
    container.innerHTML = ''; // Clear previous content

    if (courses.length === 0) {
        displayNoEnrolledCoursesMessage();
        return;
    }

    courses.forEach(course => {
        const courseDetail = courseDetails.find(detail => detail.courseId === course.courseId);
        if (!courseDetail) return; // Skip if no matching detail found

        const courseHtml = `
           <div class="col-md-6 mb-4">
            <div class="assessment-item card">
                <img src="${course.imageUrl}" class="card-img-top" alt="${course.courseName}">
                <div class="card-body">
                    <h5 class="card-title">${course.courseName}</h5>
                    <p class="card-text">${course.description}</p>
                    <a href="../../app/Questions/question.html" class="btn btn-primary start-assessment"
                       data-course-name="${course.courseName}" 
                       data-enrollment-id="${courseDetail.enrollmentId}" target="_blank">Start Assessment</a>
                    <button class="btn btn-secondary view-results"
                       data-enrollment-id="${courseDetail.enrollmentId}">View Results</button>
                </div>
            </div>
        </div>
        `;
        container.innerHTML += courseHtml;
    });

    // Add click event listener to "Start Assessment" and "View Results" buttons
    document.querySelectorAll('.start-assessment').forEach(link => {
        link.addEventListener('click', function() {
            const courseName = this.getAttribute('data-course-name');
            const enrollmentId = this.getAttribute('data-enrollment-id');
            localStorage.setItem('currentCourseName', courseName);
            localStorage.setItem('currentEnrollmentId', enrollmentId);
        });
    });

    document.querySelectorAll('.view-results').forEach(button => {
        button.addEventListener('click', function() {
            const enrollmentId = this.getAttribute('data-enrollment-id');
            fetchAssessmentResults(enrollmentId, button);
        });
    });
}

function fetchAssessmentResults(enrollmentId, button) {
    const apiUrl = `http://localhost:8080/assessment-results/getResults?enrollmentId=${enrollmentId}&employeeId=${currentUser.employeeId}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(results => {
            if (results.length === 0) {
                // button.classList.add('d-none'); // Hide the button if no results
                displayNoResultsMessage();
            } else {
                // button.classList.remove('d-none'); // Show the button if results are found
                showResultsInModal(results);
            }
        })
        .catch(error => {
            console.error('Error fetching assessment results:', error);
            // button.classList.add('d-none'); // Hide the button on error
            // Display error message or handle accordingly
        });
}

function showResultsInModal(results) {
    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = ''; // Clear previous content

    let index = 0;
    results.forEach(result => {
        index++;
        const resultHtml = `
        <p><strong>Attempt:</strong> ${index}</p>
        <p><strong>Course:</strong> ${result.enrollment.course.courseName}</p>
        <p><strong>Score:</strong> ${result.score}</p>
            <hr>
        `;
        modalBody.innerHTML += resultHtml;
    });

    const myModal = new bootstrap.Modal(document.getElementById('resultsModal'));
    myModal.show();
}

// Function to display a message when no courses are enrolled
function displayNoEnrolledCoursesMessage() {
    const container = $('#assessmentList');
    container.html('<p>No completed courses found.</p>');
}
