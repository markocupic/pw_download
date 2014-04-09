// javascript for contao content element pw_download
window.addEvent('domready', function () {
    // CursorPos-Object
    CursorPos = {};

    // fade out all forms
    fadeOutForm();

    // store all forms in the body node
    $$('.pw_download_popup').each(function (el) {
        document.body.adopt(el);
    });

    // alert the error message if the password was wrong
    $$('.password_error').each(function (el) {
        alert(el.get('text'));
    });

    // add event for closing forms
    $$('.pw_download_popup .pw_form').addEvent('submit', function (event) {
        event.stopPropagation();
        fadeOutForm();
    });

    // add event for closing forms
    $$('.pw_download_popup .close_button').addEvent('click', function (event) {
        event.stopPropagation();
        fadeOutForm();
    });

    // store cursor position in CursorPos-Object
    $$('.pw_download_item a').addEvent('click', function (event) {
        CursorPos.x = event.page.x;
        CursorPos.y = event.page.y;
    });

});

function fadeInForm(elLink, ceId) {
    // close all opened forms
    $$('.pw_download_popup').each(function (el) {
        el.fade('out');
    });

    var formLayer = document.id('pw_download_popup_' + ceId);
    // set opacity to 0
    formLayer.setStyle('opacity', 0);

    // add & remove Class
    formLayer.removeClass('pw_download_popup_invisible');
    formLayer.addClass('pw_download_popup_visible');
    //set position

    var paddingX = formLayer.getStyle('padding-left').toInt() + formLayer.getStyle('padding-right').toInt();
    formLayer.setStyle('max-width', viewportWidth() - paddingX + 'px');
    var viewportXMiddle = viewportWidth() / 2;
    formLayer.setStyle('left', (viewportXMiddle - (formLayer.offsetWidth / 2)).toInt());
    formLayer.setStyle('top', (CursorPos.y - formLayer.offsetHeight / 2).toInt());

    // fade in
    var fade = (function () {
        formLayer.fade(0.9)
    }.delay(600));
}

function fadeOutForm() {
    $$('.pw_download_popup').each(function (formLayer) {
        formLayer.fade('out');
        formLayer.addClass('pw_download_popup_invisible');
        formLayer.removeClass('pw_download_popup_visible');
    });
}

function viewportWidth() {
    var viewportwidth;

    if (typeof window.innerWidth != 'undefined') {
        viewportwidth = window.innerWidth;
    }

    else if (typeof document.documentElement != 'undefined' && typeof document.documentElement.clientWidth != 'undefined' && document.documentElement.clientWidth != 0) {
        viewportwidth = document.documentElement.clientWidth;
    }
    else {
        viewportwidth = document.getElementsByTagName('body')[0].clientWidth;
    }
    return viewportwidth;
}

function viewportHeight() {
    var viewportheight;

    if (typeof window.innerWidth != 'undefined') {
        viewportheight = window.innerHeight;
    }

    else if (typeof document.documentElement != 'undefined' && typeof document.documentElement.clientWidth != 'undefined' && document.documentElement.clientWidth != 0) {
        viewportheight = document.documentElement.clientHeight;
    }
    else {
        viewportheight = document.getElementsByTagName('body')[0].clientHeight;
    }
    return viewportheight;
}
