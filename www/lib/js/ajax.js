/**
 * Post ajax form
 * @param {object} $form JQuery form
 */
function sendAjaxForm($form) {
	$.ajax({
		type: $form.attr('method'),
		url: $form.attr('action'),
		data: $form.serialize(),
		success: function (data) {
            var result = data.result || '<p>Спасибо, ваши данные приняты.</p>';
			if (data.redirect) window.location = data.redirect;
			if (data.errors) {
				$.each(data.errors, function(field, error) {
					$form.find('#' + field).next('.alert').html(error);
				});
			} else {
				$form.after(result);
				$form.hide();
			}
		}
	});
}

$(function() {
	$(document).ajaxStart(function() {
		$('#loading').show();
	});
	$(document).ajaxComplete(function(event,request,settings) {
		$('#loading').hide();
	});
});
