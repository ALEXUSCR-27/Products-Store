var sqlize = require('./Sqlize');
var db = require ('./db');


exports.iniciarSesion = function (req, resp) {
	var instruction = "exec IniciarSesion" +
	
	 " @NombreUsuario = " + sqlize._str(req.body.NombreUsuario) +
	", @Contrasenia = " + sqlize._str(req.body.Contrasenia);
	
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