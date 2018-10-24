create database Bamazon_DB;
use Bamazon_DB;

create table products(

id int not null auto_increment,
product_name varchar(50) not null,
department_name varchar(50) not null,
price decimal (10,4) not null,
stock_quantity int not null,
primary key (id)
);

insert into products(product_name, department_name, price, stock_quantity)
values('Colgate Toothpaste', 'Daily Needs', 12.99, 6);

insert into products(product_name, department_name, price, stock_quantity)
values('Dove Soap', 'Daily Needs', 17.99, 3);

insert into products(product_name, department_name, price, stock_quantity)
values('Water', 'Daily Needs', 29.99, 4);

insert into products(product_name, department_name, price, stock_quantity)
values('Colgate Toothpaste', 'Daily Needs', 15.99, 2);

insert into products(product_name, department_name, price, stock_quantity)
values('Baking Powder', 'Daily Needs', 25.99, 5);

insert into products(product_name, department_name, price, stock_quantity)
values('Milk Powder', 'Daily Needs', 14.99, 2);

insert into products(product_name, department_name, price, stock_quantity)
values('Cooking Oil', 'Daily Needs', 11.99, 6);

insert into products(product_name, department_name, price, stock_quantity)
values('Dry Yeast', 'Daily Needs', 17.99, 3);

insert into products(product_name, department_name, price, stock_quantity)
values('Stock Cubes', 'Daily Needs', 20.99, 2);

insert into products(product_name, department_name, price, stock_quantity)
values(' Tomato Paste', 'Daily Needs', 28.99, 2);


ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Grandma@30';

