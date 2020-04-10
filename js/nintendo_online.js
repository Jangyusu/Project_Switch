$(function () {
    $("loading").load("common/loading.html");

    setTimeout(function () {
        $.ajax({
            url: 'data/data.json',
            dataType: 'json',
            type: 'get',
            success: function (data) {
                //start

                $("header").mouseenter(headerRemove);
                $("header").mouseleave(headerAdd);
                $(window).scroll(scrollHeader);





                function scrollHeader() {
                    headerRemove;
                    if ($(this).scrollTop() == 0) {
                        headerAdd;
                    }
                }

                function headerAdd() {
                    $("header").addClass("online");
                }
                headerAdd();

                function headerRemove() {
                    $("header").removeClass("online");
                }

                //End
            }
        }, 100)
    });
});