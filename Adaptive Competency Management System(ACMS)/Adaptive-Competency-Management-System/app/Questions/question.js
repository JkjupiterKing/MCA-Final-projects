let enrollmentId;
let employeeId; // Variable to store employeeId

document.addEventListener('DOMContentLoaded', function () {
    // Retrieve course name from localStorage
    const courseName = localStorage.getItem('currentCourseName');
    enrollmentId = localStorage.getItem('currentEnrollmentId');
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (currentUser && currentUser.employeeId) {
        employeeId = currentUser.employeeId; // Retrieve employeeId from currentUser
    } else {
        console.error('No current user found or employee ID missing in localStorage.');
        return;
    }

    if (courseName) {
        // Fetch questions based on course name
        fetchQuestionsByCourseName(courseName);
    } else {
        console.error('No course name found in localStorage.');
    }

    // Ensure these values are not undefined or null
    if (enrollmentId === null || isNaN(enrollmentId)) {
        console.error('Invalid or missing enrollmentId');
        return;
    }
        var myModalEl = document.getElementById('resultsModal');
        myModalEl.addEventListener('hidden.bs.modal', function (event) {
            window.close();
        });
});

let correctAnswers = {}; // To store correct answers for comparison

function fetchQuestionsByCourseName(courseName) {
    // Replace with your actual API endpoint
    const apiUrl = `http://localhost:8080/questions/type/${courseName}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Assuming `data` is an array of questions
            const form = document.getElementById('questionsForm');
            form.innerHTML = ''; // Clear existing content
            correctAnswers = {}; // Clear correct answers

            let questionNumber = 1; // Initialize question number

            data.forEach(question => {
                const questionCard = document.createElement('div');
                questionCard.classList.add('card', 'question-card');

                const questionBody = document.createElement('div');
                questionBody.classList.add('card-body');

                const questionHeader = document.createElement('h5');
                questionHeader.classList.add('card-title');
                questionHeader.textContent = `${questionNumber}. ${question.questionText}`;

                questionBody.appendChild(questionHeader);

                // Store correct answer
                correctAnswers[questionNumber] = question.correctAnswer;

                // Extract options from the question object
                const options = [
                    { id: 'option1', text: question.option1 },
                    { id: 'option2', text: question.option2 },
                    { id: 'option3', text: question.option3 },
                    { id: 'option4', text: question.option4 }
                ];

                options.forEach(option => {
                    if (option.text) { // Only add options that have text
                        const formCheck = document.createElement('div');
                        formCheck.classList.add('form-check');

                        const input = document.createElement('input');
                        input.classList.add('form-check-input');
                        input.type = 'radio';
                        input.name = `question${questionNumber}`; // Use questionNumber for unique names
                        input.id = `${questionNumber}-${option.id}`;
                        input.value = option.text;

                        const label = document.createElement('label');
                        label.classList.add('form-check-label', 'radio-label');
                        label.htmlFor = input.id;
                        label.textContent = option.text;

                        formCheck.appendChild(input);
                        formCheck.appendChild(label);

                        questionBody.appendChild(formCheck);
                    }
                });

                questionCard.appendChild(questionBody);
                form.appendChild(questionCard);
                questionNumber++; // Increment the question number
            });

            // Create and append the submit button if it doesn't already exist
            let submitButton = document.querySelector('.submit-button');
            if (!submitButton) {
                submitButton = document.createElement('button');
                submitButton.type = 'button'; // Change type to 'button'
                submitButton.classList.add('btn', 'btn-primary', 'submit-button');
                submitButton.textContent = 'Submit';
                submitButton.addEventListener('click', evaluateAnswers); // Add event listener
                form.appendChild(submitButton);
            }

            // Add keydown event listener for keyboard navigation
            document.addEventListener('keydown', handleKeyDown);
        })
        .catch(error => {
            alert('Failed to load questions. Please try again later.');
            console.error('There was a problem with the fetch operation:', error);
        });
}

function handleKeyDown(event) {
    const key = event.key;
    const focusedElement = document.activeElement;
    
    if (focusedElement && focusedElement.type === 'radio') {
        const currentRadio = focusedElement;
        const form = document.getElementById('questionsForm');
        const radios = Array.from(form.querySelectorAll(`input[type="radio"][name="${currentRadio.name}"]`));
        const currentIndex = radios.indexOf(currentRadio);

        let newIndex;

        if (key === 'ArrowDown' || key === 'ArrowRight') {
            newIndex = (currentIndex + 1) % radios.length;
        } else if (key === 'ArrowUp' || key === 'ArrowLeft') {
            newIndex = (currentIndex - 1 + radios.length) % radios.length;
        } else {
            return; // Exit if key is not ArrowDown, ArrowUp, ArrowRight, or ArrowLeft
        }

        radios[newIndex].focus(); // Move focus to the new radio button
        event.preventDefault(); // Prevent default scrolling behavior
    }
}

function evaluateAnswers() {
    const form = document.getElementById('questionsForm');
    const userAnswers = {};
    let attemptedQuestions = 0;
    let correctAnswersCount = 0;

    // Collect user answers
    form.querySelectorAll('.form-check-input:checked').forEach(input => {
        const questionNumber = input.name.replace('question', '');
        userAnswers[questionNumber] = input.value;
    });

    // Calculate results
    Object.keys(correctAnswers).forEach(questionNumber => {
        const correctAnswer = correctAnswers[questionNumber];
        const userAnswer = userAnswers[questionNumber] || 'Not Answered';

        if (userAnswer !== 'Not Answered') {
            attemptedQuestions++;
        }

        if (userAnswer === correctAnswer) {
            correctAnswersCount++;
        }
    });

    // Calculate score
    const totalQuestions = Object.keys(correctAnswers).length;
    const percentage = (correctAnswersCount / totalQuestions) * 100;

    // Prepare data to post
    const postData = {
        enrollment: {enrollmentId: parseInt(enrollmentId)}, // Ensure it is a number
        employee: {employeeId: parseInt(employeeId)}, // Add employeeId to postData
        score: `${correctAnswersCount}/5`, // Format score as a string
        attemptNumber: 1, // Adjust if necessary
        assessmentDate: new Date().toISOString(), // Current date in ISO format
        userAnswers: JSON.stringify(userAnswers), // Convert user answers to JSON string
        percentage: percentage
    };

    // Post the result data with IDs as part of the JSON body
    postResults(postData);
    showResultsInModal(postData)
}

function postResults(postData) {
    const apiUrl = 'http://localhost:8080/assessment-results/addassessmentresults';

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
    })
    .then(response => {
        if (!response.ok) {
            return response.text().then(text => { throw new Error(text); });
        }
        return response.json();
    })
    .then(data => {
        console.log('Results submitted successfully:', data);
        alert('Results submitted successfully!');
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        alert('Failed to submit results. Please try again later.');
    });
}

function showResultsInModal(result) {
    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = ''; // Clear previous content
    const courseName  = localStorage.getItem('currentCourseName')
    var comments = `You are an expert in ${courseName}! Learn other courses`
    if(result.percentage>=80) {
        comments = `You are an expert in ${courseName}! Learn other courses`
    } else if (result.percentage>=60) {
        comments = `You have Good knowledge in ${courseName}, However, you can strengthen the knowledge by taking the course again`
    } else if (result.percentage>=40) {
        comments = `Your knowledge in the  ${courseName} is very basic, please strengthen the knowledge by taking the course again`
    } else if (result.percentage>=20) {
        comments = `Your knowledge in the  ${courseName} is not satisfactory, You must take the course again`
    } else if (result.percentage>=0) {
        comments = `Results are too low to generate adaptive feedback. You must take the course again and retry the assessment`
    } else {
         comments = `Evaluation was not possible for ${courseName}! Enjoy your learning`
        
    }
    // results.forEach(result => {
        const resultHtml = `
            <p><strong>Course:</strong> ${courseName}</p>
            <p><strong>Score:</strong> ${result.score}</p>
            <p><strong>Percentage:</strong> ${result.percentage}</p>
            <p><strong>Comments:</strong> ${comments}</p>
            <hr>
        `;
        modalBody.innerHTML += resultHtml;
    // });

    const myModal = new bootstrap.Modal(document.getElementById('resultsModal'));
    myModal.show();
    localStorage.removeItem('currentCourseName');
    localStorage.removeItem('currentEnrollmentId');
}
