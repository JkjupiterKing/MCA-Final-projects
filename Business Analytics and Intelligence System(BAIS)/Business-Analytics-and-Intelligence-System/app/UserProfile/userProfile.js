document.addEventListener('DOMContentLoaded', function() {
    $('#mySidenav').load('../../app/sidebar/sidebar.html');


    function populateForm(user) {
        document.getElementById('fullName').value = user.username || '';
        document.getElementById('email').value = user.email || '';
        document.getElementById('phone').value = user.phone || '';
        document.getElementById('address').value = user.address || '';
        document.getElementById('password').value = user.password || '';
    }

    // Fetch user details using userId from localStorage
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const userId = storedUser ? storedUser.userId : null;

    if (userId) {
        fetch(`http://localhost:8080/users/${userId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch user details.');
            }
            return response.json();
        })
        .then(data => {
            if (data.userId) {
                populateForm(data);
            } else {
                console.log('Failed to fetch user details.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    let isEditing = false;

    // Edit button click event
    document.getElementById('editButton').addEventListener('click', function() {
        if (isEditing) {
            const updatedUser = {
                username: document.getElementById('fullName').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                address: document.getElementById('address').value,
                password: document.getElementById('password').value
            };

            // Use the userId in the update URL
            fetch(`http://localhost:8080/users/update/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedUser)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to update user details.');
                }
                return response.json();
            })
            .then(data => {
                if (data.userId) {
                    populateForm(data);
                    alert('User details updated successfully.');
                } else {
                    alert('Failed to update user details.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('An error occurred while updating user details.');
            });

            this.textContent = 'Edit';
            toggleFormFields(true);
        } else {
            toggleFormFields(false);
            this.textContent = 'Save';
        }

        isEditing = !isEditing;
    });

    toggleFormFields(true);
});

function toggleFormFields(disabled) {
    const inputs = document.querySelectorAll('#profileForm input');
    inputs.forEach(input => input.disabled = disabled);
}
