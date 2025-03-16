CREATE DATABASE db_car;
USE db_car;

CREATE TABLE owner(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE parking_space(
	id VARCHAR(255) PRIMARY KEY
);

CREATE TABLE cars (
    id INT AUTO_INCREMENT PRIMARY KEY,
    vehicle VARCHAR(255) NOT NULL,
    plate VARCHAR(255) UNIQUE NOT NULL,
    parking_space VARCHAR(255) UNIQUE NOT NULL,
    owner INT NOT NULL,
    foreign key (owner) references owner (id),
    foreign key (parking_space) references parking_space (id)
);

insert into parking_space (id) values ('001'), ('002'), ('003'), ('004'), ('005');
insert into owner (name, email, password) values ('julia', 'julia@email.com', '123');
insert into cars (vehicle, plate, parking_space, owner) values ('Civic', 'ABC', '001', 1);

select * from parking_space;
select * from owner;
select * from cars;