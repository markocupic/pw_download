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
            overlay: null,
            elInput: null,
            elSubmit: null,
            elMessage: null,

            resetForm: function () {
                $(PwDownload.elMessage).html('');
                $(PwDownload.elInput).val('');

            },

            hideForm: function () {
                $(PwDownload.overlay).fadeOut();
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
                    PwDownload.overlay = $(PwDownload.link).closest('.ce_pw_download').find('.pw_download_overlay');
                    PwDownload.elInput = $(PwDownload.overlay).find('.input-code');
                    PwDownload.elSubmit = $(PwDownload.overlay).find('.submit');
                    PwDownload.elMessage = $('.pw_download_message');

                    // Reset
                    PwDownload.resetForm();
                    PwDownload.hideForm();


                    // Event fadeOut
                    $('.pw_download_overlay, .pw_download_overlay_close').click(function (e) {
                        e.preventDefault();
                        e.stopPropagation();
                        PwDownload.resetForm();
                        PwDownload.hideForm();
                    });

                    $('.pw_download_content').click(function (e) {
                        e.preventDefault();
                        e.stopPropagation();
                    });

                    // If the user has authenticated already, send file to browser
                    if ($(PwDownload.link).attr('data-auth') == 'false') {
                        window.location.href = PwDownload.href;
                        return;
                    } else {
                        // If user has to authenticate...
                        $(PwDownload.overlay).fadeIn();
                    }

                    // XHR request
                    $(PwDownload.elSubmit).click(function (e) {
                        $('.pw_download_message').html('');
                        $.getJSON(window.location.href, {
                            code: PwDownload.elInput.val(),
                            id: PwDownload.id
                        }).done(function (data) {
                            if (data.status == 'success') {
                                $('.pw_download_message').html(data.message);
                                window.setTimeout(function () {
                                    PwDownload.hideForm();
                                    PwDownload.resetForm();
                                    $(PwDownload.link).attr('data-auth', 'false');

                                    // Start download
                                    PwDownload.downloadFile();
                                }, 2000);
                            } else {
                                $('.pw_download_message').html(data.message);
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