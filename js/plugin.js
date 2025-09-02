$(window).on("load", function() {

    $(function() {
        var $menu = $(".header");
        var stickyOffset = $menu.offset().top;

        $(window).on("scroll", function() {
            if ($(window).scrollTop() > stickyOffset) {
                $menu.addClass("sticky");
            } else {
                $menu.removeClass("sticky");
            }
        });
    });

    // End scroll Heeader

    function setActiveClass(parentSelector, childSelector) {
        $(parentSelector).on("click", childSelector, function() {
            if (!$(this).hasClass("active")) {
                $(this).addClass("active").siblings().removeClass("active");
            }
        });
    }
    setActiveClass(".pagination", "li a");

    $(function() {
        const navbarMenu = $("#navbar");
        const overlayMenu = $(".overlay");

        $("#burger, .overlay").click(function() {
            navbarMenu.toggleClass("active");
            overlayMenu.toggleClass("active");
        });

        navbarMenu.on("click", "[data-toggle]", function(e) {
            if (window.innerWidth <= 999) {
                e.preventDefault();
                const $menuDropdown = $(this).parent();

                if ($menuDropdown.hasClass("active")) {
                    $menuDropdown.removeClass("active").find(".submenu").removeAttr("style");
                } else {
                    $(".menu-dropdown.active .submenu").removeAttr("style");
                    $(".menu-dropdown.active").removeClass("active");

                    $menuDropdown.addClass("active");
                    $menuDropdown.find(".submenu").css("max-height", $menuDropdown.find(".submenu")[0].scrollHeight + "px");
                }
            }
        });

        $(window).on("resize", function() {
            if (window.innerWidth > 999) {
                navbarMenu.removeClass("active");
                $(".menu-dropdown.active").removeClass("active").find(".submenu").removeAttr("style");
            }
        });
    });


    $('.cancel').click(function() {
        $('.navbar,.overlay').removeClass("active");
    });
    $(".menu-item").click(function() {
        $(this).addClass("activelink").siblings().removeClass("activelink");
    });

    ////////////////// End show Header

    $(window).scroll(function() {
        if ($(this).scrollTop() > 800) {
            $('.scrollTopBtn').addClass('show');
        } else {
            $('.scrollTopBtn').removeClass('show');
        }
    });

    $('.scrollTopBtn').click(function() {
        $('html, body').animate({ scrollTop: 0 }, 600);
        return false;
    });

    // End Scroll Top


    $("#logoUpload").on("change", function() {
        let file = this.files[0];
        if (file) {
            $(".file-name").text(file.name);
            $(".remove-file").show();
            let reader = new FileReader();
            reader.onload = function(e) {
                $("#previewImage").attr("src", e.target.result).show();
            }
            reader.readAsDataURL(file);
        }
    });

    $(".remove-file").on("click", function() {
        $("#logoUpload").val(""); //        
        $(".file-name").text("");
        $("#previewImage").hide().attr("src", "");
        $(this).hide();
    });

    $(".mobile-number").intlTelInput({
        //autoFormat: false,
        //autoHideDialCode: false,
        //defaultCountry: "jp",
        //nationalMode: true,
        //numberType: "MOBILE",
        //onlyCountries: ['us', 'gb', 'ch', 'ca', 'do'],
        //preferredCountries: ['cn', 'jp'],
        //responsiveDropdown: true,
        //  utilsScript: "lib/libphonenumber/build/utils.js"
    });

    $(".custom-file-input").on("change", function() {
        var fileName = $(this).val().split("\\").pop();
        $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
    });

    $(function() {

        // We can attach the `fileselect` event to all file inputs on the page
        $(document).on('change', ':file', function() {
            var input = $(this),
                numFiles = input.get(0).files ? input.get(0).files.length : 1,
                label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
            input.trigger('fileselect', [numFiles, label]);
        });

        // We can watch for our custom `fileselect` event like this
        $(document).ready(function() {
            $(':file').on('fileselect', function(event, numFiles, label) {

                var input = $(this).parents('.input-group').find(':text'),
                    log = numFiles > 1 ? numFiles + ' files selected' : label;

                if (input.length) {
                    input.val(log);
                } else {
                    if (log) alert(log);
                }

            });
        });

    });

    $(function() {
        $('#edit').editable({
            inlineMode: false,
            alwaysBlank: true
        })
    });


    $("#searchInput").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        var found = false;

        $("#dataTable tbody tr").filter(function() {
            var match = $(this).text().toLowerCase().indexOf(value) > -1;
            $(this).toggle(match);
            if (match) found = true;
        });

        if (!found && value !== "") {
            $(".no-result").show();
        } else {
            $(".no-result").hide();
        }
    });

});


function initSlider(sliderID, carouselID) {
    const $carouselItems = $('#' + carouselID + ' .slides li');
    const showNav = $carouselItems.length > 3;

    $('#' + carouselID).flexslider({
        animation: "slide",
        controlNav: false,
        animationLoop: false,
        slideshow: false,
        itemWidth: 180,
        asNavFor: '#' + sliderID,
        directionNav: showNav
    });

    $('#' + sliderID).flexslider({
        animation: "slide",
        controlNav: false,
        animationLoop: false,
        slideshow: true,
        slideshowSpeed: 3000,
        sync: '#' + carouselID
    });
}


$(window).on('load', function() {
    initSlider('slider1', 'carousel1');
    initSlider('slider2', 'carousel2');
});



function execCmd(command) {
    document.execCommand(command, false, null);
}

function execCmdArg(command, value) {
    document.execCommand(command, false, value);
}