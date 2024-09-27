let projects = [];

// Load sidebar content
$("#mySidenav").load("../../app/sidebar/sidebar.html");

document.addEventListener("DOMContentLoaded", function () {
  const localStorageUser = JSON.parse(localStorage.getItem("user"));
  const localStorageRole = localStorageUser.roleName;
  const localStorageRoleId = localStorageUser.roleId;
  const localStorageUsername = localStorageUser.username;

  if (
    localStorageRole === "Manager" &&
    localStorageRoleId === 2 &&
    localStorageUsername
  ) {
    fetchManagedUsers(localStorageUsername);
  } else {
    displayNoTeamMessage();
  }

  // Fetch all projects on page load
  fetchAllProjects();
});

// Function to fetch all projects
function fetchAllProjects() {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "http://localhost:8080/projects/all", true);
  xhr.onload = function () {
    if (xhr.status === 200) {
      projects = JSON.parse(xhr.responseText);
    } else {
      console.error("Error fetching projects:", xhr.statusText);
    }
  };
  xhr.onerror = function () {
    console.error("Request failed");
  };
  xhr.send();
}

// Function to fetch users managed by a specific manager
function fetchManagedUsers(managerUsername) {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "http://localhost:8080/users/all");
  xhr.onload = function () {
    if (xhr.status === 200) {
      const allUsers = JSON.parse(xhr.responseText);
      const managedUsers = allUsers.filter(
        (user) => user.manager === managerUsername
      );
      fetchProjectDetails(managedUsers);
    } else {
      console.error("Error fetching users:", xhr.statusText);
    }
  };
  xhr.onerror = function () {
    console.error("Request failed");
  };
  xhr.send();
}

// Function to display a message when the user is not a manager
function displayNoTeamMessage() {
  const mainContent = document.querySelector("main");
  mainContent.innerHTML = `<h1>You are not a Manager</h1>
    <p>You have no team members to manage.</p>`;
}

// Function to fetch project details for the managed users
function fetchProjectDetails(managedUsers) {
  if (managedUsers.length === 0) {
    displayProjects([]); // No users to display
    return;
  }

  const projectPromises = managedUsers.map((user) => {
    return new Promise((resolve) => {
      const xhr = new XMLHttpRequest();
      xhr.open(
        "GET",
        `http://localhost:8080/projects/byusername/${user.username}`
      );
      xhr.onload = function () {
        if (xhr.status === 200) {
          const userProjects = JSON.parse(xhr.responseText);
          resolve({ username: user.username, projects: userProjects });
        } else {
          console.error("Error fetching projects:", xhr.statusText);
          resolve({ username: user.username, projects: [] });
        }
      };
      xhr.onerror = function () {
        console.error("Request failed");
        resolve({ username: user.username, projects: [] });
      };
      xhr.send();
    });
  });

  Promise.all(projectPromises).then((results) => {
    displayProjects(results);
  });
}

// Function to display projects in the table
function displayProjects(results) {
  const tableBody = document.getElementById("ManageTeamTableData");
  tableBody.innerHTML = ""; // Clear previous data

  if (results.length === 0) {
    const row = `<tr><td colspan="5">No projects found.</td></tr>`;
    tableBody.insertAdjacentHTML("beforeend", row);
    return;
  }

  results.forEach(({ username, projects }) => {
    if (projects.length === 0) {
      const row = `<tr><td>${username}</td><td colspan="4">No projects found.</td></tr>`;
      tableBody.insertAdjacentHTML("beforeend", row);
      return;
    }

    projects.forEach((project) => {
      const row = `
        <tr>
          <td>${username}</td>
          <td>${project.title}</td>
          <td>${project.description}</td>
          <td>${project.status}</td>
          <td>
            <button type="button" class="btn btn-primary btn-sm btn-update" data-username="${username}" data-project-id="${project.id}">Update</button>
          </td>
        </tr>`;
      tableBody.insertAdjacentHTML("beforeend", row);
    });
  });

  // Attach update button listeners
  attachUpdateButtonListeners();
}

// Attach event listeners to update buttons
function attachUpdateButtonListeners() {
  document.querySelectorAll(".btn-update").forEach((button) => {
    button.addEventListener("click", function () {
      const projectId = this.getAttribute("data-project-id");
      const username = this.getAttribute("data-username");
      fetchProjectsForDropdown(projectId, username);
      const updateModal = new bootstrap.Modal(document.getElementById("Modal"));
      updateModal.show();
    });
  });
}

// Populate project dropdown when modal is opened
function fetchProjectsForDropdown(selectedProjectId, username) {
  const dropdown = document.getElementById("updateprojectname");
  dropdown.innerHTML = '<option value="">Select a project</option>';

  // Populate dropdown with projects from the global variable
  projects.forEach((project) => {
    const option = document.createElement("option");
    option.value = project.id;
    option.textContent = project.title;
    dropdown.appendChild(option);
  });

  // Set the selected project in the dropdown
  if (selectedProjectId) {
    dropdown.value = selectedProjectId;
    const project = projects.find((p) => p.id == selectedProjectId);
    if (project) {
      // Set the project details in the modal
      document.getElementById("updateprojectid").value = project.id; // Store project ID for update
      // Optionally, you can log project details or do any additional operations here
    }
  }

  // Attach change event to the dropdown
  dropdown.addEventListener("change", function () {
    if (this.value) {
      const selectedProject = projects.find((p) => p.id == this.value);
      if (selectedProject) {
        // Optionally handle project selection change
      }
    } else {
      clearProjectDetails();
    }
  });
}

document
  .getElementById("UpdateProjectForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const selectedProjectId = document.getElementById("updateprojectid").value;
    console.log("Selected Project ID:", selectedProjectId);

    const button = document.querySelector(
      `.btn-update[data-project-id='${selectedProjectId}']`
    );

    if (!button) {
      console.error("No button found for the selected project ID");
      return;
    }

    const selectedRow = button.closest("tr");
    const employeeName = selectedRow.cells[0].textContent; // Assuming the employee name is in the first cell

    // Find the project object from the projects array
    const project = projects.find((p) => p.id == selectedProjectId);

    if (!project) {
      console.error("Project not found for the given ID");
      return;
    }

    const updatedProject = {
      id: selectedProjectId,
      title: project.title,
      description: project.description,
      status: project.status,
      user: {
        username: employeeName,
      },
      progress: 0,
    };

    console.log(updatedProject);
    console.log(
      "Updating Project with payload:",
      JSON.stringify(updatedProject)
    ); // Log payload

    const xhr = new XMLHttpRequest();
    xhr.open(
      "PUT",
      `http://localhost:8080/projects/update/${selectedProjectId}`,
      true
    );
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onload = function () {
      if (xhr.status === 200) {
        alert("Project updated successfully!");
        fetchManagedUsers(localStorageUsername);
        updateModal.hide();
      } else {
        console.error(
          "Error updating project:",
          xhr.statusText,
          xhr.responseText
        ); // Log response text
        alert("Failed to update project. Please try again.");
      }
    };
    xhr.onerror = function () {
      console.error("Request failed");
      alert("An error occurred while updating the project.");
    };
    xhr.send(JSON.stringify(updatedProject));
  });
