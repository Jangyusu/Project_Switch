$(function () {
    //start

    var $kindsList = $(".kinds__list li"),
        $kindsBar = $(".kinds__bar"),
        $kindsControls = $(".kinds__controls button"),
        $kindsFront = $(".kinds__controls_front"),
        $kindsBack = $(".kinds__controls_back"),
        $kindsImg = $(".kinds__img"),
        $select = 1,
        $selectNum = 1,
        $homeList = $(".home__list li"),
        $homeText = $(".home__img p"),
        homeTextList = [
            "게임에 관한 최신 정보 등을 Nintendo Switch 본체에 수신합니다.",
            "소프트웨어나 추가 콘텐츠 등을 다운로드 구입할 수 있습니다. 또한, TVCM이나 소개 영상 등, 소프트웨어의 정보를 확인할 수 있습니다.",
            "촬영한 게임 화면 등을 열람할 수 있습니다. 화면에 텍스트를 자유롭게 입력할 수 있으며, SNS에 손쉽게 공유할 수도 있습니다."
        ];





    $kindsList.click(kindsSelected); //리스트 클릭
    $kindsControls.click(kindsControl); //앞뒷면 클릭
    $homeList.mouseenter(homeTextShow); //homeList 엔터
    $homeList.mouseleave(homeTextHide); //homeList 리브





    function kindsSelected() {
        $kindsList.removeClass("active");
        $(this).addClass("active");

        $kindsBar.width($(this).width() + 80);
        $kindsBar.offset({ left: $(this).offset().left })

        $kindsFront.find("img").attr({ src: "img/features_and_specifications/bg_switch_device_tab_ov.gif" });
        $kindsBack.find("img").attr({ src: "img/features_and_specifications/bg_switch_device_tab.gif" });

        $select = $(this).data("selector");
        $selectNum = 01;
        changeImg();
    }
    $kindsBar.width($kindsList.eq(0).width() + 80); //초기값

    function kindsControl(e) {
        $target = $(e.target);

        $(this).find("img").attr({ src: "img/features_and_specifications/bg_switch_device_tab_ov.gif" });
        $(this).siblings().find("img").attr({ src: "img/features_and_specifications/bg_switch_device_tab.gif" });

        $selectNum = $(this).data("num");
        changeImg();
    }

    function changeImg() {
        $kindsImg.attr({ src: `img/features_and_specifications/img_switch_device_spec_detail${$select}_${$selectNum}.jpg` });
    }
    changeImg();

    function homeTextShow() {
        $homeText.text(`${homeTextList[$(this).index()]}`);
        $homeText.addClass("active");
    }

    function homeTextHide() {
        $homeText.removeClass("active");
    }

    //End
});