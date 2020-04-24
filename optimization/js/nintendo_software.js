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
            $(".visual").click(visual); //화면 클릭 이벤트





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

                firstMenu("life"); //동물의숲 첫번째 메뉴
                secondMenu("life"); //동물의숲 두번째 메뉴                
                backBtn("life"); //동물의숲 뒤로가기 버튼

                firstMenu("ring"); //링피트 첫번째 메뉴
                secondMenu("ring"); //링피트 두번째 메뉴
                backBtn("ring"); //링피트 뒤로가기 버튼

                firstMenu("cart"); //마리오카트 첫번째 메뉴
                secondMenu("cart"); //마리오카트 두번째 메뉴
                backBtn("cart"); //마리오카트 뒤로가기 버튼

                firstMenu("super"); //수퍼스매시 첫번째 메뉴
                secondMenu("super"); //수퍼스매시 두번째 메뉴
                backBtn("super"); //수퍼스매시 뒤로가기 버튼

                imgChange("top"); //동물의숲 상단 이미지 변경
                imgChange("bottom"); //동물의숲 하단 이미지 변경






                if ($(e.target).hasClass("visual__cart_detail_close") || $(e.target).hasClass("visual__cart_detail_close_img")) { //마리오카트 상세보기 on/off
                    $(".visual__cart_detail").removeClass("active");
                }

                if ($(e.target).hasClass("visual__cart_menu_box")) { //마리오카트 상세보기 변경
                    var cartIndex = $(e.target).index();

                    $(".visual__cart_detail_title").html(`${cartData[cartIndex].name}`);
                    $(".visual__cart_detail_text").html(`${cartData[cartIndex].sub}`);
                    $(".visual__cart_detail_img").attr("src", cartData[cartIndex].img);
                    $(".visual__cart_detail").addClass("active");
                }

                function firstMenu(targets) { //컨텐츠 첫번째 메뉴
                    if ($(e.target).hasClass(`${targets}_first`)) {
                        addActive($(`.${targets}`));
                        $(".visual__contents").addClass("hide");
                        removeActive($(`.${targets}__introduce`));
                        addActive($(`.${targets}__contents`));
                    }
                }

                function secondMenu(targets) { //컨텐츠 두번째 메뉴
                    if ($(e.target).hasClass(`${targets}_second`)) {
                        addActive($(`.${targets}`));
                        $(".visual__contents").addClass("hide");
                        addActive($(`.${targets}__introduce`));
                        removeActive($(`.${targets}__contents`));
                    }
                }

                function imgChange(position) { //동물의 숲 이미지 변경
                    if ($(e.target).hasClass(`life__contents_${position}_sub_img`)) {
                        $(`.life__contents_${position}_main_img`).attr("src", $(e.target).attr("src"));
                    }
                }

                function backBtn(targets) { //컨텐츠 뒤로가기 버튼
                    if ($(e.target).hasClass(`${targets}__prev`) || $(e.target).hasClass(`${targets}__prev_img`)) {// 동물의숲 뒤로가기 버튼
                        removeActive($(".visual__content"));
                        removeHide($(".visual__contents"));
                    }
                }
            }

            $('.super__contents_list_box').eq(0).clone().appendTo('.super__contents_list'); //수퍼스매시 첫번째 슬라이드 리스트 추가
            var superIndex = 1, t = 1;
            function superSlide() { //수퍼스매시 자동 슬라이드
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

                function superSlideCss(time) {
                    $(".super__contents_list_box").css({
                        transform: `translate(-${superIndex * 100}%)`,
                        transition: time
                    })
                }
            }
            superSlide();

            //End
        }
    });
});