$(function () {
    $("loading").load("common/loading.html");

    setTimeout(function () {
        $.ajax({
            url: 'data/sub01.json',
            dataType: 'json',
            type: 'get',
            success: function (data) {
                //start

                var lineupData = data.lineup,
                    lineup2019 = lineupData[0].year2019,
                    lineup2018 = lineupData[1].year2018,
                    lineup2017 = lineupData[2].year2017,
                    $lineup = $(".content_2019__list"),
                    lineupAppend = "",
                    lineupNum = 2019,
                    title, sub, date, price, img;

                $.each(lineup2019, function () {  //lineup 2019 Html 추가
                    title = this.ko.title,
                        sub = this.ko.sub,
                        date = this.ko.date,
                        price = this.ko.price,
                        img = this.ko.img;

                    lineupAppend +=
                        `<figure>
                            <img src="${img}" alt="Nintendo Switch">
                            <figcaption>
                                <small class="content__sub_title">${sub}</small>
                                <p class="content__title">${title}</p>
                                <dl>
                                    <dt>발매일</dt>
                                    <dd class="content__date">${date}</dd>
                                    <dt>희망소비자가격</dt>
                                    <dd class="content__price">${price}</dd>
                                </dl>
                            </figcaption>
                        </figure>`
                });
                $lineup.append(lineupAppend);


                //End
            }
        }, 100)
    });
});