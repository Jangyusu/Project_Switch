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
                    `<div class="contents__individual">
                        <div class="contents__line">
                            <span class="contents__red_line"></span>
                            <span class="contents__gray_line"></span>
                        </div>
                        <h2 class="contents__title">${title}</h2>
                        <figure class="contents__details">
                            <div class="contents__imgs">
                                <div class="contents__first_img">
                                    <div class="contents__first_img_box">
                                        <img src="${firstImg}" alt="Nintendo Switch">
                                    </div>
                                    <div class="contents__img_zoom">
                                        <img src="img/peripherals/img_zoom.png" alt="Magnifying Glass">
                                        <small>이미지에 마우스를 올려보세요</small>
                                    </div>
                                </div>
                                <div class="contents__second_img">
                                    <img src="${secondImg}" alt="Nintendo Switch">
                                </div>
                            </div>
                            <figcaption>
                                <div class="contents__text">
                                    <div class="contents__price">
                                        <span>가격</span>
                                        <span>${price}</span>
                                    </div>
                                    <div class="contents__enclosed">
                                        <span>동봉품</span>
                                        <span>${enclosed}</span>
                                    </div>
                                    <div class="contents__date">
                                        <span>발매일</span>
                                        <span>${date}</span>
                                    </div>
                                </div>
                                <p class="contents__explanation">${explanation}</p>
                            </figcaption>
                        </figure>
                    </div>`
            }
            $contents.append(peripheralsAppend);










            var $imgBox = $(".contents__first_img_box"),
                $scrollBar = $(".scroll_bar");

            console.log($scrollBar);





            $imgBox.mouseenter(imgZoomIn); //이미지 확대 이벤트
            $imgBox.mouseleave(imgZoomOut);
            $imgBox.mousemove(imgZoomMove);
            $(window).scroll(scrollSlide);





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

            function scrollSlide() {
                $scrollBar.css({
                    "top": `${($(this).scrollTop() / $(document).height()) * 100}%`
                })
            }

            //End
        }
    });
});