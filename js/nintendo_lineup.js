$(function () {
    setTimeout(function () {
        $.ajax({
            url: 'data/lineup.json',
            dataType: 'json',
            type: 'get',
            success: function (data) {
                //start

                var lineupData = data.lineup,
                    $lineupList = $(".contents__list"),
                    $lineupSerch = $(".contents__header input"),
                    $button = $(".more_button"),
                    $contentsNumber = $(".contents__number"),
                    $sortButton = $(".contents__button"),
                    $sortSeleced = $(".contents__selected"),
                    lineupAppend = "",
                    lineupListAppend = "",
                    lineupNum = 2019,
                    contentsNumber = 0,
                    lineupIndex = 0,
                    title, sub, date, price, img;





                $lineupSerch.keyup(lineupSerch) //제품 검색
                $sortButton.click(sortToggle) //리스트 정렬
                $button.click(moreContents); //제품 더보기
                $button.click(); //최근 년도 추가





                function sortToggle(e) {
                    var $target = $(e.target);

                    $(".contents__button").toggleClass("active");

                    if ($target.hasClass("contents__button_list")) {
                        $sortSeleced.text($target.text())

                        if ($target.text() == "최신순") {
                            $lineupList.removeClass("active");
                        } else {
                            $lineupList.addClass("active");
                        }
                    };
                }

                function lineupSerch() {
                    var text = $(this).val();
                    $(".content__list figure").hide();

                    var $result = $(".content__title:contains(" + text + ")");
                    $result.parent().parent().show();
                }

                $.each(lineupData, function () { //제품의 갯수
                    contentsNumber += this.year.length;
                })
                $contentsNumber.text(contentsNumber);

                function moreContents() { //년도별 더보기
                    if (lineupNum >= 2017) {
                        lineupListAppend =
                            `<div class="content_${lineupNum} content">
                            <h2>${lineupNum}</h2>
                            <div class="content_${lineupNum}__list content__list"></div>
                        </div>`

                        $lineupList.append(lineupListAppend);

                        linupYear();

                        if (lineupNum == 2016) {
                            $button.hide();
                        }
                    }
                }

                function linupYear() { //년도별 컨텐츠 더보기
                    lineupAppend = "";

                    $.each(lineupData[lineupIndex].year, function () {  //lineup 2019 Html 추가
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
                    $lineupList.find(`.content_${lineupNum}__list`).append(lineupAppend);

                    lineupNum--;
                    lineupIndex++;
                }

                //End
            }
        }, 100)
    });
});