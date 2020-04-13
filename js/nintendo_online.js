$(function () {
    $("loading").load("common/loading.html");

    setTimeout(function () {
        $.ajax({
            url: 'data/data.json',
            dataType: 'json',
            type: 'get',
            success: function (data) {
                //start
                var priceIndex = 0,
                    priceBln = true;





                $("header").mouseenter(headerRemove);
                $("header").mouseleave(headerAdd);
                $(window).scroll(scrollHeader);
                $(".price__content").mouseenter(priceEnter);
                $(".price__content").mouseleave(priceLeave);
                $(".price__arrow").click(priceSlide);





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
                }

                function priceLeave() {
                    $(".price__content").removeClass("active");
                }

                function priceSlide(e) {
                    if (priceBln) {
                        priceBln = false;

                        if ($(e.target).parent().hasClass("price__left_arrow")) { //왼쪽 버튼
                            priceIndex--;
                        } else { //오른쪽 버튼
                            priceIndex++;
                        }

                        slide();

                        function slide() {
                            $(".price__list").css({
                                transform: `translate(${-priceIndex * 50}%)`
                            });
                        }
                        setTimeout(function () {
                            priceBln = true;
                        }, 500)
                    }
                }

                //End
            }
        }, 100)
    });
});