$(document).ready(function() {
    $('#mySidenav').load('../../app/sidebar/sidebar.html');

    const User = JSON.parse(localStorage.getItem('user'));
    const RoleId = User.roleId;

    // Constants for pagination
    const pageSize = 10; // Number of feedbacks per page
    let currentPage = 1; // Initialize current page
    let totalPages = 0; // Variable to hold total pages
    let feedbacks = []; // Global variable to store feedback data

    // Fetch feedbacks from the server
    function fetchFeedback() {
        fetch('http://localhost:8080/feedback/all')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                feedbacks = data; // Store feedbacks in global variable
                totalPages = Math.ceil(feedbacks.length / pageSize);
                displayFeedback(); // Display feedbacks for the current page
            })
            .catch(error => {
                console.error('Error fetching feedback:', error);
                // Handle error as needed
            });
    }

    // Display feedbacks in the table
    function displayFeedback() {
        const tableBody = document.getElementById('ManageFeedbackTableData');
        tableBody.innerHTML = '';

        // Calculate pagination variables
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const pageFeedbacks = feedbacks.slice(startIndex, endIndex);

        pageFeedbacks.forEach((feedback, index) => {
            const row = `<tr data-feedback-id="${feedback.feedbackId}">
                <td>${startIndex + index + 1}</td>
                <td>${feedback.question}</td>
                <td>${feedback.description}</td>
            </tr>`;
            tableBody.insertAdjacentHTML('beforeend', row);
        });

        updatePagination(); // Update pagination links
    }

    // Update pagination links
    function updatePagination() {
        const pagination = document.getElementById('pagination');
        let paginationHtml = '';

        for (let i = 1; i <= totalPages; i++) {
            paginationHtml += `<li class="page-item ${currentPage === i ? 'active' : ''}">
                <a class="page-link" href="#" onclick="gotoPage(${i})">${i}</a>
            </li>`;
        }

        pagination.innerHTML = paginationHtml;
    }

    // Go to a specific page
    window.gotoPage = function(pageNumber) {
        currentPage = pageNumber; // Update current page
        displayFeedback(); // Display feedbacks for the selected page
    };

    // Event listener for showing manage feedback (display table)
    const manageBtn = document.getElementById('manage-btn');
    if (manageBtn) {
        manageBtn.addEventListener('click', function() {
            displayManageFeedbacks();
        });
    }

    // Event listener for showing add new feedback form (display form)
    const addBtn = document.getElementById('add-btn');
    if (addBtn) {
        addBtn.addEventListener('click', function() {
            displayAddFeedbackForm(); // Display add feedback form
        });
    }

    // Display add feedback form
    function displayAddFeedbackForm() {
        document.getElementById('AddFeedbackForm').style.display = 'block';
        document.getElementById('add-btn').style.display = 'none';
        document.getElementById('searchInput').style.display = 'none';
        document.getElementById('FeedbackSystemTitle').style.display = 'none';
        document.getElementById('DisplayFeedbackList').style.display = 'none';
        document.getElementById('manage-btn').style.display = 'block';
        document.getElementById('pagination').style.display = 'none';
    }

    // Display manage feedbacks table
    function displayManageFeedbacks() {
        document.getElementById('AddFeedbackForm').style.display = 'none';
        document.getElementById('add-btn').style.display = 'block';
        document.getElementById('searchInput').style.display = 'block';
        document.getElementById('FeedbackSystemTitle').style.display = 'block';
        document.getElementById('DisplayFeedbackList').style.display = 'table';
        document.getElementById('manage-btn').style.display = 'none';
        fetchFeedback(); // Fetch feedback when displaying the table
    }

    // Role-based visibility
    if (RoleId === 5) {
        document.getElementById('add-btn').style.display = 'block';
        document.getElementById('manage-btn').style.display = 'none';
    } else {
        document.getElementById('manage-btn').style.display = 'none';
        document.getElementById('add-btn').style.display = 'none';     
    }

    // Code for adding feedback to the database
    const form = document.getElementById('feedbackForm');
    const apiEndpoint = 'http://localhost:8080/feedback/addFeedback'; // Replace with your actual API endpoint

    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent the default form submission

        const feedbackQuestion = "How do you rate the Quarter cycle Apprasial?"

        // Get the feedback text from the input field
        const feedbackText = document.getElementById('feedback').value;

        // Create the feedback object
        const feedback = {
            question: feedbackQuestion,
            description: feedbackText,
        };

        try {
            // Post the data to the API
            const response = await fetch(apiEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(feedback),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            // Handle the response
            const result = await response.json();
            console.log('Feedback submitted successfully:', result);

            // Optionally, handle successful submission (e.g., show a message, clear the form, etc.)
            form.reset();
            alert('Feedback submitted successfully');
            displayManageFeedbacks(); // Reload the feedback list after submission
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
            alert('There was a problem submitting your feedback');
        }
    });

    // Fetch feedback initially
    fetchFeedback();
});
