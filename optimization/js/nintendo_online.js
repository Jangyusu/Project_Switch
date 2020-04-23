$(function () {
    //start

    var priceBln = true,
        $priceList = $(".price__list_box"),
        priceCount = $(".price__list_box").length,
        priceAfterCount = priceCount + (priceCount / 2),
        tabBln = true;





    $("header").mouseenter(headerRemove);
    $("header").mouseleave(headerAdd);
    $(window).scroll(scrollHeader);

    $priceList.clone().appendTo(".price__list"); //슬라이드 리스트 추가
    $priceList.mouseenter(priceEnter); //슬라이드 컨텐츠 엔터
    $priceList.mouseleave(priceLeave); //슬라이드 컨텐츠 리브                
    $(".price__ind").click(priceSlide); //슬라이드 클릭

    $(".question__list_q").click(tabBox); //질문 탭





    function headerAdd() {
        $("header").addClass("online");

        if (!$(window).scrollTop() == 0) {
            headerRemove();
        }
    }
    headerAdd();

    function headerRemove() {
        $("header").removeClass("online");
    }

    function scrollHeader() {
        headerRemove();

        if ($(this).scrollTop() == 0) {
            headerAdd();
        }
    }

    function tabBox() {
        if (tabBln) {
            tabBln = false;
            var $answer = $(this).next();

            if ($answer.hasClass("active")) {
                $answer.removeClass("active");
            } else {
                $(".question__list_a").removeClass("active");
                $answer.addClass("active");
            }
            setTimeout(function () {
                tabBln = true;
            }, 300)
        }
    }

    function priceEnter() {
        $priceList.addClass("active");
        $(this).removeClass("active");

        clearInterval(autoSlideInter);
    }

    function priceLeave() {
        $priceList.removeClass("active");

        autoSlide();
    }

    function priceSlide(e) {
        if (priceBln) {
            priceBln = false;

            var hasClass = $(e.target).hasClass("price__ind_prev"),
                parentHasClass = $(e.target).parent().hasClass("price__ind_prev");

            if (hasClass || parentHasClass) { //왼쪽 버튼
                priceCount--;
            } else { //오른쪽 버튼
                priceCount++;
            }

            slide();

            function slide() {
                slideEffect("0.5s");

                if (priceCount == 0) {
                    slideReset(2);
                } else if (priceCount == priceAfterCount) {
                    slideReset(4);
                }

                function slideReset(num) {
                    priceCount = $(".price__list_box").length / num;

                    setTimeout(function () {
                        slideEffect("0s");
                    }, 500)
                }
            }

            setTimeout(function () {
                priceBln = true;
            }, 500)
        }
    }
    var autoSlideInter;
    var autoSlide = function () {
        autoSlideInter = setInterval(function () {
            $(".price__ind").trigger("click");
        }, 3000)
    }
    autoSlide();

    function slideEffect(time) {
        $(".price__list").css({
            transition: time,
            transform: `translate(${-priceCount * 50}%)`
        });
    }
    slideEffect();

    //End
});