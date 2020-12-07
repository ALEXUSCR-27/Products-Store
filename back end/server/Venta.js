var sqlize = require('./Sqlize');
var db = require ('./db');


exports.realizarVenta = function (req, resp) {
	var instruction = "declare @tabla LineasFacturaTableType;";
	
	for (linea in req.body.Carrito) {
		instruction += "insert into @tabla values (" +
		sqlize._int(req.body.Carrito[linea].idProducto) + "," +
		sqlize._int(req.body.Carrito[linea].Cantidad) + ");";
	
	}
		instruction += "exec RealizarVenta" +
		" @NombreCliente = " + sqlize._str(req.body.NombreCliente) +
		", @LineasFactura = @tabla";
	
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