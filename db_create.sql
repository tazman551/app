drop database if exists tpp_schedule;

create database tpp_schedule;

use tpp_schedule;

create table core_schedule(
core_id int Auto_increment not null unique primary key,
date_modified date not null,
monday VARCHAR(48),
tuesday VARCHAR(48),
wednesday VARCHAR(48),
thrusday VARCHAR(48),
friday VARCHAR(48)
);

create table paraticipants(
user_id int Auto_increment not null unique primary key,
first_name VARCHAR(50) not null,
last_name VARCHAR(50) not null,
pathway char(1),
core_id int,
foreign key(core_id) REFERENCES core_schedule(core_id)
);

