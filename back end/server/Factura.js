var sqlize = require('./Sqlize');
var db = require ('./db');


exports.buscarFactura = function (req, resp) {
	var instruction = "exec BuscarFacturas" +
	
	  " @filtroCliente =  '" + req.body.NombreCliente +
	"', @noFacturaI =  " + sqlize._int(req.body.NumeroFacturaI) +
	 ", @noFacturaF =  " + sqlize._int(req.body.NumeroFacturaF) +
	 ", @fechaI =  " + sqlize._str(req.body.FechaI) +
	 ", @fechaF =  " + sqlize._str(req.body.FechaF);
	
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



exports.getDetalle = function (req, resp) {
	var instruction = "exec GetLineasFactura" +
	
	" @idFactura =" + sqlize._int(req.body.idFactura);
	
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