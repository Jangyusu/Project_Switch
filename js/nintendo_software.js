$(function () {
    //start

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


    }

    //end
});