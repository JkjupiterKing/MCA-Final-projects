document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');

    registerForm.addEventListener('submit', async (event) => {
        event.preventDefault(); 

        // Collect form data
        const formData = {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            email: document.getElementById('email').value,
            department: document.getElementById('department').value,
            position: document.getElementById('position').value,
            hireDate: document.getElementById('hireDate').value,
            birthDate: document.getElementById('birthDate').value,
            password: document.getElementById('password').value, 
            address: document.getElementById('address').value
        };

        // Check if hireDate and birthDate are the same
        if (formData.hireDate === formData.birthDate) {
            alert('Hire date and birth date cannot be the same. Please enter different dates.');
            return; 
        }

        // Send data to backend API
        try {
            const response = await fetch('http://localhost:8080/employees/addEmployee', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Failed to register user');
            }

            const responseData = await response.json();
            console.log('User registered successfully:', responseData);

            // Show success modal
            $('#successModal').modal('show');

            setTimeout(() => {
                window.location.href = '../../app/Login/login.html';
            }, 3000); 

        } catch (error) {
            console.error('Error registering user:', error.message);
        }
    });
});
