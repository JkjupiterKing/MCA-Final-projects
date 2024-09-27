document.addEventListener("DOMContentLoaded", function () {
  $("#mySidenav").load("../../app/sidebar/sidebar.html");
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedUsername = storedUser.username;

  fetchAssignedProjects(storedUsername);
  fetchNotifications();

  function fetchAssignedProjects(username) {
    const apiUrl = `http://localhost:8080/projects/byusername/${username}`;

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
      })
      .then((projects) => {
        const cardDeck = document.getElementById("cardDeck");
        cardDeck.innerHTML = "";

        if (projects.length === 0) {
          cardDeck.innerHTML = "<p>No assigned projects found.</p>";
          return;
        }

        projects.forEach((project) => {
          const card = document.createElement("div");
          card.className = "card mb-4 shadow-sm";
          card.innerHTML = `
            <div class="card-body d-flex flex-column">
              <div class="d-flex justify-content-between align-items-start">
                <div>
                  <h6 class="card-title">${project.title}</h6>
                  <p class="card-text text-muted">${project.description}</p>
                </div>
                <div class="progress" style="width: 30%;">
                  <div class="progress-bar" role="progressbar" style="width: ${project.progress}%" aria-valuenow="${project.progress}" aria-valuemin="0" aria-valuemax="100">${project.progress}%</div>
                </div>
              </div>
              <button class="btn btn-primary mt-3" onclick="openUpdateModal('${project.id}', '${project.title}', '${project.description}', '${project.status}', '${project.manager}', ${project.progress})" id="Update-btn">Update Progress</button>
              <p class="mt-2"><strong>Current Progress: ${project.progress}%</strong></p>
            </div>
          `;
          cardDeck.appendChild(card);
        });
      })
      .catch((error) => {
        console.error("Error fetching projects:", error);
        const cardDeck = document.getElementById("cardDeck");
        cardDeck.innerHTML = "<p>Projects not assigned.</p>";
      });
  }

  function fetchNotifications() {
    const apiUrl = `http://localhost:8080/announcements/all`;

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
      })
      .then((notifications) => {
        const notificationCount = document.getElementById("notificationCount");
        notificationCount.textContent = notifications.length;
      })
      .catch((error) => {
        console.error("Error fetching notifications:", error);
        const notificationCount = document.getElementById("notificationCount");
        notificationCount.textContent = "0";
      });
  }

  window.openUpdateModal = function (
    projectId,
    title,
    description,
    status,
    manager,
    currentProgress
  ) {
    document.getElementById("projectId").value = projectId;
    document.getElementById("projectProgress").value = currentProgress;

    // Store project details in local storage
    localStorage.setItem("projectTitle", title);
    localStorage.setItem("projectDescription", description);
    localStorage.setItem("projectStatus", status);
    localStorage.setItem("projectManager", manager);

    const updateModal = new bootstrap.Modal(
      document.getElementById("updateProgressModal")
    );
    updateModal.show();
  };

  // Add submit event listener to the update form
  document
    .getElementById("updateProgressForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      const projectId = document.getElementById("projectId").value;
      const progress = document.getElementById("projectProgress").value;

      // Retrieve project details from local storage
      const title = localStorage.getItem("projectTitle");
      const description = localStorage.getItem("projectDescription");
      const status = localStorage.getItem("projectStatus");
      const manager = localStorage.getItem("projectManager");

      const apiUrl = `http://localhost:8080/projects/update/${projectId}`;
      const data = {
        id: projectId,
        title: title,
        description: description,
        status: status,
        user: {
          username: storedUsername,
        },
        manager: manager,
        progress: progress,
      };

      fetch(apiUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              "Network response was not ok " + response.statusText
            );
          }
          return response.json();
        })
        .then(() => {
          alert("Project progress updated successfully!");
          fetchAssignedProjects(storedUsername); // Refresh the projects
          const updateModal = bootstrap.Modal.getInstance(
            document.getElementById("updateProgressModal")
          );
          updateModal.hide();
        })
        .catch((error) => {
          console.error("Error updating project:", error);
          alert("Failed to update project. Please try again.");
        });
    });

  // Add click event listener to the notification icon
  document
    .querySelector(".notification-container")
    .addEventListener("click", () => {
      window.location.href =
        "../../app/Announcements-Management/Announcements-Management.html";

      // Clear notification count and hide badge
      const notificationCount = document.getElementById("notificationCount");
      notificationCount.textContent = "0";
      notificationCount.style.display = "none";
    });
});
