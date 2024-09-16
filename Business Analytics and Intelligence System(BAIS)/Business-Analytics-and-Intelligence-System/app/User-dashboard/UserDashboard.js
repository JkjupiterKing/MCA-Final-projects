document.addEventListener('DOMContentLoaded', function() {
    
    $('#mySidenav').load('../../app/sidebar/sidebar.html');
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const storedUsername = storedUser.username;

    fetchAssignedProjects(storedUsername);
    fetchNotifications();

    function fetchAssignedProjects(username) {
        const apiUrl = `http://localhost:8080/projects/byusername/${username}`;

        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(projects => {
                const cardDeck = document.querySelector('.card-deck');
                cardDeck.innerHTML = '';

                if (projects.length === 0) {
                    cardDeck.innerHTML = '<p>No assigned projects found.</p>';
                    return;
                }

                // Populate the card deck with projects
                projects.forEach(project => {
                    const card = document.createElement('div');
                    card.className = 'card mb-4';
                    card.innerHTML = `
                        <div class="card-body">
                            <h6 class="card-title">${project.title}</h6>
                            <p class="card-text">${project.description}</p>
                        </div>
                    `;
                    cardDeck.appendChild(card);
                });
            })
            .catch(error => {
                console.error('Error fetching projects:', error);
                const cardDeck = document.querySelector('.card-deck');
                cardDeck.innerHTML = '<p>There was an error fetching the projects.</p>';
            });
    }
    function fetchNotifications() {
        const apiUrl = `http://localhost:8080/announcements/all`;

        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(notifications => {
                const notificationCount = document.getElementById('notificationCount');
                notificationCount.textContent = notifications.length;
            })
            .catch(error => {
                console.error('Error fetching notifications:', error);
                const notificationCount = document.getElementById('notificationCount');
                notificationCount.textContent = '0'; 
            });
        }
    // Add click event listener to the notification icon
    document.querySelector('.notification-container').addEventListener('click', () => {
        window.location.href = '../../app/Announcements-Management/Announcements-Management.html';

        // Clear notification count and hide badge
        const notificationCount = document.getElementById('notificationCount');
        notificationCount.textContent = '0';
        notificationCount.style.display = 'none';
    });
});
