INSERT INTO courses (course_name, description, image_url, course_url)
VALUES
    ('HTML', 'Learn basics of HTML', '../../resources/Images/html-5.png', '../../resources/course videos/html.mp4'),
    ('CSS', 'Learn basics of CSS', '../../resources/Images/css-3.png', '../../resources/course videos/css.mp4'),
    ('JavaScript', 'Learn JavaScript programming language fundamentals', '../../resources/Images/js.png', '../../resources/course videos/javascript.mp4'),
    ('Java Programming', 'Learn Java programming language basics', '../../resources/Images/java.png', '../../resources/course videos/java.mp4'),
    ('Software Testing', 'Introduction to software testing principles', '../../resources/Images/test.png', '../../resources/course videos/software testing.mp4');

INSERT INTO employees (EMPLOYEE_ID, ADDRESS, BIRTH_DATE, DEPARTMENT, EMAIL, FIRST_NAME, HIRE_DATE, LAST_NAME, PASSWORD, POSITION)
VALUES 
(1, '123 Main St', '1990-01-01', 'IT', 'jhon@jk.com', 'John', '2020-01-01', 'Doe', 'YQ==', 'Admin'),
(2, '123 Main St', '1990-01-01', 'IT', 'tom@jk.com', 'Tom', '2020-01-01', 'Doe', 'YQ==', 'Employee');

INSERT INTO Questions (question_text, option_1, option_2, option_3, option_4, correct_answer, type_of_question) VALUES
('What does HTML stand for?', 'HyperLinks and text markup language', 'Home tool markup language', 'HyperText Markup Language', 'HyperText Marking Language', 'HyperText Markup Language', 'HTML'),
('Which character is used to indicate an end tag?', '^', '*', '/', '<', '/', 'HTML'),
('Which one is the correct sequence of HTML tags?', 'head, body, title, html', 'html, head, title, body', 'html, title, head, body', 'None of the above', 'html, head, title, body', 'HTML'),
('Which HTML tag is used to display the text with scrolling effect?', '< scroll >', '< run >', '< marquee >', 'None', '< marquee >', 'HTML'),
('Which HTML tag is used to highlight background of the text?', '< highlight >', '< mark >', '< light >', 'All of the above', '< mark >', 'HTML'),
('What does CSS stand for?', 'Cascading style sheet', 'Creative Style sheet', 'Colorful style sheet', 'Clientside style sheet', 'Cascading style sheet', 'CSS'),
('What is the correct HTML for referring to an external style sheet?', '< link rel="stylesheet" type="text/css" href="myStyle.css" >', '< style src="mystyle.css" >', '< stylesheet > mystyle.css < /stylesheet >', '< stylesheet1 > mystyle.css < /stylesheet1 >', '< link rel="stylesheet" type="text/css" href="myStyle.css" >', 'CSS'),
('Which CSS property is used to change the text color of an element?', 'color', 'fgcolor', 'text-color', 'font-color', 'color', 'CSS'),
('How do you display a border like this: The top border = 10 pixels, The bottom border = 5 pixels, The left border = 20 pixels, The right border = 1 pixel?', 'border-width:10px 1px 5px 20px;', 'border-width:10px 5px 20px 1px;', 'border-width:5px 20px 10px 1px;', 'border-width:10px 20px 5px 1px;', 'border-width:10px 5px 20px 1px;', 'CSS'),
('Which element is used to represent the transparency of an element in CSS?', 'Hover', 'Opacity', 'Transparent', 'Overlay', 'Opacity', 'CSS'),
('What will the following code return: Boolean(10 > 9)?', 'True', 'False', 'NaN', 'Not mentioned', 'True', 'JavaScript'),
('Where is the correct place to insert a JavaScript?', 'Both the <head> section and the <body> section are correct', 'The <body> section', 'The <head> section', 'Not mentioned', 'Both the <head> section and the <body> section are correct', 'JavaScript'),
('What is the correct syntax for referring to an external script called ''xxx.js''?', '< script src="xxx.js" >', '< script name="xxx.js" >', '< script href="xxx.js" >', 'Overlay', '< script src="xxx.js" >', 'JavaScript'),
('How do you write ''Hello World'' in an alert box?', 'alert(''Hello World'');', 'msgBox(''Hello World'');', 'alertBox(''Hello World'');', 'msg(''Hello World'');', 'alert(''Hello World'');', 'JavaScript'),
('How do you create a function in JavaScript?', 'function myFunction()', 'function:myFunction()', 'function = myFunction()', 'Not mentioned', 'function myFunction()', 'JavaScript'),
('Which data type is used to create a variable that should store text?', 'string', 'Txt', 'myString', 'String', 'String', 'Java Programming'),
('How do you create a variable with the numeric value 5?', 'num x = 5', 'x = 5;', 'int x = 5;', 'float x = 5;', 'int x = 5;', 'Java Programming'),
('How do you create a method in Java?', 'methodName()', '(methodName)', 'methodName.', 'methodName[]', 'methodName()', 'Java Programming'),
('Which keyword is used to create a class in Java?', 'class', 'MyClass', 'className', 'class()', 'class', 'Java Programming'),
('What is the correct way to create an object called myObj of MyClass?', 'class MyClass = new myObj();', 'MyClass myObj = new MyClass();', 'class myObj = new MyClass();', 'new myObj = MyClass();', 'MyClass myObj = new MyClass();', 'Java Programming'),
('Testing individual units or modules of an application is called?', 'Unit Testing', 'Integration Testing', 'black-box Testing', 'Not mentioned', 'Unit Testing', 'Software Testing'),
('_______ is a type of testing performed to ensure that the application being tested is usable by people with disabilities?', 'Disability Testing', 'Accessibility Testing', 'Usability Testing', 'Not mentioned', 'Accessibility Testing', 'Software Testing'),
('______ is a process of testing the communication between two services based on a set of rules called Contract?', 'Contract Testing', 'Integration Testing', 'Unit Testing', 'Not mentioned', 'Contract Testing', 'Software Testing'),
('Software testing activities should start', 'as soon as the code is written', 'during the design stage', 'when the requirements have been formally documented', 'as soon as possible in the development life cycle', 'as soon as possible in the development life cycle', 'Software Testing'),
('What is the primary goal of software testing?', 'To create software requirements', 'To identify defects in the software', 'To design the user interface', 'To write code for the software', 'To identify defects in the software', 'Software Testing');


