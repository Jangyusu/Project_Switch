$(function () {
    $.ajax({
        url: 'data/nintendo_software.json',
        dataType: 'json',
        type: 'get',
        success: function (data) {
            //start

            var cartData = data.cart;

            $("header").mouseenter(headerRemove);
            $("header").mouseleave(headerAdd);

            $(".visual").click(visual); //클릭 이벤트







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

            function visual(e) {
                addActive($(".visual"));
                removeActive($(this));

                addActive($(this).find(".visual__contents"));

                if ($(e.target).hasClass("visual__contents_home")) { //홈으로 버튼
                    removeActive($(".visual"));
                    removeActive($(this).find(".visual__contents"));
                }


                firstMenu("life");
                secondMenu("life");

                firstMenu("ring");
                secondMenu("ring");

                firstMenu("cart");
                secondMenu("cart");

                firstMenu("super");
                secondMenu("super");



                if ($(e.target).hasClass("visual__life_top_img")) {//동물의 숲 상단 이미지
                    $(".visual__life_top_main").attr("src", $(e.target).attr("src"));
                }

                if ($(e.target).hasClass("visual__life_bottom_img")) {//동물의 숲 하단 이미지
                    $(".visual__life_bottom_main").attr("src", $(e.target).attr("src"));
                }

                if ($(e.target).hasClass("visual__life_back_btn") || $(e.target).hasClass("visual__life_back_btn_img")) {// 동물의 숲 뒤로가기 버튼
                    $(".visual__content").removeClass("active");
                    $(".visual__contents").removeClass("hide");
                }

                if ($(e.target).hasClass("visual__ring_back_btn") || $(e.target).hasClass("visual__ring_back_btn_img")) {//링피트 뒤로가기 버튼
                    $(".visual__content").removeClass("active");
                    $(".visual__contents").removeClass("hide");
                }

                if ($(e.target).hasClass("visual__cart_back_btn") || $(e.target).hasClass("visual__cart_back_btn_img")) {//마리오카트 뒤로가기 버튼
                    $(".visual__content").removeClass("active");
                    $(".visual__contents").removeClass("hide");
                }

                if ($(e.target).hasClass("visual__super_back_btn") || $(e.target).hasClass("visual__super_back_btn_img")) {//마리오카트 뒤로가기 버튼
                    $(".visual__content").removeClass("active");
                    $(".visual__contents").removeClass("hide");
                }

                if ($(e.target).hasClass("visual__cart_detail_close") || $(e.target).hasClass("visual__cart_detail_close_img")) {
                    $(".visual__cart_detail").removeClass("active");
                }

                if ($(e.target).hasClass("visual__cart_menu_box")) {
                    var cartIndex = $(e.target).index();

                    $(".visual__cart_detail_title").html(`${cartData[cartIndex].name}`);
                    $(".visual__cart_detail_text").html(`${cartData[cartIndex].sub}`);
                    $(".visual__cart_detail_img").attr("src", cartData[cartIndex].img);
                    $(".visual__cart_detail").addClass("active");
                }

                function firstMenu(targets) {
                    if ($(e.target).hasClass(`${targets}_first`)) {
                        addActive($(`.${targets}`));
                        $(".visual__contents").addClass("hide");
                        removeActive($(`.${targets}__introduce`));
                        addActive($(`.${targets}__contents`));
                    }
                }

                function secondMenu(targets) {
                    if ($(e.target).hasClass(`${targets}_first`)) {
                        addActive($(`.${targets}`));
                        $(".visual__contents").addClass("hide");
                        addActive($(`.${targets}__introduce`));
                        removeActive($(`.${targets}__contents`));
                    }
                }
            }

            $('.visual__super_menu').eq(0).clone().appendTo('.visual__super_menus'); //슬라이드 리스트 추가

            var superIndex = 1, t = 1;
            function superSlide() {
                setTimeout(function () {
                    superSlideCss(".5s");
                    t = 1;

                    if (superIndex == 4) {
                        superIndex = 0;
                        t = 0.001;
                        superSlideCss("0s");
                    }
                    superIndex++;
                    superSlide();
                }, t * 5000);
            }
            superSlide();

            function superSlideCss(time) {
                $(".visual__super_menu").css({
                    transform: `translate(-${superIndex * 100}%)`,
                    transition: time
                })
            }

            //End
        }
    });
});