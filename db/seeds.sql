INSERT INTO department (name)
VALUES('Engineering'),
('Drafting'),
 ('Sales');

INSERT INTO  role (title, salary, department_id)
VALUES ('Engineering Manager', 150000, 1),
('Drafter 1', 50000, 2),
('Sales Lead', 60000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Bryan', 'Kniss', 1, NULL),
('Jackson', 'Ahumada', 2, 1),
('Mike', 'Smith', 3, NULL),
('Sarah', 'Lovell', 4, 3);
