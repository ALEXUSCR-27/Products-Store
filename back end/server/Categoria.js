var sqlize = require('./Sqlize');
var db = require ('./db');


exports.verCategorias = function (req, resp) {
	var instruction = "exec VerCategorias";
	
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



exports.agregarCategoria = function (req, resp) {
	var instruction = "exec AgregarCategoria" +
	
	 " @nombre = " + sqlize._str(req.body.NombreCategoria) +
	", @descripcion = " + sqlize._str(req.body.DescripcionCategoria);
	
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



exports.actualizarCategoria = function (req, resp) {
	var instruction = "exec ActualizarCategoria" +
	
	 " @idCategoria = " + sqlize._int(req.body.idCategoria) +
	", @nombre = " + sqlize._str(req.body.NombreCategoria) +
	", @descripcion = " + sqlize._str(req.body.DescripcionCategoria);
	
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



exports.borrarCategoria = function (req, resp) {
	var instruction = "exec BorrarCategoria" +
	
	" @idCategoria = " + sqlize._int(req.body.idCategoria);
	
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