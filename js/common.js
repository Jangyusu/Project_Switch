$(function () {
    $("header").load("common/header.html");
    $("footer").load("common/footer.html");

    setTimeout(function () { //html 로드 후 실행
        var header = $("header"),
            burgerButton = $(".burger__button"),
            firstScroll = 0,
            lastScroll = 0;





        $(window).on("scroll", headerScroll); //스크롤시 헤더 on/off
        burgerButton.on("click", burgerMenu); //버거메뉴 on/off





        function headerScroll() {
            lastScroll = $(this).scrollTop();

            if (lastScroll > firstScroll) { //아래로 스크롤
                header.addClass("active");
            } else { //위로 스크롤
                header.removeClass("active");
            }

            firstScroll = lastScroll;
        }

        function burgerMenu() {
            burgerButton.toggleClass("active");
        }
    }, 100)

})