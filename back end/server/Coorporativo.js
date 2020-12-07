var sqlize = require('./Sqlize');
var db = require ('./db');


exports.verProductosCategorias = function (req, resp) {
	var instruction = "exec VerProductosCategorias" +
	
	  " @filtroProducto = '" + req.body.FiltroProducto +
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



exports.verFacturadoSucursal = function (req, resp) {
	var instruction = "exec TotalFacturadoSucursal" +
	
	 " @sucursal = " + sqlize._str(req.body.Sucursal) +
	", @fechaI = " + sqlize._str(req.body.FechaI) +
	", @fechaF = " + sqlize._str(req.body.FechaF) +
	", @filtroCategoria = '" + req.body.FiltroCategoria + "'";
	
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



exports.verFacturadoTotal = function (req, resp) {
	var instruction = "exec TotalFacturado" +
	
	 " @fechaI = " + sqlize._str(req.body.FechaI) +
	", @fechaF = " + sqlize._str(req.body.FechaF) +
	", @filtroCategoria = '" + req.body.FiltroCategoria + "'";
	
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