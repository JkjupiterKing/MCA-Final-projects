// Load side navigation
$('#mySidenav').load('../../app/user-Sidenav/sidenav.html');

document.addEventListener('DOMContentLoaded', function () {
    // Initialize UI with enrolled courses for the current user
    const currentUser = JSON.parse(localStorage.getItem('User'));
    if (currentUser && currentUser.employeeId) {
        fetchEnrolledCourses(currentUser.employeeId);
    } else {
        console.error('No current user found or employee ID missing in localStorage.');
        // Display message or handle redirect to login, etc.
    }
});

// Function to fetch enrolled courses
function fetchEnrolledCourses(employeeId) {
    const apiUrl = `http://localhost:8080/enrollments?employeeId=${employeeId}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(enrollments => {
            if (enrollments.length > 0) {
                const courseStatusData = {};
                let enrollmentId = null;
                enrollments.forEach(enrollment => {
                    const courseName = enrollment.course.courseName;
                    const status = enrollment.status;

                    if (!courseStatusData[courseName]) {
                        courseStatusData[courseName] = {};
                    }

                    if (!courseStatusData[courseName][status]) {
                        courseStatusData[courseName][status] = 0;
                    }

                    courseStatusData[courseName][status]++;
                    
                    // Assume we only need the first enrollmentId for the chart
                    if (!enrollmentId) {
                        enrollmentId = enrollment.enrollmentId;
                    }
                });

                // Convert courseStatusData object into arrays for the chart
                const chartLabels = Object.keys(courseStatusData);
                const statusLabels = Array.from(new Set(Object.values(courseStatusData).flatMap(status => Object.keys(status))));
                
                const datasets = statusLabels.map(status => {
                    return {
                        label: status,
                        backgroundColor: getRandomColor(), // Function to generate random colors
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1,
                        data: chartLabels.map(courseName => courseStatusData[courseName][status] || 0)
                    };
                });

                updateUserProgressChart(chartLabels, datasets);

                // Fetch assessment results for the employeeId
                fetchAssessmentResults(employeeId);
            } else {
                console.error('No enrollments found for the given employee ID.');
            }
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

// Function to fetch assessment results
function fetchAssessmentResults(employeeId) {
    const apiUrl = `http://localhost:8080/assessment-results/byEmployee?employeeId=${employeeId}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(results => {
            if (results.length > 0) {
                const assessmentResultsData = prepareAssessmentResultsData(results);
                updateAssessmentResultsChart(assessmentResultsData);
            } else {
                console.error('No assessment results found for the given employee ID.');
            }
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

// Function to prepare data for the assessment results chart
function prepareAssessmentResultsData(results) {
    const courseScores = results.reduce((acc, result) => {
        const courseName = result.enrollment.course.courseName;
        const score = result.score; // "3/5"
        const [correct, total] = score.split('/').map(Number);
        const scorePercentage = (correct / total) * 100;

        acc[courseName] = scorePercentage; // Update score percentage for the course

        return acc;
    }, {});

    const labels = Object.keys(courseScores);
    const data = Object.values(courseScores);

    return {
        labels: labels,
        datasets: [{
            label: 'Course Scores',
            backgroundColor: ['#28a745', '#dc3545', '#ffc107', '#17a2b8'], // Add more colors if needed
            borderColor: '#ffffff',
            borderWidth: 1,
            data: data
        }]
    };
}

// Function to update the assessment results chart
function updateAssessmentResultsChart(assessmentResultsData) {
    var assessmentResultsCtx = document.getElementById('assessmentResultsChart').getContext('2d');

    // Destroy the existing chart instance if it exists
    if (window.assessmentResultsChart instanceof Chart) {
        window.assessmentResultsChart.destroy();
    }

    // Create a new chart instance
    window.assessmentResultsChart = new Chart(assessmentResultsCtx, {
        type: 'pie',
        data: assessmentResultsData,
        options: {
            responsive: true,
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Assessment Results by Course'
            }
        }
    });
}

// Function to generate random colors for datasets
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Function to update user progress chart (existing function)
function updateUserProgressChart(labels, datasets) {
    var userProgressData = {
        labels: labels, // Array of course names
        datasets: datasets // Array of datasets for each status
    };

    var userProgressCtx = document.getElementById('userProgressChart').getContext('2d');

    if (window.userProgressChart instanceof Chart) {
        window.userProgressChart.destroy();
    }

    window.userProgressChart = new Chart(userProgressCtx, {
        type: 'bar',
        data: userProgressData,
        options: {
            scales: {
                x: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Courses'
                    }
                },
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Status'
                    },
                    ticks: {
                        callback: function(value, index, values) {
                            return ''; // Return an empty string to hide the label
                        }
                    }
                }
            }
        }
    });
}
