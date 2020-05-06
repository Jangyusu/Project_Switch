$(function () { //문서 로드 후 실행
    $.ajax({
        url: 'data/nintendo_lineup.json',
        dataType: 'json',
        type: 'get',
        success: function (data) { //josn파일 로드 성공 후 실행
            //start

            var lineupData = data.lineup,
                $lineupList = $(".contents__year"),
                $lineupSerch = $(".contents__header_typing"),
                $button = $(".contents__more"),
                $contentsNumber = $(".contents__header_product_num"),
                $sortButton = $(".contents__button"),
                $sortSeleced = $(".contents__button_main_text"),
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



            function sortToggle(e) { //리스트 정렬
                var $target = $(e.target);

                toggleActive($(".contents__button"));

                if ($target.hasClass("contents__button_list_text")) {
                    $sortSeleced.text($target.text())

                    if ($target.text() == "최신순") {
                        removeActive($lineupList);
                    } else {
                        addActive($lineupList);
                    }
                };
            }

            function lineupSerch() { //제품 검색
                var text = $(this).val();
                $(".contents__list_box").hide();

                var $result = $(".contents__list_text_title:contains(" + text + ")");
                $result.parent().parent().show();
            }

            $.each(lineupData, function () { //제품의 갯수
                contentsNumber += this.year.length;
            })
            $contentsNumber.text(contentsNumber);

            function moreContents() { //제품 더보기
                if (lineupNum >= 2017) {
                    lineupListAppend =
                        `<div class="content_${lineupNum} contents__year_box">
                                <h2 class="contents__year_title">${lineupNum}</h2>
                                <div class="content_${lineupNum}__list contents__list"></div>
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
                        `<figure class="contents__list_box">
                                <img src="${img}" alt="Nintendo Switch" class="contents__list_img">
                                <figcaption class="contents__list_text">
                                    <small class="contents__list_text_sub">${sub}</small>
                                    <p class="contents__list_text_title">${title}</p>
                                    <dl class="contents__list_inf">
                                        <dt class="contents__list_inf_title">발매일</dt>
                                        <dd class="contents__list_inf_sub">${date}</dd>
                                        <dt class="contents__list_inf_title">희망소비자가격</dt>
                                        <dd class="contents__list_inf_sub">${price}</dd>
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