$(function () { //문서 로드 후 실행
    //start

    var priceBln = true,
        $priceList = $(".price__list_box"),
        priceCount = $(".price__list_box").length,
        priceAfterCount = priceCount + (priceCount / 2),
        tabBln = true;



    $("header").hover(headerRemove, headerAdd); //헤더 엔터/리브
    $(window).scroll(scrollHeader); //스크롤 관련 이벤트

    $priceList.clone().appendTo(".price__list"); //슬라이드 리스트 추가
    $priceList.hover(priceEnter, priceLeave); //슬라이드 엔터/리브
    $(".price__ind").click(priceSlide); //슬라이드 클릭

    $(".question__list_q").click(tabBox); //질문 탭



    function scrollHeader() { //스크롤 관련 이벤트
        headerRemove();

        if ($(this).scrollTop() == 0) {
            headerAdd();
        }
    }

    function headerAdd() { //Header online Class 추가
        $("header").addClass("online");

        if (!$(window).scrollTop() == 0) {
            headerRemove();
        }
    }
    headerAdd();

    function headerRemove() { //Header online Class 제거
        $("header").removeClass("online");
    }

    function tabBox() { //질문 탭
        if (tabBln) {
            tabBln = false;
            var $answer = $(this).next();

            if ($answer.hasClass("active")) {
                removeActive($answer);
            } else {
                removeActive($(".question__list_a"));
                addActive($answer);
            }
            setTimeout(function () {
                tabBln = true;
            }, 300)
        }
    }

    function priceEnter() { //슬라이드 엔터
        addActive($priceList);
        removeActive($(this));

        clearInterval(autoSlideInter);
    }

    function priceLeave() { //슬라이드 리브
        removeActive($priceList);

        autoSlide();
    }

    function priceSlide(e) { //슬라이드 클릭
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
    var autoSlide = function () { //자동 슬라이드
        autoSlideInter = setInterval(function () {
            $(".price__ind").trigger("click");
        }, 3000)
    }
    autoSlide();

    function slideEffect(time) { //슬라이드 시 위치 및 시간
        $(".price__list").css({
            transition: time,
            transform: `translate(${-priceCount * 50}%)`
        });
    }
    slideEffect();

    //End
});