let client = require('./db');
let color = require('randomcolor');

class Option{
	static create(libelle, id_poll, cb){
		var insert = "INSERT INTO OPTION(ID_POLL, LIBELLE_OPTION, COLOR) VALUES";
		var params = [];
		//Remove empty string
		libelle = libelle.filter(function(n){ return n.trim() != "" }); 

		for (var i = 0; i < 3*libelle.length; i+=3) {
			if(libelle[i/3].trim() != ""){
				insert += "($"+ (i+1) +",$"+ (i+2) +",$"+ (i+3) +")";
				if (i/3 != libelle.length-1) {
					insert += ',';
				}
				params.push(id_poll);
				params.push(libelle[i/3]);			
				params.push(color.randomColor());
			}
		}

		client.query(insert,params,function(err,result){
			if(err){
				console.log(err);
				//return error et redirect
				cb(false);
			}
			else{
				cb(true);
			}
		});
	}

	static getOptions(id_poll,cb){
		var options = [];		
		var gettOptions = client.query("SELECT * FROM OPTION WHERE ID_POLL= $1 ORDER BY ID_OPTION",[id_poll],function(err,result){
			if(err){
				console.log(err);
				cb(false)
			}
		});
		gettOptions.on("row", function (row, result) {
		    options.push(row);
		});
		gettOptions.on("end", function (row, result) {
			cb(options);
		});
	}


	static vote(id_option,cb){
		var update = "";
		if(typeof(id_option) =="object")
		{
			for (var i = 0; i < id_option.length; i++) {
				update+= "UPDATE OPTION SET VOTE=VOTE+1 WHERE ID_OPTION='"+ id_option[i] +"' RETURNING ID_POLL;";
			}
		}
		else
		{
			update+= "UPDATE OPTION SET VOTE=VOTE+1 WHERE ID_OPTION='"+ id_option +"' RETURNING ID_POLL;"
		}

		client.query(update, function(err,result){
			if(err)
			{
				console.log(err);
				cb(false);
			}else{
				cb(result.rows[0].id_poll);
			}				
		});		
	}

}


module.exports = Option;