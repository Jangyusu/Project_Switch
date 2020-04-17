$(function () {
    $("loading").load("common/loading.html");

    setTimeout(function () {
        $.ajax({
            url: 'data/data.json',
            dataType: 'json',
            type: 'get',
            success: function (data) {
                //start
                var position = 0,
                    priceBln = true,
                    priceCount = $(".price__content").length,
                    priceAfterCount = priceCount + $(".price__content").length / 2,
                    tabBln = true;





                $(window).focus(backStart); //back슬라이드 시작
                $(window).blur(backStop); //back슬라이드 정지

                $("header").mouseenter(headerRemove);
                $("header").mouseleave(headerAdd);
                $(window).scroll(scrollHeader);

                $('.price__content').clone().appendTo('.price__list'); //슬라이드 리스트 추가
                $(".price__content").mouseenter(priceEnter); //슬라이드 컨텐츠 엔터
                $(".price__content").mouseleave(priceLeave); //슬라이드 컨텐츠 리브                
                $(".price__arrow").click(priceSlide); //슬라이드 클릭

                $(".question__q_box").click(tabBox); //질문 탭





                function tabBox() {
                    if (tabBln) {
                        tabBln = false;
                        var $answer = $(this).next();

                        if ($answer.hasClass("active")) {
                            $answer.removeClass("active");
                        } else {
                            $(".question__a_box").removeClass("active");
                            $answer.addClass("active");
                        }
                        setTimeout(function () {
                            tabBln = true;
                        }, 300)
                    }
                }

                function backStart() {
                    backSlide();
                }

                function backStop() {
                    clearInterval(backSlideInter);
                }

                // var backSlideInter;
                // var backSlide = function () {
                //     backSlideInter = setInterval(function () {
                //         position += 100;

                //         $("main").css({
                //             "background-position": `-${position}px center`
                //         })
                //     }, 5000)
                // };
                // backSlide();

                function scrollHeader() {
                    headerRemove();

                    if ($(this).scrollTop() == 0) {
                        headerAdd();
                    }
                }

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

                function priceEnter() {
                    $(".price__content").addClass("active");
                    $(this).removeClass("active");

                    clearInterval(autoSlideInter);
                }

                function priceLeave() {
                    $(".price__content").removeClass("active");

                    autoSlide();
                }

                function priceSlide(e) {
                    if (priceBln) {
                        priceBln = false;

                        var hasClass = $(e.target).hasClass("price__left_arrow"),
                            parentHasClass = $(e.target).parent().hasClass("price__left_arrow");

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
                                priceCount = $(".price__content").length / num;

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
                        $(".price__arrow").trigger("click");
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
            }
        }, 100)
    });
});