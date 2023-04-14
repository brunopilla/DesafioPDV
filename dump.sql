create database pdv;

create table usuarios (
  id serial primary key,
  nome varchar(100) not null,
  email varchar(100) unique,
  senha varchar(150)
  );

create table categorias (
  id serial primary key,
  descricao varchar(100)
);

insert into categorias (descricao) values 
('Informática'),
('Celulares'),
('Beleza e Perfumaria'),
('Mercado'),
('Livros e Papelaria'),
('Brinquedos'),
('Moda'),
('Bebê'),
('Games');