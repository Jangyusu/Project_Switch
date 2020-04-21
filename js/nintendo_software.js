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
            $(window).scroll(scrollHeader);
            $(".visual").click(visual); //클릭 이벤트





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

            function visual(e) {
                $(".visual").addClass("active");
                $(this).removeClass("active");

                $(this).find(".visual__contents").addClass("active");

                if ($(e.target).hasClass("visual__contents_home_btn")) { //홈으로 버튼
                    $(".visual").removeClass("active");
                    $(this).find(".visual__contents").removeClass("active");
                }

                if ($(e.target).hasClass("animal_first_btn")) {//동물의 숲 첫번째 상세 메뉴 버튼
                    $(".visual__life").addClass("active");
                    $(".visual__contents").addClass("hide");
                    $(".visual__life_movie").removeClass("active");
                    $(".visual__life_content").addClass("active");
                }

                if ($(e.target).hasClass("animal_second_btn")) {//동물의 숲 두번째 상세 메뉴 버튼
                    $(".visual__life").addClass("active");
                    $(".visual__contents").addClass("hide");
                    $(".visual__life_content").removeClass("active");
                    $(".visual__life_movie").addClass("active");
                }

                if ($(e.target).hasClass("ring_first_btn")) {//링피트 첫번째 상세 메뉴 버튼
                    $(".visual__ring").addClass("active");
                    $(".visual__contents").addClass("hide");
                    $(".visual__ring_movie").removeClass("active");
                    $(".visual__ring_content").addClass("active");
                }

                if ($(e.target).hasClass("ring_second_btn")) {//링피트 두번째 상세 메뉴 버튼
                    $(".visual__ring").addClass("active");
                    $(".visual__contents").addClass("hide");
                    $(".visual__ring_content").removeClass("active");
                    $(".visual__ring_movie").addClass("active");
                }

                if ($(e.target).hasClass("cart_first_btn")) {//마리오카트 첫번째 상세 메뉴 버튼
                    $(".visual__cart").addClass("active");
                    $(".visual__contents").addClass("hide");
                    $(".visual__cart_movie").removeClass("active");
                    $(".visual__cart_content").addClass("active");
                }

                if ($(e.target).hasClass("cart_second_btn")) {//마리오카트 두번째 상세 메뉴 버튼
                    $(".visual__cart").addClass("active");
                    $(".visual__contents").addClass("hide");
                    $(".visual__cart_content").removeClass("active");
                    $(".visual__cart_movie").addClass("active");
                }

                if ($(e.target).hasClass("super_first_btn")) {//슈퍼스매시 첫번째 상세 메뉴 버튼
                    $(".visual__super").addClass("active");
                    $(".visual__contents").addClass("hide");
                    $(".visual__super_movie").removeClass("active");
                    $(".visual__super_content").addClass("active");
                }

                if ($(e.target).hasClass("super_second_btn")) {//슈퍼스매시 두번째 상세 메뉴 버튼
                    $(".visual__super").addClass("active");
                    $(".visual__contents").addClass("hide");
                    $(".visual__super_content").removeClass("active");
                    $(".visual__super_movie").addClass("active");
                }

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