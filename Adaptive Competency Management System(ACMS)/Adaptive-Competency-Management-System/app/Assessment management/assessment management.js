document.addEventListener('DOMContentLoaded', function () {
    $('#mySidenav').load('../../app/admin-Sidenav/adminsidenav.html');
    fetchCourseNames(); 
    document.getElementById('selectCourse').addEventListener('change', fetchQuestions);

    document.getElementById('addQuestionForm').addEventListener('submit', function (event) {
        event.preventDefault();
        addQuestion();
    });
    
    document.getElementById('updateQuestionForm').addEventListener('submit', function (event) {
        event.preventDefault();
        updateQuestion();
    });

    // Event listener to populate course dropdown in the Add Modal when it's shown
    document.getElementById('addModal').addEventListener('show.bs.modal', function () {
        populateAddModalCourseOptions();
    });

    // Event listener to reset the Add Modal form after it is hidden
    document.getElementById('addModal').addEventListener('hidden.bs.modal', function () {
        document.getElementById('addQuestionForm').reset();
    });
});

function fetchCourseNames() {
    const apiUrl = 'http://localhost:8080/courses';

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            populateCourseOptions(data);
        })
        .catch(error => {
            console.error('Error fetching course names:', error);
        });
}

function populateCourseOptions(courses) {
    const selectCourse = document.getElementById('selectCourse');
    selectCourse.innerHTML = '<option value="" selected disabled>Select a Course</option>'; 
    courses.forEach(course => {
        const option = document.createElement('option');
        option.value = course.courseName;
        option.textContent = course.courseName;
        selectCourse.appendChild(option);
    });
}

function populateAddModalCourseOptions() {
    const apiUrl = 'http://localhost:8080/courses';

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const addCourseSelect = document.getElementById('addCourse');
            addCourseSelect.innerHTML = '<option value="" selected disabled>Select a Course</option>';
            data.forEach(course => {
                const option = document.createElement('option');
                option.value = course.courseName;
                option.textContent = course.courseName;
                addCourseSelect.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Error fetching course names for add modal:', error);
        });
}

function fetchQuestions() {
    const courseName = document.getElementById('selectCourse').value;
    if (!courseName) return; 

    const apiUrl = `http://localhost:8080/questions/type/${courseName}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            populateQuestionsTable(data);
        })
        .catch(error => {
            console.error('Error fetching questions:', error);
        });
}

function populateQuestionsTable(questions) {
    const tableBody = document.getElementById('questionsTableBody');
    tableBody.innerHTML = ''; 

    questions.forEach((question, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${question.questionText}</td>
            <td>${question.option1}</td>
            <td>${question.option2}</td>
            <td>${question.option3}</td>
            <td>${question.option4}</td>
            <td>${question.correctAnswer}</td>
            <td>
                <button class="btn btn-primary" onclick="editQuestion(${question.id})" id="Update-btn">Update</button>
                <button class="btn btn-danger" onclick="deleteQuestion(${question.id})">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function addQuestion() {
    const questionText = document.getElementById('addQuestionText').value.trim();
    const option1 = document.getElementById('addOption1').value.trim();
    const option2 = document.getElementById('addOption2').value.trim();
    const option3 = document.getElementById('addOption3').value.trim();
    const option4 = document.getElementById('addOption4').value.trim();
    const correctAnswer = document.getElementById('addCorrectAnswer').value.trim();
    const typeOfQuestion = document.getElementById('addCourse').value; 

    if (questionText && option1 && option2 && option3 && option4 && correctAnswer && typeOfQuestion) {
        const apiUrl = 'http://localhost:8080/questions/addQuestion'; 
        const questionData = {
            questionText: questionText,
            option1: option1,
            option2: option2,
            option3: option3,
            option4: option4,
            correctAnswer: correctAnswer,
            typeOfQuestion: typeOfQuestion
        };

        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(questionData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Question added successfully:', data);
            alert("Question added successfully!");
            fetchQuestions(); 
            window.location.reload();
            new bootstrap.Modal(document.getElementById('addModal')).hide(); 
        })
        .catch(error => {
            console.error('Error adding question:', error);
            alert('Error adding question. Please try again.');
        });
    } else {
        alert('Please fill in all fields.');
    }
}

function editQuestion(questionId) {
    const apiUrl = `http://localhost:8080/questions/${questionId}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(question => {
            document.getElementById('updateQuestionId').value = question.id;
            document.getElementById('updateQuestionText').value = question.questionText;
            document.getElementById('updateOption1').value = question.option1;
            document.getElementById('updateOption2').value = question.option2;
            document.getElementById('updateOption3').value = question.option3;
            document.getElementById('updateOption4').value = question.option4;
            document.getElementById('updateCorrectAnswer').value = question.correctAnswer;

            new bootstrap.Modal(document.getElementById('updateModal')).show();
        })
        .catch(error => {
            console.error('Error fetching question details:', error);
        });
}

function updateQuestion() {
    const questionId = document.getElementById('updateQuestionId').value;
    const questionText = document.getElementById('updateQuestionText').value.trim();
    const option1 = document.getElementById('updateOption1').value.trim();
    const option2 = document.getElementById('updateOption2').value.trim();
    const option3 = document.getElementById('updateOption3').value.trim();
    const option4 = document.getElementById('updateOption4').value.trim();
    const correctAnswer = document.getElementById('updateCorrectAnswer').value.trim();
    const typeOfQuestion = document.getElementById('selectCourse').value; 

    if (questionId && questionText && option1 && option2 && option3 && option4 && correctAnswer && typeOfQuestion) {
        const apiUrl = `http://localhost:8080/questions/${questionId}`;
        const questionData = {
            questionText: questionText,
            option1: option1,
            option2: option2,
            option3: option3,
            option4: option4,
            correctAnswer: correctAnswer,
            typeOfQuestion: typeOfQuestion
        };

        fetch(apiUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(questionData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Question updated successfully:', data);
            alert("Question updated successfully!");
            new bootstrap.Modal(document.getElementById('updateModal')).hide(); 
            window.location.reload();
            fetchQuestions(); 
        })
        .catch(error => {
            console.error('Error updating question:', error);
            alert('Error updating question. Please try again.');
        });
    } else {
        alert('Please fill in all fields.');
    }
}

function deleteQuestion(questionId) {
    const confirmed = window.confirm("Are you sure you want to delete this question?");

    if (confirmed) {
        const apiUrl = `http://localhost:8080/questions/${questionId}`;

        fetch(apiUrl, {
            method: 'DELETE'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            console.log('Question deleted successfully');
            alert("Question deleted successfully!");
            fetchQuestions(); 
        })
        .catch(error => {
            console.error('Error deleting question:', error);
            alert('Error deleting question. Please try again.');
        });
    } else {
        console.log('Deletion cancelled by user.');
    }
}
