INSERT INTO Roles (role_name)
VALUES ('Admin'),
       ('Manager'),
       ('CEO'),
       ('Director'),
       ('Developer');

INSERT INTO Employee (username, email, phone, address, role_id, password, salary)
VALUES
('Admin', 'admin@gmail.com', '123-456-7890', '123 Main St', 1, 'jupiter123', 120000),
('Jane Smith', 'janesmith@example.com', '987-654-3210', '456 Oak Ave', 2, 'password123', 100000),
('Michael Johnson', 'michaeljohnson@example.com', '555-123-4567', '789 Elm St', 1, 'password123', 120000),
('Emily Davis', 'emilydavis@example.com', '222-333-4444', '321 Maple Ln', 3, 'password123', 200000),
('Robert Brown', 'robertbrown@example.com', '777-888-9999', '654 Pine Rd', 2, 'password123', 100000),
('Jessica Wilson', 'jessicawilson@example.com', '444-555-6666', '987 Cedar Dr', 1, 'password123', 120000),
('David Martinez', 'davidmartinez@example.com', '111-222-3333', '741 Birch Ave', 3, 'password123', 200000),
('Sarah Thompson', 'sarahthompson@example.com', '999-888-7777', '852 Oak St', 1, 'password123', 120000),
('Daniel White', 'danielwhite@example.com', '666-777-8888', '963 Pine Ave', 2, 'password123', 100000),
('Jennifer Harris', 'jenniferharris@example.com', '333-444-5555', '159 Maple Rd', 1, 'password123', 120000),
('Thomas Catherine', 'Thomas@example.com', '333-444-5556', '259 Maple Rd', 1, 'password123', 120000),
('John Doe', 'JohnDoe@gmail.com', '888-999-0000', '357 Elm Dr', 5, 'jupiter123', 80000);

---- Insert projects with actual usernames from Employee table
INSERT INTO projects (title, description, status, username)
VALUES
    ('Website Redesign', 'Redesigning company website to improve user experience and SEO', 'Planned', 'Michael Johnson'),
    ('Customer Database Migration', 'Migrating customer data to new CRM system for better management', 'Not Started', 'Jane Smith'),
    ('Mobile App Development', 'Developing a mobile app for iOS and Android platforms', 'In-Progress', 'John Doe'),
    ('Marketing Campaign Launch', 'Launching a new marketing campaign for product promotion', 'Completed', 'Emily Davis'),
    ('Infrastructure Upgrade', 'Upgrading server infrastructure to improve performance and security', 'Pending', 'Robert Brown'),
    ('New Product Development', 'Developing a new product to expand market reach', 'In-Progress', 'Jessica Wilson'),
    ('Employee Training Program', 'Implementing a training program to enhance employee skills', 'Not Started', 'David Martinez'),
    ('IT System Integration', 'Integrating various IT systems to streamline operations', 'Planned', 'Sarah Thompson'),
    ('Business Process Automation', 'Automating key business processes for efficiency', 'In-Progress', 'Daniel White'),
    ('E-commerce Platform Expansion', 'Expanding e-commerce platform to new markets', 'Pending', 'Jennifer Harris'),
    ('Quality Assurance Enhancement', 'Improving quality assurance processes for better product reliability', 'Not Started', 'Thomas Catherine');


INSERT INTO Announcements (Name, Description, Created_at) VALUES
    ('Product Launch Event', 'Join us for the unveiling of our latest product line.', CURRENT_TIMESTAMP),
    ('Scheduled Maintenance', 'We will be conducting scheduled maintenance on our servers.', CURRENT_TIMESTAMP),
    ('Holiday Closure Notice', 'Please note our office will be closed for the upcoming holiday.', CURRENT_TIMESTAMP),
    ('New Feature Release', 'Exciting new features are now available in our latest software update.', CURRENT_TIMESTAMP),
    ('Customer Appreciation Day', 'Celebrate Customer Appreciation Day with special discounts and offers.', CURRENT_TIMESTAMP),
    ('Upcoming Webinar', 'Register now for our upcoming webinar on industry trends.', CURRENT_TIMESTAMP),
    ('Service Outage Notification', 'We are investigating an issue affecting service availability.', CURRENT_TIMESTAMP),
    ('Charity Fundraiser Event', 'Support our charity fundraiser event for a good cause.', CURRENT_TIMESTAMP),
    ('Employee Recognition Awards', 'We are proud to recognize outstanding contributions from our employees.', CURRENT_TIMESTAMP),
    ('Product Recall Notice', 'Important information regarding a product recall initiative.', CURRENT_TIMESTAMP),
    ('Annual General Meeting', 'Our Annual General Meeting will take place next week.', CURRENT_TIMESTAMP);

