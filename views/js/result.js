$(function() {
	//Copy link to the poll in clipboard
	$('body').on('click', '.share', function(event) {
		var link = document.createElement("input");
	    link.setAttribute("value", window.location.href.substr(0,window.location.href.length-7));
	    document.body.appendChild(link);
	    link.select();
	    document.execCommand("copy");
        document.body.removeChild(link);
        //alert
        $('.share').append("<div class='arrow'></div><span class='message'>Link copied into clipboard</span>");
	      setTimeout(function() {
	        $('.message, .arrow').fadeOut('500', function() {
	          $(".message, .arrow").remove();
	        });
	      }, 1500);
		
	});
	
	//Connect to the room of the poll
    var socket = io.connect('http://localhost:8080');
	socket.on('connect', function () {
	  socket.emit('joinRoom',$('#id_poll').val());
	});

	//Update de votes
	socket.on('vote', function (poll,options) {
    	for (var i = 0; i < options.length; i++) {
    		$('#'+options[i].id_option).find('.progress-bar').css('width', options[i].vote / poll.vote *100 +'%');
    		$('#'+options[i].id_option).find('.vote').html(Math.round(options[i].vote / poll.vote *100) +'%');
    	}
    	$('.total').html("TOTAL : "+poll.vote+" votes");
	});
});