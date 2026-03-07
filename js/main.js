(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).on('scroll', function () {
        if ($(this).scrollTop() > 0) {
            $('.navbar.sticky-top').addClass('shadow-sm navbar-scrolled');
        } else {
            $('.navbar.sticky-top').removeClass('shadow-sm navbar-scrolled');
        }
    });

    // Keep one-page navbar active state in sync with current section
    var $navLinks = $('.navbar .navbar-nav .nav-link[href^="#"]');
    var setActiveById = function (id) {
        if (!id) {
            return;
        }
        $navLinks.removeClass('active');
        $navLinks.filter('[href="' + id + '"]').addClass('active');
    };

    var updateActiveNavLink = function () {
        if (!$navLinks.length) {
            return;
        }

        var navbarHeight = $('.navbar.sticky-top').outerHeight() || 0;
        var marker = $(window).scrollTop() + navbarHeight + 24;
        var viewportBottom = $(window).scrollTop() + $(window).height();
        var documentBottom = $(document).height() - 4;
        var currentId = '';

        $navLinks.each(function () {
            var targetId = $(this).attr('href');
            var $target = $(targetId);
            if (!$target.length) {
                return;
            }

            var top = $target.offset().top;
            var bottom = top + $target.outerHeight();

            if (marker >= top && marker < bottom) {
                currentId = targetId;
                return false;
            }

            if (marker >= top) {
                currentId = targetId;
            }
        });

        if (viewportBottom >= documentBottom) {
            currentId = $navLinks.last().attr('href');
        }

        if (!currentId) {
            currentId = '#header';
        }

        setActiveById(currentId);
    };

    $navLinks.on('click', function () {
        setActiveById($(this).attr('href'));
    });

    $(window).on('scroll resize hashchange', updateActiveNavLink);
    updateActiveNavLink();
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


    // Header carousel
    $(".header-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        items: 1,
        dots: true,
        loop: true,
        nav : true,
        navText : [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ]
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        center: true,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
        responsive: {
            0:{
                items:1
            },
            768:{
                items:2
            }
        }
    });


    // Portfolio isotope and filter
    var portfolioIsotope = $('.portfolio-container').isotope({
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
    });
    $('#portfolio-flters li').on('click', function () {
        $("#portfolio-flters li").removeClass('active');
        $(this).addClass('active');

        portfolioIsotope.isotope({filter: $(this).data('filter')});
    });
    
})(jQuery);

