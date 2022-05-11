INSERT INTO department(dept_name)
VALUES 
('Management'),
('Office Management'),
('Accounting'),
('Human Resources'),
('Quality Control'),
('Sales'),
('Relations'),
('Warehouse');

INSERT INTO emplRole(title, salary, department_id)
VALUES
('Regional Manager', 95000, 1),
('Receptionist', 40000, 2),
('Accountant', 85000, 3),
('HR Representative', 76000, 4),
('QA Manager', 74000, 5),
('Salesperson', 70000, 6),
('Customer Relations', 50000, 7),
('Supplier Relations', 52000, 7),
('Foreman', 55000, 8);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES 
('Michael', 'Scott', 1, null),
('Pam', 'Beasely', 2, 1),
('Angela', 'Martin', 3, 1),
('Oscar', 'Gutierrez', 3, 1),
('Kevin', 'Malone', 3, 1),

