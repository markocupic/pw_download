/**
 * PwDownload
 * @author Marko Cupic
 */
(function ($) {
    "use strict";

    $(document).ready(function () {

        var PwDownload = {
            link: null,
            href: null,
            id: null,
            backdrop: null,
            elInput: null,
            elSubmit: null,
            elMessage: null,

            resetForm: function () {
                $(PwDownload.elMessage).html('');
                $(PwDownload.elInput).val('');

            },

            hideForm: function () {
                $(PwDownload.backdrop).fadeOut();
            },

            downloadFile: function () {
                window.location.href = PwDownload.href;
            },
            initialize: function () {
                // FadeIn overlay
                // FadeIn overlay
                $('.ce_pw_download a').click(function (e) {
                    e.preventDefault();
                    e.stopPropagation();

                    // Define the vars
                    PwDownload.link = $(this);
                    PwDownload.href = $(PwDownload.link).attr('href');
                    PwDownload.id = $(PwDownload.link).attr('data-id');
                    PwDownload.backdrop = $(PwDownload.link).closest('.ce_pw_download').find('.pwd-modal');
                    PwDownload.elInput = $(PwDownload.backdrop).find('.pwd-input-code');
                    PwDownload.elSubmit = $(PwDownload.backdrop).find('.pwd-modal-footer .submit');
                    PwDownload.elMessage = $('.pwd-response-message');

                    // Reset
                    PwDownload.resetForm();
                    PwDownload.hideForm();


                    // Event fadeOut
                    $('*[data-dismiss="pwd-modal"]').click(function (e) {
                        e.preventDefault();
                        e.stopPropagation();
                        PwDownload.resetForm();
                        PwDownload.hideForm();
                    });

                    $('.pwd-modal-dialog').click(function (e) {
                        e.preventDefault();
                        e.stopPropagation();
                    });

                    // If the user has authenticated already, send file to browser
                    if ($(PwDownload.link).attr('data-auth') == 'false') {
                        window.location.href = PwDownload.href;
                        return;
                    } else {
                        // If user has to authenticate...
                        $(PwDownload.backdrop).fadeIn();
                    }

                    // XHR request
                    $(PwDownload.elSubmit).click(function (e) {
                        $(PwDownload.elMessage).html('');
                        $.getJSON(window.location.href, {
                            code: PwDownload.elInput.val(),
                            id: PwDownload.id
                        }).done(function (data) {
                            if (data.status == 'success') {
                                $(PwDownload.elMessage).html(data.message);
                                window.setTimeout(function () {
                                    PwDownload.hideForm();
                                    PwDownload.resetForm();
                                    $(PwDownload.link).attr('data-auth', 'false');

                                    // Start download
                                    PwDownload.downloadFile();
                                }, 2000);
                            } else {
                                $(PwDownload.elMessage).html(data.message);
                            }
                        });
                    });
                });
            }
        };

        // Initialize
        PwDownload.initialize();
    });
})(jQuery);