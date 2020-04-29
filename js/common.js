$(function () {
    $("header").load("common/header.html?" + new Date().getTime()); //header 로드
    $("footer").load("common/footer.html?" + new Date().getTime()); //footer 로드
    $("aside").load("common/aside.html?" + new Date().getTime()); //aside 로드

    setTimeout(function () { //html 로드 후 실행
        //start

        var $header = $("header"),
            $nav = $("nav"),
            $burgerButton = $(".header__burger_button"),
            $language = $(".header__burger_language_link"),
            firstScroll = 0,
            lastScroll = 0,
            $scrollBar = $(".scroll_bar");





        $(window).scroll(headerScroll); //스크롤시 헤더 on/off
        $burgerButton.click(burgerMenu); //버거메뉴 on/off
        $language.click(languageChange); //언어 변경
        $(window).scroll(scrollSlide); //스크롤 바 변경





        function languageChange() {
            $language.removeClass("active");
            $(this).addClass("active");
        }

        function headerScroll() {
            lastScroll = $(this).scrollTop();

            if (lastScroll > firstScroll) { //아래로 스크롤
                $header.addClass("active");
            } else { //위로 스크롤
                $header.removeClass("active");
            }

            firstScroll = lastScroll;
        }

        function burgerMenu() {
            $burgerButton.toggleClass("active");
            $nav.toggleClass("active");
            $(".header__nav_list").toggleClass("flex");

            $nav.on('scroll touchmove mousewheel', function (e) {
                e.preventDefault();
                e.stopPropagation();
                return false;
            });

            $scrollBar.toggleClass("active");

            if (!$nav.hasClass("active")) {
                detaileTime(0);

                setTimeout(function () {
                    detaileTime(.3);
                }, 300)
            }

            function detaileTime(time) {
                $(".header__nav_detail-list").css({
                    transition: `${time}s`
                })
            }
        }

        function scrollSlide() {
            var $docHeight = $(document).height() - ($(window).height());

            $scrollBar.css({
                "top": `${$(window).scrollTop() / $docHeight * 100}%`
            })
        }

        // end
    }, 500)

})