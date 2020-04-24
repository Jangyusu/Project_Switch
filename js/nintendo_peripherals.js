$(function () {
    $.ajax({
        url: 'data/nintendo_peripherals.json',
        dataType: 'json',
        type: 'get',
        success: function (data) {
            //start

            var $contents = $(".contents"),
                peripheralsData = data.peripherals,
                peripheralsAppend = "";





            $.each(peripheralsData, addContent); //contens 추가





            function addContent() {
                var title = this.ko.title,
                    firstImg = this.ko.firstImg,
                    secondImg = this.ko.secondImg,
                    price = this.ko.price,
                    enclosed = this.ko.enclosed,
                    date = this.ko.date,
                    explanation = this.ko.explanation;

                peripheralsAppend +=
                    `<h2 class="contents__title">주변기기</h2>
                    <div class="contents__list">
                        <div class="contents__list_line">
                            <span class="contents__list_line_red"></span>
                            <span class="contents__list_line_gray"></span>
                        </div>
                        <h3 class="contents__list_title">${title}</h3>
                        <figure class="contents__box">
                            <div class="contents__imgs">
                                <div class="contents__imgs_first">
                                    <div class="contents__imgs_first_box">
                                        <img src="${firstImg}" alt="Nintendo Switch" class="contents__imgs_first_box_img">
                                    </div>
                                    <div class="contents__imgs_first_zoom">
                                        <img src="img/peripherals/img_zoom.png" alt="Magnifying Glass"
                                            class="contents__imgs_first_zoom_img">
                                        <small class="contents__imgs_first_zoom_text">이미지에 마우스를 올려보세요</small>
                                    </div>
                                </div>
                                <div class="contents__imgs_second">
                                    <img src="${secondImg}" alt="Nintendo Switch" class="contents__imgs_second_img">
                                </div>
                            </div>
                            <figcaption class="contents__text">
                                <div class="contents__text_main">
                                    <div class="contents__text_main_box">
                                        <span class="contents__text_main_title">가격</span>
                                        <span class="contents__text_main_sub">${price}</span>
                                    </div>
                                    <div class="contents__text_main_box">
                                        <span class="contents__text_main_title">동봉품</span>
                                        <span class="contents__text_main_sub">${enclosed}</span>
                                    </div>
                                    <div class="contents__text_main_box">
                                        <span class="contents__text_main_title">발매일</span>
                                        <span class="contents__text_main_sub">${date}</span>
                                    </div>
                                </div>
                                <p class="contents__text_sub">${explanation}</p>
                            </figcaption>
                        </figure>
                    </div>`
            }
            $contents.append(peripheralsAppend);





            var $imgBox = $(".contents__imgs_first_box");





            $imgBox.mouseenter(imgZoomIn); //이미지 확대 이벤트
            $imgBox.mouseleave(imgZoomOut);
            $imgBox.mousemove(imgZoomMove);





            function imgZoomIn() {
                $(this).children("img").css({
                    "transform": "scale(2)"
                })
            }

            function imgZoomOut() {
                $(this).children("img").css({
                    "transform": "scale(1)"
                })
            }

            function imgZoomMove(e) {
                $(this).children("img").css({
                    'transform-origin': ((e.pageX - $(this).offset().left) / $(this).width()) * 100 + '% ' + ((e.pageY - $(this).offset().top) / $(this).height()) * 100 + '%'
                });
            }

            //End
        }
    });
});