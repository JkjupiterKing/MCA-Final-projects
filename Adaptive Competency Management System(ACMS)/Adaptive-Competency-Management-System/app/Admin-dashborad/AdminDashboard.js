$('#mySidenav').load('../../app/admin-Sidenav/adminsidenav.html');

document.addEventListener('DOMContentLoaded', function() {

    const apiEndpoints = {
        totalCourses: 'http://localhost:8080/courses',
        totalUsers: 'http://localhost:8080/employees',
        totalEnrolledCourses: 'http://localhost:8080/enrollments/all',
        totalCoursesInProgress: 'http://localhost:8080/enrollments/all',
        totalCoursesCompleted: 'http://localhost:8080/enrollments/all',
        totalAssessmentsTaken: 'http://localhost:8080/assessment-results/all'
    };

    // Function to update dashboard data
    function updateDashboard() {
        // Fetch and update total courses published
        fetch(apiEndpoints.totalCourses)
            .then(response => response.json())
            .then(data => {
                document.getElementById('TotalCoursesFound').textContent = data.length || '0';
            })
            .catch(error => console.error('Error fetching total courses:', error));

        // Fetch and update total registered users, excluding those with position "Admin"
        fetch(apiEndpoints.totalUsers)
            .then(response => response.json())
            .then(data => {
                const filteredUsers = data.filter(user => user.position !== 'Admin');
                document.getElementById('TotalregisteredUserFound').textContent = filteredUsers.length || '0';
            })
            .catch(error => console.error('Error fetching total users:', error));

        // Fetch and update total courses enrolled by all users
        fetch(apiEndpoints.totalEnrolledCourses)
            .then(response => response.json())
            .then(data => {
                const filteredenrollments = data.filter(enrollment => enrollment.status === 'Enrolled');
                document.getElementById('TotalenrolledCoursesFound').textContent = filteredenrollments.length || '0';
            })
            .catch(error => console.error('Error fetching total enrolled courses:', error));

        // Fetch and update total courses in-progress by all users
        fetch(apiEndpoints.totalCoursesInProgress)
            .then(response => response.json())
            .then(data => {
                const filteredInProgressCourses = data.filter(enrollment => enrollment.status === 'Ongoing');
                document.getElementById('totalCoursesInProgress').textContent = filteredInProgressCourses.length || '0';
            })
            .catch(error => console.error('Error fetching total courses in progress:', error));

        // Fetch and update total courses completed by all users
        fetch(apiEndpoints.totalCoursesCompleted)
            .then(response => response.json())
            .then(data => {
                const filteredCompletedCourses = data.filter(enrollment => enrollment.status === 'Completed');
                document.getElementById('totalCoursesCompleted').textContent = filteredCompletedCourses.length || '0';
            })
            .catch(error => console.error('Error fetching total courses completed:', error));

        // Fetch and update total assessments taken by all users
        fetch(apiEndpoints.totalAssessmentsTaken)
            .then(response => response.json())
            .then(data => {
                document.getElementById('totalAssessmentsTaken').textContent = data.length || '0';
            })
            .catch(error => console.error('Error fetching total assessments taken:', error));
    }

    updateDashboard();
});


