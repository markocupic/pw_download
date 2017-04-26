// javascript for contao content element pw_download

(function ($) {
    "use strict";

    $(document).ready(function () {


        // FadeIn overlay
        $('.ce_pw_download a').click(function (e) {
            e.preventDefault();
            e.stopPropagation();

            var link = $(this);

            // Define the vars
            var href = $(link).attr('href');
            var id = $(link).attr('data-id');
            var overlay = $(link).closest('.ce_pw_download').find('.pw_download_overlay');
            var elInput = $(overlay).find('.input-code');
            var elSubmit = $(overlay).find('.submit');

            // Reset
            $('.pw_download_overlay').hide();
            $('.pw_download_message').html('');


            // Event fadeOut
            $('.pw_download_overlay, .pw_download_overlay_close').click(function (e) {
                e.preventDefault();
                e.stopPropagation();
                $('.pw_download_message').html('');
                $('.pw_download_overlay input.input-code').val('');

                $('.pw_download_overlay').fadeOut();
            });

            $('.pw_download_content').click(function (e) {
                e.preventDefault();
                e.stopPropagation();
            });



            // If the user has authenticated already, send file to browser
            if ($(link).attr('data-auth') == 'false') {
                window.location.href = href;
                return;
            }else{
                // If user has to authenticate...
                $(overlay).fadeIn();
            }



            // XHR request
            $(elSubmit).click(function (e) {
                $('.pw_download_message').html('');
                $.getJSON(window.location.href, {
                    code: elInput.val(),
                    id: id
                })
                    .done(function (data) {
                        if (data.status == 'success') {
                            $('.pw_download_message').html(data.message);
                            window.setTimeout(function () {
                                $('.pw_download_overlay').fadeOut();
                                $('.pw_download_message').html('');
                                $(link).attr('data-auth', 'false');

                                // Start download
                                window.location.href = href;
                            }, 2000);
                        } else {
                            $('.pw_download_message').html(data.message);
                        }
                    });
            });

        });
    });
})(jQuery);


