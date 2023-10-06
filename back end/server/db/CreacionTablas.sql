create database MiTienda
go

use miTienda

create table Categoria (
	idCategoria int identity(1,1),
	NombreCategoria varchar(30) not null unique,
	Descripcion varchar(50),
	Activo bit not null default 1,
	FechaCreacion date not null default getdate(),
	primary key (idCategoria)
)

create table Producto (
	idProducto int identity(1,1),
	NombreProducto varchar(30) not null unique,
	Descripcion varchar(50),
	idCategoria int,
	Precio money not null,
	Activo bit not null default 1,
	FechaCreacion date not null default getdate(),
	primary key (idProducto),
	foreign key (idCategoria) references Categoria (idCategoria)
)

create table Inventario (
	idProducto int,
	Cantidad int not null check (Cantidad >= 0) default 0,
	primary key (idProducto),
	foreign key (idProducto) references Producto (idProducto)
)

create table Factura (
	idFactura int identity(1,1),
	NomberCliente varchar (30),
	FechaFacturacion date not null default getdate(),
	primary key (idFactura)
)

create table LineaFactura (
	idLineaFactura int identity(1,1),
	idFactura int not null,
	idProducto int not null,
	PrecioUnitario money not null,
	Cantidad int not null check (Cantidad >= 0),
	primary key (idLineaFactura),
	foreign key (idFactura) references Factura (idFactura),
	foreign key (idProducto) references Producto (idProducto)
)

create table Usuario (
	idUsuario int identity(1,1),
	NombreUsuario varchar(30) unique not null,
	Contrasenia varchar(100) not null,
	primary key (idUsuario)
)



--drops
drop table Usuario
drop table LineaFactura
drop table Factura
drop table Inventario
drop table Producto
drop table Categoria