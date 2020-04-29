$(function () {
    $.ajax({
        url: 'data/data.json',
        dataType: 'json',
        type: 'get',
        success: function (data) {
            //start

            var softwareData = data.software,
                howToPlayData = data.howToPlay,
                aboutSwitchData = data.aboutSwitch,
                newsData = data.news,
                title, device, genre, link, img, alt, mode, manual, number, name, subName, kind, date,

                $visual = $(".visual__img"),
                visualAppend = "",

                $howToPlay = $(".how-to-play__list"),
                howToPlayAppend = "",

                $aboutSwitch = $(".about-switch__list"),
                aboutSwitchAppend = "",

                $software = $(".software__list"),
                $softwareList, $softwareImg, softwareImg,
                softwareAppend = "",
                softwareIndex = 0,

                $news = $(".news__list"),
                $newsList, $newsImg, newsImg, newsTitle,
                newsAppend = "",
                newsIndex = 0;





            $.each(softwareData, function () { //visual html 추가
                title = this.ko.title,
                    device = this.ko.device,
                    link = this.ko.link;

                visualAppend +=
                    `<figcaption class="visual__text">
                        <small class="visual__text_sub">${device}</small>
                        <strong class="visual__text_title">${title}</strong>
                        <a href="nintendo_software.html" target="_blank" class="more">
                            <span class="more__line"></span>
                            <p class="more__text">더보기</p>
                        </a>
                    </figcaption>`
            });
            $visual.append(visualAppend);
            addActive($visual.find(".visual__text").eq(0));

            $.each(howToPlayData, function () {  //how to play Html 추가
                img = this.ko.img,
                    alt = this.ko.alt,
                    mode = this.ko.mode,
                    manual = this.ko.manual;

                howToPlayAppend +=
                    `<li class="how-to-play__list_box">
                        <img src="${img}" alt="${alt}" class="how-to-play__list_img">
                        <p class="how-to-play__list_title">${mode}</p>
                        <p class="how-to-play__list_sub">${manual}</p>
                    </li>`
            });
            $howToPlay.append(howToPlayAppend);

            $.each(aboutSwitchData, function () {  //about switch Html 추가
                number = this.ko.number,
                    name = this.ko.name,
                    subName = this.ko.subName,
                    link = this.ko.link;

                aboutSwitchAppend +=
                    `<li class="about-switch__list_box">
                        <small class="about-switch__list_num">${number}</small>
                        <strong class="about-switch__list_title">${subName}</strong>
                        <p class="about-switch__list_sub">${name}</p>
                        <a href="${link}" target="_blank" class="more-long">
                            <span class="more-long__line"></span>
                            <p class="more-long__text">더보기</p>
                        </a>
                    </li>`
            });
            $aboutSwitch.append(aboutSwitchAppend);
            addActive($aboutSwitch.find(".about-switch__list_box").eq(0))

            $.each(softwareData, function () { //software html 추가
                title = this.ko.title,
                    device = this.ko.device,
                    genre = this.ko.genre;

                softwareAppend +=
                    `<figure class="software__list_box slide-up">
                        <a href="nintendo_software.html" target="_blank" class="software__list_img">
                            <img src="img/plus.png" alt="plus" class="plus">
                        </a>
                        <figcaption class="software__list_text">
                            <small class="software__list_sub">${device} : ${genre}</small>
                            <p class="software__list_title">${title}</p>
                        </figcaption>
                    </figure>`;
            });
            $software.append(softwareAppend);
            $softwareList = $(".software__list_box");

            $.each($softwareList, function () { //software img 추가
                $softwareImg = $(this).find("a");
                softwareIndex = $(this).index() - 1;

                softwareImg = softwareData[softwareIndex].ko.img;
                backgroundUrl($softwareImg, softwareImg);
            });

            $.each(newsData, function () { //news html 추가
                kind = this.ko.kind,
                    newsTitle = this.ko.title,
                    date = this.ko.date;

                newsAppend +=
                    `<li class="news__list_box">
                        <a href="nintendo_news.html" target="_blank" class="news__list_img">
                            <img src="img/plus.png" alt="plus" class="plus">
                        </a>
                        <small class="news__list_sub">${kind}</small>
                        <p class="news__list_title">${newsTitle}</p>
                        <time class="news__list_date">${date}</time>
                    </li>`;
            });
            $news.append(newsAppend);
            $newsList = $(".news__list_box");

            $.each($newsList, function () { //news img 추가
                $newsImg = $(this).find("a");
                newsIndex = $(this).index();
                newsImg = newsData[newsIndex].ko.img;

                backgroundUrl($newsImg, newsImg);
            });





            var $visualCurrent = $(".visual__controls_num_current"),
                $visualList = $(".visual__text"),
                $visualTotal = $(".visual__controls_num_total"),
                $visualControl = $(".visual__controls_button"),
                $visualLeft = $(".visual__controls_button_prev")[0],
                $visualPlayPause = $(".visual__controls_button_play")[0],
                $visualRight = $(".visual__controls_button_next")[0],
                visualIndex = 0,
                visualSlide,
                visualBln = true,

                $aboutSwitchList = $(".about-switch__list_box"),

                $slideContents = $(".slide-up"),
                $windowTop = $(window).height(),
                $scrollTop = 0,
                $scrollBottom = 0,
                $slideTop = 0;





            $(window).scroll(scrollEvent); //scroll 이벤트
            $visualTotal.text("0" + softwareData.length); //visual 총 갯수
            $visualControl.click(visualControl); //visual 컨트롤
            $(".visual").on("mousedown touchstart", visualStart); //visual 마우스, 터치시작
            $(".visual").on("mouseup touchend", visualEnd); //visual 마우스, 터치끝
            $(".visual__text a").mouseenter(clearSlide); //visual 더보기 마우스 오버시 슬라이드 멈춤
            $(".visual__text a").mouseleave(function () { //visual 더보기 마우스 리브시 슬라이드 재시작
                if ($(".visual__controls_button_play").attr("src") == "img/pause.png") {
                    visualSlide();
                }
            })

            $aboutSwitchList.hover(aboutSwitchenter, aboutSwitchleave) //aboutSwitch 마우스 엔터/리브





            function scrollEvent() {
                $scrollTop = $(this).scrollTop();
                $scrollBottom = $windowTop + $scrollTop;

                $slideContents.each(elementsSlide);
            }

            function elementsSlide() {
                $slideTop = $(this).offset().top;

                if ($scrollBottom - 200 > $slideTop) {
                    addActive($(this));
                } else {
                    removeActive($(this))
                }
            }

            var visualStartX, visualEndX, visualSlideX;
            function visualStart(e) { //visual 마우스, 터치시작
                visualStartX = e.originalEvent.screenX || e.originalEvent.changedTouches[0].screenX;
            }

            function visualEnd(e) { //visual 마우스, 터치끝
                visualEndX = e.originalEvent.screenX || e.originalEvent.changedTouches[0].screenX;

                visualSlideX = visualStartX - visualEndX;

                if (visualSlideX > 50) {
                    $(".visual__controls_button_next").click();
                } else if (visualSlideX < -50) {
                    $(".visual__controls_button_prev").click();
                }
            }

            function visualControl(e) {
                if (visualBln == true) {
                    visualBln = false;

                    var target = e.target;

                    if (target == $visualLeft) { //왼쪽 버튼
                        visualIndex--;

                        if (visualIndex == -1) {
                            visualIndex = softwareData.length - 1;
                        }

                        change();
                    } else if (target == $visualRight) { //오른쪽 버튼
                        visualIndex++;

                        if (visualIndex == softwareData.length) {
                            visualIndex = 0;
                        }

                        change();
                    } else if (target == $visualPlayPause) { //재생, 정지버튼
                        if (target.src.includes("play")) { //재생
                            target.src = "img/pause.png";
                            visualSlide();
                        } else { //일시정지
                            target.src = "img/play.png";
                            clearSlide();
                        };
                    };

                    function change() {
                        removeActive($visualList);
                        background($visual, "visual0", visualIndex);

                        setTimeout(function () {
                            addActive($visualList.eq(visualIndex));
                        }, 500);

                        $visualCurrent.text("0" + (visualIndex + 1)); //visual 현재 페이지
                    }

                    setTimeout(function () {
                        visualBln = true;
                    }, 1500);
                }
            }
            background($visual, "visual0", 0);

            function visualSlide() { //visual slide
                visualSlideInter = setInterval(function () { //visual 슬라이드
                    $visualRight.click();
                }, 5000);
            }
            visualSlide();

            function clearSlide() {
                clearInterval(visualSlideInter);
            }

            function aboutSwitchenter() {
                background($aboutSwitch, "ABOUT_SWITCH0", $(this).index());

                removeActive($aboutSwitchList);
                addActive($(this));
            }

            function aboutSwitchleave() {
                background($aboutSwitch, "ABOUT_SWITCH0", 0);

                removeActive($aboutSwitchList);
                addActive($aboutSwitchList.eq(0));
            }

            function background(target, link, Index) {
                target.css({
                    "background": "url(img/" + link + Index + ".jpg)", "background-repeat": "no-repeat", "background-position": "center", "background-size": "cover"
                });
            }

            function backgroundUrl(target, url) {
                target.css({
                    "background": "url(" + url + ")", "background-repeat": "no-repeat", "background-position": "center", "background-size": "cover"
                });
            }

            function loading() { //로딩 이미지 추가
                var loadingImg = "";
                for (var i = 0; i < 3; i++) {
                    loadingImg +=
                        `<img src="img/visual0${i}.jpg" alt="#">`
                };
                for (var i = 0; i < 4; i++) {
                    loadingImg +=
                        `<img src="img/ABOUT_SWITCH0${i}.jpg" alt="#">`
                };
                $(".loading").append(loadingImg);
            }
            loading();

            //End
        }
    }, 500);
});