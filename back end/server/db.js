var serverConfig = require('./serverConfig');
var sqlDB = require("mssql");


exports.executeSQL = function (sql, server, response) {
	
	var connection;
	
	if (server == "CA")
		connection = new sqlDB.ConnectionPool(serverConfig.Cartago);
	
	else if (server == "LI")
		connection = new sqlDB.ConnectionPool(serverConfig.Limon);
	
	else if (server == "CORP")
		connection = new sqlDB.ConnectionPool(serverConfig.Corporativo);
	
	connection.connect().then(function() {
			var req = new sqlDB.Request(connection);
			req.query(sql).then(function(recordset) {
				response(recordset);
			})
			.catch(function(err) {
				console.log(err);
				response(null, err);
			});
		})
		.catch(function(err) {
			console.log(err);
			response(null, err);
		});

};