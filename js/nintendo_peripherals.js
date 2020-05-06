$(function () { //문서 로드 후 실행
    $.ajax({
        url: 'data/nintendo_peripherals.json',
        dataType: 'json',
        type: 'get',
        success: function (data) { //josn파일 로드 성공 후 실행
            //start

            var $contents = $(".contents"),
                peripheralsData = data.peripherals,
                peripheralsAppend = "";



            $.each(peripheralsData, addContent); //contens 추가



            function addContent() { //contens 추가
                var title = this.ko.title,
                    firstImg = this.ko.firstImg,
                    secondImg = this.ko.secondImg,
                    price = this.ko.price,
                    enclosed = this.ko.enclosed,
                    date = this.ko.date,
                    explanation = this.ko.explanation;

                peripheralsAppend +=
                    `<h2 class="contents__title">주변기기</h2>
                    <div class="contents__list slide-up">
                        <div class="contents__list_line">
                            <span class="contents__list_line_red"></span>
                            <span class="contents__list_line_gray"></span>
                        </div>
                        <h3 class="contents__list_title ">${title}</h3>
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
            addActive($(".contents__list").eq(0));



            var $imgBox = $(".contents__imgs_first_box"),
                $slideContents = $(".slide-up"),
                $windowTop = $(window).height(),
                $scrollTop,
                $pageTopBtn = $(".page-top");



            $(window).scroll(scrollEvent); //scroll 이벤트
            $imgBox.hover(imgZoomIn, imgZoomOut); //이미지 확대/축소
            $imgBox.mousemove(imgZoomMove); //이미지 확대 후 이미지
            $pageTopBtn.click(pageTop); //최상단으로 이동



            function pageTop() { //최상단으로 이동
                $(window).scrollTop(0);
            }

            function scrollEvent() { //scroll 이벤트
                $scrollTop = $(this).scrollTop();
                $scrollBottom = $windowTop + $scrollTop;

                $slideContents.each(elementsSlide);

                if ($scrollTop > $windowTop) {
                    addActive($pageTopBtn);
                } else {
                    removeActive($pageTopBtn);
                }
            }

            function elementsSlide() { //각 요소 슬라이드 업
                $slideTop = $(this).offset().top;

                if ($scrollBottom > $slideTop) {
                    addActive($(this));
                } else {
                    removeActive($(this))
                }
            }

            function imgZoomIn() { //이미지 확대
                $(this).children("img").css({
                    "transform": "scale(2)"
                })
            }

            function imgZoomOut() { //이미지 축소
                $(this).children("img").css({
                    "transform": "scale(1)"
                })
            }

            function imgZoomMove(e) { //이미지 확대 후 이미지
                $(this).children("img").css({
                    'transform-origin': ((e.pageX - $(this).offset().left) / $(this).width()) * 100 + '% ' + ((e.pageY - $(this).offset().top) / $(this).height()) * 100 + '%'
                });
            }

            //End
        }
    });
});