// Load sidebar
$("#mySidenav").load("../../app/sidebar/sidebar.html");

document.addEventListener("DOMContentLoaded", function () {
  const User = JSON.parse(localStorage.getItem("user"));
  const RoleId = User.roleId;
  const rolename = User.roleName;
  const username = User.username;

  // Constants for pagination
  const pageSize = 10;
  let currentPage = 1;
  let totalPages = 0;
  let feedbacks = [];

  // Fetch feedbacks from the server
  function fetchFeedback() {
    fetch("http://localhost:8080/feedback/all")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        feedbacks = data;
        totalPages = Math.ceil(feedbacks.length / pageSize);
        displayFeedback();
      })
      .catch((error) => {
        console.error("Error fetching feedback:", error);
      });
  }

  // Fetch feedback questions from the server and filter by "Admin"
  function fetchFeedbackQuestions() {
    fetch("http://localhost:8080/feedback/all")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((questions) => {
        // Filter questions where addedBy is "Admin"
        const adminQuestions = questions.filter(
          (question) => question.addedBy === "Admin"
        );

        const dropdown = document.getElementById("feedbackQuestionDropdown");
        dropdown.innerHTML =
          '<option value="" disabled selected>Select a question</option>';

        adminQuestions.forEach((question) => {
          const option = document.createElement("option");
          option.value = question.id;
          option.textContent = question.question;
          dropdown.appendChild(option);
        });
      })
      .catch((error) => {
        console.error("Error fetching feedback questions:", error);
      });
  }

  // Display feedbacks in the table
  function displayFeedback() {
    const tableBody = document.getElementById("ManageFeedbackTableData");
    tableBody.innerHTML = "";

    // Calculate pagination variables
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const pageFeedbacks = feedbacks.slice(startIndex, endIndex);

    pageFeedbacks.forEach((feedback) => {
      const row = document.createElement("tr");
      row.setAttribute("data-feedback-id", feedback.feedbackId);
      row.innerHTML = `
          <td>${feedback.question}</td>
          <td>${feedback.answer}</td>
          <td>${feedback.username}</td>
        `;
      tableBody.appendChild(row);
    });

    updatePagination();
  }

  // Update pagination links
  function updatePagination() {
    const pagination = document.getElementById("pagination");
    pagination.innerHTML = "";

    for (let i = 1; i <= totalPages; i++) {
      const li = document.createElement("li");
      li.className = `page-item ${currentPage === i ? "active" : ""}`;
      li.innerHTML = `<a class="page-link" href="#" onclick="gotoPage(${i})">${i}</a>`;
      pagination.appendChild(li);
    }
  }

  // Go to a specific page
  window.gotoPage = function (pageNumber) {
    currentPage = pageNumber;
    displayFeedback();
  };

  // Event listener for showing manage feedback (display table)
  const manageBtn = document.getElementById("manage-btn");
  if (manageBtn) {
    manageBtn.addEventListener("click", displayManageFeedbacks);
  }

  // Event listener for showing add new feedback form (display form)
  const addBtn = document.getElementById("add-btn");
  if (addBtn) {
    addBtn.addEventListener("click", displayAddFeedbackForm);
  }

  // Display add feedback form
  function displayAddFeedbackForm() {
    document.getElementById("AddFeedbackForm").style.display = "block";
    document.getElementById("add-btn").style.display = "none";
    document.getElementById("searchInput").style.display = "none";
    document.getElementById("FeedbackSystemTitle").style.display = "none";
    document.getElementById("DisplayFeedbackList").style.display = "none";
    document.getElementById("manage-btn").style.display = "block";
    document.getElementById("pagination").style.display = "none";

    // Fetch the feedback questions
    fetchFeedbackQuestions();
  }

  // Display manage feedbacks table
  function displayManageFeedbacks() {
    document.getElementById("AddFeedbackForm").style.display = "none";
    document.getElementById("add-btn").style.display = "block";
    document.getElementById("searchInput").style.display = "block";
    document.getElementById("FeedbackSystemTitle").style.display = "block";
    document.getElementById("DisplayFeedbackList").style.display = "table";
    document.getElementById("manage-btn").style.display = "none";
    fetchFeedback();
  }

  // Role-based visibility
  if (RoleId === 5) {
    document.getElementById("add-btn").style.display = "block";
    document.getElementById("manage-btn").style.display = "none";
    document.getElementById("create-feedback-btn-group").style.display = "none";
  } else {
    document.getElementById("manage-btn").style.display = "none";
    document.getElementById("add-btn").style.display = "none";
    document.getElementById("create-feedback-btn-group").style.display =
      "block";
  }

  // Code for adding feedback to the database
  const form = document.getElementById("feedbackForm");
  const apiEndpoint = "http://localhost:8080/feedback/addFeedback";

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const selectedQuestionId = document.getElementById(
      "feedbackQuestionDropdown"
    ).value;
    const feedbackText = document.getElementById("feedback").value;

    const feedback = {
      question: selectedQuestionId,
      answer: feedbackText,
      addedBy: rolename,
      username: username,
    };

    try {
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(feedback),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log("Feedback submitted successfully:", result);

      form.reset();
      alert("Feedback submitted successfully");
      displayManageFeedbacks();
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      alert("There was a problem submitting your feedback");
    }
  });

  // Handle modal submission for creating feedback question
  const modalForm = document.getElementById("modalFeedbackForm");
  const modalSubmitBtn = document.getElementById("modalSubmitBtn");

  modalSubmitBtn.addEventListener("click", async () => {
    const feedbackQuestion = document.getElementById("modalFeedback").value;

    const feedback = {
      question: feedbackQuestion,
      answer: null,
      addedBy: rolename,
      username: username,
    };

    try {
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(feedback),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log("Feedback question added successfully:", result);

      // Reset modal form
      modalForm.reset();
      alert("Feedback question added successfully");
      $("#feedbackModal").modal("hide");
      fetchFeedback();
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      alert("There was a problem adding the feedback question");
    }
  });

  fetchFeedback();
});
