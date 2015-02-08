$( document ).ready(function() {
	$('#send-form').submit(function (event) {
		event.preventDefault();
		var name = $("#mail-name").val();
		var email = $("#mail-mail").val();
		var message = $("#mail-message").val();

		$("#mail-name").val("");
		$("#mail-mail").val("");
		$("#mail-message").val("");

		if (name && email && message) {
			$.ajax({
				type: "POST",
				url: "/mail",
				data: {
					"name": name,
					"email": email,
					"message": message
				},
				success: function(result) {
					console.log(result);
					$("input[type=submit]").val("Сообщение отправлено!");
					$('input[type="submit"]').attr('disabled','disabled');
					window.setTimeout(function(){
						$('input[type="submit"]').removeAttr('disabled');
						$("input[type=submit]").val("Отправить сообщение");	
					}, 2000);
				},
				dataType: "json"
			});		
		} 

		return false;	
	});
});