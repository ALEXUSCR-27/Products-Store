var sqlize = require('./Sqlize');
var db = require ('./db');


exports.buscarProducto = function (req, resp) {
	var instruction = "exec BuscarProducto " +
	
	   "@filtroProducto = '" + req.body.FiltroProducto +
	"', @filtroCategoria = '" + req.body.FiltroCategoria + "'";
	
	console.log(instruction);
	
	db.executeSQL(instruction, req.body.servidor, function(data, err) {
		if (err) {
			console.log("[ERROR]:[Ocurrió un error en la consulta a la base de datos]")
			console.log(err)
		} else {
			console.log("[MENSAJE]:[Se realizó una consulta en la base de datos con exito]");
			resp.json(data.recordset)
		}
	});
};



exports.verProductos = function (req, resp) {
	var instruction = "exec VerProductos ";
	
	console.log(instruction);
	
	db.executeSQL(instruction, req.body.servidor, function(data, err) {
		if (err) {
			console.log("[ERROR]:[Ocurrió un error en la consulta a la base de datos]")
			console.log(err)
		} else {
			console.log("[MENSAJE]:[Se realizó una consulta en la base de datos con exito]");
			resp.json(data.recordset)
		}
	});
};



exports.agregarProducto = function (req, resp) {
	var instruction = "exec AgregarProducto " +
	
	  "@nombre = " + sqlize._str(req.body.NombreProducto) +
	", @descripcion = " + sqlize._str(req.body.DescripcionProducto) +
	", @idCategoria = " + sqlize._int(req.body.idCategoria) +
	", @precio = " + sqlize._int(req.body.Precio);
	
	console.log(instruction);
	
	db.executeSQL(instruction, req.body.servidor, function(data, err) {
		if (err) {
			console.log("[ERROR]:[Ocurrió un error en la consulta a la base de datos]")
			console.log(err)
		} else {
			console.log("[MENSAJE]:[Se realizó una consulta en la base de datos con exito]");
			resp.json(data.recordset)
		}
	});
};



exports.actualizarProducto = function (req, resp) {
	console.log(req);
	var instruction = "exec ActualizarProducto " +
	
	  "@idProducto = " + sqlize._int(req.body.idProducto) +
	", @nombre = " + sqlize._str(req.body.NombreProducto) +
	", @descripcion = " + sqlize._str(req.body.DescripcionProducto) +
	", @idCategoria = " + sqlize._int(req.body.idCategoria) +
	", @precio = " + sqlize._int(req.body.Precio) +
	", @cantidad = " + sqlize._int(req.body.Cantidad);
	
	console.log(instruction);
	
	db.executeSQL(instruction, req.body.servidor, function(data, err) {
		if (err) {
			console.log("[ERROR]:[Ocurrió un error en la consulta a la base de datos]")
			console.log(err)
		} else {
			console.log("[MENSAJE]:[Se realizó una consulta en la base de datos con exito]");
			resp.json(data.recordset)
		}
	});
};



exports.borrarProducto = function (req, resp) {
	var instruction = "exec BorrarProducto " +
	
	"@idProducto = " + sqlize._int(req.body.idProducto);
	
	console.log(instruction);
	
	db.executeSQL(instruction, req.body.servidor, function(data, err) {
		if (err) {
			console.log("[ERROR]:[Ocurrió un error en la consulta a la base de datos]")
			console.log(err)
		} else {
			console.log("[MENSAJE]:[Se realizó una consulta en la base de datos con exito]");
			resp.json(data.recordset)
		}
	});
};