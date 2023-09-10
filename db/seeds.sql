INSERT INTO department(name)
VALUES
("Management"),
("Sales"),
("Customer Service"),
("Information Technology"),
("Human Resources");

INSERT INTO roles(title, salary, department_id)
VALUES
("Regional Manager", 250000, 1),
("Sales representative", 100000, 2),
("Customer Support Specialist", 40000, 3),
("Senior Developer", 120000, 4),
("Head of HR", 80000, 5);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES
("Albert", "Einstein", 1, NULL),
("J", "Oppenheimer", 2, 1),
("Michael", "Faraday", 3, 1),
("Nikola", "Tesla", 4, 1), 
("Isaac", "Newton", 5, NULL);