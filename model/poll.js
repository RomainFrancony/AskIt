let client = require('./db');
let option = require('./option');


class Poll{
	static create(libelle, multi, cb){
		client.query("INSERT INTO POLL(MULTI, LIBELLE_POLL) VALUES($1,$2) RETURNING ID_POLL",[multi,libelle], function(err,result){
			if(err)
			{
				console.log(err);
				cb(false);
			}else{
				cb(result.rows[0].id_poll);
			}				
		});		
	}


	static getPoll(id_poll,cb){
		var poll = "";
		var getPoll = client.query("SELECT p.ID_POLL, LIBELLE_POLL, MULTI, SUM(vote)"+' "vote" '+"FROM POLL p JOIN OPTION o ON o.id_poll=p.id_poll WHERE p.ID_POLL=$1 group by p.id_poll",[id_poll],function(err,result){
			if(err){
				console.log(err);
				cb(false);
			}
		});
		getPoll.on("row", function (row, result) {
	   		poll = row;
		});
		getPoll.on("end", function (row, result) {  
			if(poll == 'undefined'){
				cb(false)
			}else{
	   			cb(poll);
	   		}
		});
	}

	static getPollAndOptions(id_poll,cb){
		Poll.getPoll(id_poll,function(pollResult){
			if(pollResult != false){
				option.getOptions(pollResult.id_poll,function(optionResult){
					if(optionResult != false){
						cb(pollResult,optionResult);
					}else{
						cb(false);
					}
				})
			}else{
				cb(false);
			}
		})

	}
}


module.exports = Poll;