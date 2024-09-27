const storedUser = JSON.parse(localStorage.getItem("user"));
const userRoleId = storedUser.roleId;

// Elements to show/hide based on user role
const allLinks = document.querySelectorAll(
  ".sidebar .links li:not(.logout-link)"
);

// Handle link visibility based on user role
if (userRoleId === 1) {
  // Admin role
  allLinks.forEach((link) => {
    if (link.id === "admin-management-link") {
      link.style.display = "flex";
    } else {
      link.style.display = "none";
    }
  });
} else if (userRoleId === 2) {
  // Role 2 specific links
  allLinks.forEach((link) => {
    if (
      link.id === "admin-management-link" ||
      link.classList.contains("Manager-management-link")
    ) {
      link.style.display = "flex";
    } else {
      link.style.display = "none";
    }
  });
} else if (userRoleId === 3) {
  // Role 3 specific links
  allLinks.forEach((link) => {
    if (
      link.id === "admin-management-link" ||
      link.classList.contains("Manager-management-link")
    ) {
      link.style.display = "flex";
    } else {
      link.style.display = "none";
    }
  });
} else if (userRoleId === 4) {
  // Role 4 specific links
  allLinks.forEach((link) => {
    if (
      link.id === "admin-management-link" ||
      link.classList.contains("Manager-management-link")
    ) {
      link.style.display = "flex";
    } else {
      link.style.display = "none";
    }
  });
} else if (userRoleId === 5) {
  // Show only Employee-management-links and manager-management-links for roleId 5
  allLinks.forEach((link) => {
    if (
      link.classList.contains("Employee-management-link") ||
      link.classList.contains("Manager-management-link")
    ) {
      link.style.display = "flex";
    } else {
      link.style.display = "none";
    }
  });
} else {
  // Hide all links if no valid roleId found
  allLinks.forEach((link) => (link.style.display = "none"));
}

// Handle logout link click
const logoutLink = document.querySelector(".logout-link a");
if (logoutLink) {
  logoutLink.addEventListener("click", function (event) {
    event.preventDefault();
    localStorage.removeItem("user");
    window.location.href = "../../app/Login/login.html";
  });
}
