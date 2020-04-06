$(function () {
    $("loading").load("common/loading.html");

    setTimeout(function () {
        $.ajax({
            url: 'data/sub01.json',
            dataType: 'json',
            type: 'get',
            success: function (data) {
                //start



                //End
            }
        }, 100)
    });
});