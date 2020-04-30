$(function () { //문서 로드 후 실행
    $.ajaxSetup({ //IE브라우저 캐시 사용하지 않음
        cache: false
    });

    $("header").load("common/header.html"); //header 로드
    $("footer").load("common/footer.html"); //footer 로드
    $("aside").load("common/aside.html"); //aside 로드

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
        $language.click(languageChange); //메인페이지 언어 변경
        $(window).scroll(scrollSlide); //스크롤 바 움직임





        function languageChange() { //메인페이지 언어 변경
            $language.removeClass("active");
            $(this).addClass("active");
        }

        function headerScroll() { //스크롤시 헤더 on/off
            lastScroll = $(this).scrollTop();

            if (lastScroll > firstScroll) { //아래로 스크롤
                $header.addClass("active");
            } else { //위로 스크롤
                $header.removeClass("active");
            }

            firstScroll = lastScroll;
        }

        function burgerMenu() { //버거메뉴 on/off
            $burgerButton.toggleClass("active");
            $nav.toggleClass("active");
            $(".header__nav_list").toggleClass("flex");

            $nav.on('scroll touchmove mousewheel', function (e) { //버거메뉴 on시 스크롤 막기
                e.preventDefault();
                e.stopPropagation();
                return false;
            });

            $scrollBar.toggleClass("active");

            if (!$nav.hasClass("active")) { //버거메뉴 on/off시 transition 변경
                detaileTime(0);

                setTimeout(function () {
                    detaileTime(.3);
                }, 300);

                function detaileTime(time) {
                    $(".header__nav_detail-list").css({
                        transition: time + "s"
                    });
                };
            }
        }

        function scrollSlide() {  //스크롤 바 움직임
            var $docHeight = $(document).height() - ($(window).height());

            $scrollBar.css({
                "top": ($(window).scrollTop() / $docHeight * 100) + "%"
            })
        }

        // end
    }, 500)

})