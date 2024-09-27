INSERT INTO Roles (role_name)
VALUES ('Admin'),
       ('Manager'),
       ('CEO'),
       ('Director'),
       ('Developer');

INSERT INTO Employee (username, email, phone, address, role_id, password, salary, manager)
VALUES
('Admin', 'admin@gmail.com', '+91-1234567890', '123 Main St', 1, 'jupiter123', 120000, 'Jane Smith'),
('Jane Smith', 'janesmith@example.com', '+91-9876543210', '456 Oak Ave', 2, 'password123', 100000,'Jane Smith' ),
('Michael Johnson', 'michaeljohnson@example.com', '+91-5551234567', '789 Elm St', 1, 'password123', 120000, 'Jane Smith'),
('Emily Davis', 'emilydavis@example.com', '+91-2223334444', '321 Maple Ln', 3, 'password123', 200000, 'Robert Brown'),
('Robert Brown', 'robertbrown@example.com', '+91-7778889999', '654 Pine Rd', 2, 'password123', 100000, 'Robert Brown'),
('Jessica Wilson', 'jessicawilson@example.com', '+91-4445556666', '987 Cedar Dr', 1, 'password123', 120000, 'Robert Brown'),
('David Martinez', 'davidmartinez@example.com', '+91-1112223333', '741 Birch Ave', 3, 'password123', 200000, 'Jane Smith'),
('Sarah Thompson', 'sarahthompson@example.com', '+91-9998887777', '852 Oak St', 1, 'password123', 120000, 'Daniel White'),
('Daniel White', 'danielwhite@example.com', '+91-6667778888', '963 Pine Ave', 2, 'password123', 100000, 'Daniel White'),
('Jennifer Harris', 'jenniferharris@example.com', '+91-3334445555', '159 Maple Rd', 1, 'password123', 120000, 'Daniel White'),
('Thomas Catherine', 'Thomas@example.com', '+91-3334445556', '259 Maple Rd', 1, 'password123', 120000, 'Robert Brown'),
('John Doe', 'JohnDoe@gmail.com', '+91-8889990000', '357 Elm Dr', 5, 'jupiter123', 80000, 'Robert Brown');

---- Insert projects with actual usernames from Employee table
INSERT INTO projects (title, description, status, username, Progress)
VALUES
    ('Website Redesign', 'Redesigning company website to improve user experience and SEO', 'Planned', 'Michael Johnson', 0),
    ('Customer Database Migration', 'Migrating customer data to new CRM system for better management', 'Not Started', 'Jane Smith', 0),
    ('Mobile App Development', 'Developing a mobile app for iOS and Android platforms', 'In-Progress', 'John Doe', 0),
    ('Marketing Campaign Launch', 'Launching a new marketing campaign for product promotion', 'Completed', 'Emily Davis', 0),
    ('Infrastructure Upgrade', 'Upgrading server infrastructure to improve performance and security', 'Pending', 'Robert Brown', 0),
    ('New Product Development', 'Developing a new product to expand market reach', 'In-Progress', 'Jessica Wilson', 0),
    ('Employee Training Program', 'Implementing a training program to enhance employee skills', 'Not Started', 'David Martinez', 0),
    ('IT System Integration', 'Integrating various IT systems to streamline operations', 'Planned', 'Sarah Thompson', 0),
    ('Business Process Automation', 'Automating key business processes for efficiency', 'In-Progress', 'Daniel White', 0),
    ('E-commerce Platform Expansion', 'Expanding e-commerce platform to new markets', 'Pending', 'Jennifer Harris', 0),
    ('Quality Assurance Enhancement', 'Improving quality assurance processes for better product reliability', 'Not Started', 'Thomas Catherine', 0);

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

