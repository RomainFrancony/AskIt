$(function() {
    //
    //Home Page
    //

	//Check form
    $('body').on('click', '#create', function(event) {
    	//check question
    	if($.trim($("input[name='question']").val()) == "")
    	{
    		$("input[name='question']").parents(".form-group").addClass('has-error');
    		$(".error-question").removeClass('hidden');
    	}

    	//check options
    	var count = 0;
    	$.each($("input[name='option']"), function(index, val) {
    		 if ($.trim($(this).val()) != ""){
    		 	count += 1;
    		 }
    	});
    	if (count < 2){
    		$('.options').addClass('has-error');
    		$('.error-options').removeClass('hidden');
    	}

    	if(count >= 2 && $.trim($("input[name='question']").val()) != "")
    	{
    		$('form').trigger('submit');
    	}

    });		


    //Add new option input
    $('body').on('keydown', "input[name='option']", function(event) {
    	if ($(this).is($("input[name='option']").last())) {
    		$('.options').append("<div class='form-group'><label class='col-md-4 control-label'></label><div class='col-md-4'><input name='option' type='text' placeholder='Enter a poll option' class='form-control input-md'></div></div>")
    	}
    });

    //Clean errors
    $('body').on('focus', "input[name='question']", function(event) {
    	$("input[name='question']").parents(".form-group").removeClass('has-error');
    	$(".error-question").addClass('hidden');
    });

    $('body').on('focus', "input[name='option']", function(event) {
    	$('.options').removeClass('has-error');
    	$('.error-options').addClass('hidden');
    });



    //
    //Vote Page
    //
    //Check at least on input is checked
    $('body').on('click', '#valider', function(event) {
        if($("input[name='vote']:checked").length ==0 ){
            console.log($("input[name='vote']").parents());
            $(".option-vote").addClass('has-error');
            $(".error-vote").removeClass('hidden');
        }else{
            $(".form-vote").trigger('submit');
        }
    });

    //Clean error
    $('body').on('focus', "input[name='vote']", function(event) {
        $('.error-vote').addClass('hidden');
        $('.option-vote').removeClass('has-error');
    });
});  