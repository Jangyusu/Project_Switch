$(function () {
    $("header").load("common/header.html");
    $("footer").load("common/footer.html");

    setTimeout(function () { //html 로드 후 실행
        //start

        var $header = $("header"),
            $nav = $("nav"),
            $burgerButton = $(".burger__button"),
            $language = $(".language a"),
            firstScroll = 0,
            lastScroll = 0;





        $(window).scroll(headerScroll); //스크롤시 헤더 on/off
        $burgerButton.click(burgerMenu); //버거메뉴 on/off
        $language.click(languageChange); //언어 변경





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

            $nav.on('scroll touchmove mousewheel', function (e) {
                e.preventDefault();
                e.stopPropagation();
                return false;
            });
        }
        
        // end
    }, 100)

})