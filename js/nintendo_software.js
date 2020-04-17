$(function () {
    //start

    $("header").mouseenter(headerRemove);
    $("header").mouseleave(headerAdd);
    $(window).scroll(scrollHeader);

    $(".visual").click(function () {
        $(".visual").addClass("active");
        $(this).removeClass("active");

        $(this).find(".visual__contents").css({
            display: "flex"
        })
    })




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

    //end
});