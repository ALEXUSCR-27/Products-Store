use MiTienda
go

--triggers

create trigger BorradoCategoria on Categoria
instead of delete
as
	update Categoria
	set Activo = 0
	where idCategoria = (select idCategoria from deleted)
go

create trigger BorradoProducto on Producto
instead of delete
as
	update Producto
	set Activo = 0
	where idProducto = (select idProducto from deleted)
go

create trigger InventarioDeProducto on Producto
after insert
as
begin
	declare @idProducto int
	select @idProducto = idProducto from inserted

	insert into Inventario (
		idProducto
	) values (
		@idProducto
	)
end
go

--Categoria
--Consultar, Agregar, Actualizar, Borrar

create view CantidadProductosCategoria as
	select
		c.idCategoria, count(p.idProducto) as CantidadProductos
	from
		Categoria c left join Producto p
		on c.idCategoria = p.idCategoria
	group by
		c.idCategoria
go

create procedure VerCategorias
as
begin
	set transaction isolation level repeatable read

	begin transaction

		select
			c.idCategoria, c.NombreCategoria, c.Descripcion,
			c.FechaCreacion, vcpc.CantidadProductos
		from
			Categoria c inner join CantidadProductosCategoria vcpc
			on c.idCategoria = vcpc.idCategoria

	commit transaction
end
go


create procedure AgregarCategoria
	@nombre varchar (30),
	@descripcion varchar (50)
as
begin
	set transaction isolation level serializable

	begin transaction

		insert into Categoria (
			NombreCategoria,
			Descripcion
		) values (
			@nombre,
			@descripcion
		)
	commit transaction
end
go


create procedure ActualizarCategoria
	@idCategoria int,
	@nombre varchar (30),
	@descripcion varchar (50)
as
begin
	set transaction isolation level serializable

	begin transaction
		
		update
			Categoria
		set
			NombreCategoria = @nombre,
			Descripcion = @descripcion
		where
			idCategoria = @idCategoria
			
	commit transaction
end
go


create procedure BorrarCategoria
	@idCategoria int
as
begin
	set transaction isolation level serializable

	begin transaction

		delete Categoria
		where idCategoria = @idCategoria
	
	commit transaction
end
go

--Producto
--Consultar, Agregar, Actualizar, Borrar
exec VerProductos
create procedure BuscarProducto
	@filtroProducto varchar (30),
	@filtroCategoria varchar (30)
as
begin
	set transaction isolation level repeatable read

	begin transaction

		select
			p.idProducto, p.NombreProducto, i.Cantidad,
			p.Precio, p.Descripcion, c.NombreCategoria
		from
			Producto p left join Categoria c
			on p.idCategoria = c.idCategoria
			inner join Inventario i
			on i.idProducto = p.idProducto
		where
			p.Activo = 1 and
			p.NombreProducto like '%' + @filtroProducto + '%' and
			c.NombreCategoria like '%' + @filtroCategoria + '%'

	commit transaction
end
go


create procedure VerProductos
as
begin
	set transaction isolation level repeatable read

	begin transaction

		select
			p.idProducto, p.NombreProducto, i.Cantidad, p.Precio,
			isnull(p.Descripcion, 'N/A') as Descripcion, p.idCategoria,
			isnull(c.NombreCategoria,'N/A') as NombreCategoria, p.FechaCreacion
		from
			Producto p left join Categoria c
			on p.idCategoria = c.idCategoria
			inner join Inventario i
			on i.idProducto = p.idProducto
		where
			p.Activo = 1

	commit transaction
end
go


create procedure AgregarProducto
	@nombre varchar (30),
	@descripcion varchar (50),
	@idCategoria int,
	@precio money
as
begin
	set transaction isolation level serializable

	begin transaction

		insert into Producto (
			NombreProducto,
			Descripcion,
			idCategoria,
			Precio
		) values (
			@nombre,
			@descripcion,
			@idCategoria,
			@precio
		)
	commit transaction
end
go


create procedure ActualizarProducto
	@idProducto int,
	@nombre varchar (30),
	@descripcion varchar (50),
	@idCategoria int,
	@precio money,
	@cantidad int
as
begin
	set transaction isolation level serializable

	begin transaction
		
		update
			Producto
		set
			NombreProducto = @nombre,
			Descripcion = @descripcion,
			idCategoria = @idCategoria,
			Precio = @precio
		where
			idProducto = @idProducto

		update	Inventario
		set		Cantidad = @cantidad
		where	idProducto = @idProducto
			
	commit transaction
end
go


create procedure BorrarProducto
	@idProducto int
as
begin
	set transaction isolation level serializable

	begin transaction

		delete Producto
		where idProducto = @idProducto
	
	commit transaction
end
go

--Inventario
--Consultar, Actualizar

create procedure ActualizarInventario
	@idProducto int,
	@cambio int
as
begin
	set transaction isolation level serializable

	begin transaction
		
		update
			Inventario
		set
			Cantidad = Cantidad + @cambio
		where
			idProducto = @idProducto

	commit transaction
end
go


--Factura
--Consultar, Agregar

create function dbo.CalculateTotal (
	@idFactura int
)
returns money
as
begin
	return (
		select
			sum(PrecioUnitario * Cantidad)
		from
			LineaFactura
		where
			idFactura = @idFactura
	)
end
go


create view TotalesFacturas as
	select
		idFactura, dbo.CalculateTotal(idFactura) as Total
	from
		Factura
go
select * from Factura


create procedure BuscarFacturas
	@filtroCliente varchar (30),
	@noFacturaI int,
	@noFacturaF int,
	@fechaI date,
	@fechaF date
as
begin
	set transaction isolation level repeatable read

	begin transaction

		select
			f.idFactura, f.NomberCliente, f.FechaFacturacion, vtf.Total
		from
			Factura f inner join TotalesFacturas vtf	
			on f.idFactura = vtf.idFactura
		where
			NomberCliente like '%' + @filtroCliente + '%' and
			(@noFacturaI is null or f.idFactura <= @noFacturaI) and
			(@noFacturaF is null or f.idFactura <= @noFacturaF) and
			(@fechaI is null or FechaFacturacion <= @fechaI) and
			(@fechaF is null or FechaFacturacion <= @fechaF)

	commit transaction
end
go

--LineaFactura
--Consultar, Agregar

create procedure GetLineasFactura
	@idFactura int
as
begin
	set transaction isolation level repeatable read

	begin transaction

		select
			p.NombreProducto, lf.PrecioUnitario, lf.Cantidad,
			(lf.PrecioUnitario * lf.Cantidad) as TotalLinea
		from
			Producto p inner join LineaFactura lf
			on p.idProducto = lf.idProducto
		where
			lf.idFactura = @idFactura

	commit transaction
end
go

create procedure AgregarLineaFactura
	@idFactura int,
	@idProducto int,
	@cantidad int
as
begin
	set transaction isolation level serializable

	begin transaction

		declare @precioUnitario money

		select	@precioUnitario = Precio
		from	Producto
		where	idProducto = @idProducto

		insert into LineaFactura values (
			@idFactura,
			@idProducto,
			@precioUnitario,
			@cantidad
		)

	commit transaction
end
go

--Usuario

create procedure IniciarSesion
	@NombreUsuario varchar (30),
	@Contrasenia varchar (100)
as
begin
	declare @Exito int = 0

	select
		@Exito = 1
	from
		Usuario
	where
		NombreUsuario = @NombreUsuario and
		Contrasenia = @Contrasenia
	
	select @Exito as EstadoSesion
end
go

-- Realizar Venta

create type LineasFacturaTableType as table (
	TempID int identity,
	idProducto int,
	Cantidad int,
	primary key (TempID)
)
go

create procedure RealizarVenta
	@NombreCliente varchar (30),
	@LineasFactura LineasFacturaTableType readonly
as
begin
	set transaction isolation level serializable

	begin transaction

		declare @idF int
		insert into Factura (NomberCliente) values (@NombreCliente)
		select @idF = scope_identity()	-- id de Factura

		declare @i int = 1	-- id de tabla actual
		declare @cAct int	-- cantidad actual
		declare @dAct int	-- decremento actual
		declare @pAct int	-- id producto actual
		declare @n int		-- cantidad total de tabla
		select @n = count(0) from @LineasFactura

		begin try

			while @i <= @n
			begin
				select	@cAct = Cantidad,
						@dAct = -Cantidad,
						@pAct = idProducto
				from	@LineasFactura
				where	TempID = @i

				exec ActualizarInventario @idProducto = @pAct, @cambio = @dAct
				exec AgregarLineaFactura @idFactura = @idF, @idProducto = @pAct, @cantidad = @cAct

				set @i += 1
			end

		end try
		begin catch

			throw 69420, 'Parece que no se pudo reducir un inventario XD', 1

			rollback transaction

		end catch

	commit transaction
end
go
