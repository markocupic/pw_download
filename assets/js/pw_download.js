// javascript for contao content element pw_download

window.addEvent('domready', function () {

    // hide all forms
    $$('.pw_form_container').each(function (formLayer) {
        fadeOutForm(formLayer);
    });

    // alert the error message if the password was wrong
    $$('.password_error').each(function (el) {
        alert(el.get('text'));
    });
});

function fadeInForm(ceId) {

    // close all opened forms
    $$('.pw_form_container').each(function (el) {
        el.fade('out');
    });

    // fade in form
    var formLayer = document.id('pw_form_container_' + ceId);
    formLayer.setStyle('opacity', 0);
    formLayer.addClass('visible');
    formLayer.fade(0.9);

    // add event for closing forms
    document.id('close_button_' + ceId).addEvent('click', function (event) {
        event.stopPropagation();
        fadeOutForm(formLayer);
    });

    // add event for closing forms
    document.id('ctrl_submit_' + ceId).addEvent('click', function (event) {
        event.stopPropagation();
        fadeOutForm(formLayer);
        document.id('pw_form_' + ceId).submit();
    });
}

function fadeOutForm(el) {

    el.fade('out');
    el.removeClass('visible');
    el.setStyle('visibility', 'hidden');
    el.setStyle('display', 'none');
    el.removeClass('visible');
}
