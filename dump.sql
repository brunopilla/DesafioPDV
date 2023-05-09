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

create table produtos (
  id serial primary key,
  descricao text not null,
  quantidade_estoque decimal,
  valor integer,
  categoria_id integer references categorias(id)
);

create table clientes (
  id serial primary key,
  nome varchar(100),
  email varchar(100) unique,
  cpf char(11) unique,
  cep char(8),
  rua varchar(100),
  numero varchar(10),
  bairro varchar (100),
  cidade varchar (100),
  estado char(2)
);

create table pedidos(
id serial primary key,
cliente_id integer references clientes(id),
observacao text,
valor_total integer not null
);

create table pedido_produtos(
id serial primary key,
pedido_id integer references pedidos(id),
produto_id integer references produtos(id),
quantidade_produto decimal not null,
valor_produto integer not null
);