disable trigger BorradoCategoria on Categoria
go
disable trigger BorradoProducto on Producto
go

delete Categoria
delete Producto

insert into Categoria (NombreCategoria, Descripcion) values ('Zapatos', 'Zapatos para hombres como para mujeres.')
insert into Categoria (NombreCategoria, Descripcion) values ('Pantalones', 'Pantalones para hombres como para mujeres.')

declare @idZapatos int; select @idZapatos = idCategoria from Categoria where NombreCategoria = 'Zapatos'
declare @idPantalones int; select @idPantalones = idCategoria from Categoria where NombreCategoria = 'Pantalones'

insert into Producto (NombreProducto, Descripcion, idCategoria, Precio) values ('Nike Air Force 1', 'Hechos de cuero, suela de goma', @idZapatos, 60070.99)
insert into Producto (NombreProducto, Descripcion, idCategoria, Precio) values ('Timberland White Ledge', '100% cuero, suela de goma', @idZapatos, 78092.29)
insert into Producto (NombreProducto, Descripcion, idCategoria, Precio) values ('Koolaburra por UGG', 'Ante de vaca, suela de Etileno acetato de vinilo', @idZapatos, 60070.99)
insert into Producto (NombreProducto, Descripcion, idCategoria, Precio) values ('Jean elástico de corte de bota', '98% Algodón, 2% Elastano', @idPantalones, 17420.59)
insert into Producto (NombreProducto, Descripcion, idCategoria, Precio) values ('Jeans cónico talle alto', '98% Algodón, 2% Elastano', @idPantalones, 13215.62) 
insert into Producto (NombreProducto, Descripcion, idCategoria, Precio) values ('Jeans estilo estrecho', '75% Algodón, 23% Poliéster, 2% Elastano', @idPantalones, 24028.40)

go

enable trigger BorradoCategoria on Categoria
go
enable trigger BorradoProducto on Producto
go