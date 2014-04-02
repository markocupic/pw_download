window.addEvent('domready', function () {

    // hide all forms
    $$('.pw_form_container').each(function (el) {
        var formContainer = el;
        fadeOutForm(formContainer);
    });

    // alert the error message if the password was wrong
    $$('.password_error').each(function (el) {
        alert(el.get('text'));
    });
});

function fadeInForm(ceId) {
    // close all opened forms
    $$('.pw_form_container').each(function (el) {
        el.fade(0);
    });

    // fade in form
    var formContainer = document.id('pw_form_container_' + ceId);
    formContainer.setStyle('opacity', 0);
    formContainer.addClass('visible');
    formContainer.fade(0.8);

    // add event for closing forms
    document.id('close_button_' + ceId).addEvent('click', function (event) {
        event.stopPropagation();
        fadeOutForm(formContainer);
    });

    // add event for closing forms
    document.id('ctrl_submit_' + ceId).addEvent('click', function (event) {
        event.stopPropagation();
        fadeOutForm(formContainer);
        document.id('pw_form_' + ceId).submit();
    });
}

function fadeOutForm(el) {
    el.fade(0);
    el.removeClass('visible');
    el.setStyle('visibility', 'hidden');
    el.setStyle('display', 'none');
    el.removeClass('visible');
}
