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


create table participants(
user_id int Auto_increment not null unique primary key,
first_name VARCHAR(50) not null,
last_name VARCHAR(50) not null,
pathway char(1),
core_id int,
foreign key(core_id) REFERENCES core_schedule(core_id)
);


create table week_schedule(
week_schedule_id int Auto_increment not null unique primary key,
date_in_use date not null,
monday VARCHAR(48),
tuesday VARCHAR(48),
wednesday VARCHAR(48),
thrusday VARCHAR(48),
friday VARCHAR(48)
);

create table temp_schedule(
temp_schedule_id int Auto_increment not null unique primary key,
user_id int,
core_id int,
foreign key(user_id) REFERENCES participants(user_id),
foreign key(core_id) REFERENCES core_schedule(core_id)
);

create table commitment(
commitment int Auto_increment not null unique primary key,
title text,
start_time time,
end_time time,
credits int,
user_id int,
foreign key(user_id) REFERENCES participants(user_id)
);

DELIMITER $$
CREATE TRIGGER `default_date` BEFORE INSERT ON core_schedule FOR EACH ROW
if ( isnull(new.date_modified) ) then
 set new.date_modified=curdate();
end if;
$$
delimiter ;


DELIMITER //
create trigger add_core_to_new_par after insert on participants
for each row
begin
	insert into core_schedule value();
    SET NEW.core_id = 1;
end;//
DELIMITER ;

create table core();

create table tech();

create table operation();



//uml in yuml

[User|user_id:int(pk);first_name:VARCHAR(50);last_name:VARCHAR(50);pathway:char(1);core_id:int(fk);]++1-1>[core_schedule|core_id:int(pk);date_modified:date;monday:VARCHAR(48);tuesday:VARCHAR(48);wednesday:VARCHAR(48);thrusday:VARCHAR(48);friday:VARCHAR(48);],[User]++1--++0..*[week_schedule|week_schedule_id:int(pk);date_in_use:date;monday:VARCHAR(48);tuesday:VARCHAR(48);wednesday:VARCHAR(48);thrusday:VARCHAR(48);friday:VARCHAR(48);],[User]++1--++0..*[temp_schedule|
temp_schedule_id:int(pk);user_id:int;core_id:int;]

