$(function () {
    $("loading").load("common/loading.html");

    setTimeout(function () {
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

                    $visual = $(".visual figure"),
                    visualAppend = "",

                    $howToPlay = $(".how_to_play ul"),
                    howToPlayAppend = "",

                    $aboutSwitch = $(".about_switch__box"),
                    aboutSwitchAppend = "",

                    $software = $(".software__box"),
                    $softwareList, $softwareImg, softwareImg,
                    softwareAppend = "",
                    softwareIndex = 0,

                    $news = $(".news__box"),
                    $newsList, $newsImg, newsImg, newsTitle,
                    newsAppend = "",
                    newsIndex = 0;





                $.each(softwareData, function () { //visual html 추가
                    title = this.ko.title,
                        device = this.ko.device,
                        link = this.ko.link;

                    visualAppend +=
                        `<figcaption class="visual__text">
                            <small class="visual__device">${device}</small>
                            <strong class="visual__title">${title}</strong>
                            <a href="${link}" class="more">
                                <span></span>
                                <p>더보기</p>
                            </a>
                        </figcaption>`
                });
                $visual.append(visualAppend);
                $visual.find("figcaption").eq(0).addClass("active");

                $.each(howToPlayData, function () {  //how to play Html 추가
                    img = this.ko.img,
                        alt = this.ko.alt,
                        mode = this.ko.mode,
                        manual = this.ko.manual;

                    howToPlayAppend +=
                        `<li>
                            <img src="${img}" alt="${alt}" class="how_to_play__mode__img">
                            <p class=" how_to_play__mode">${mode}</p>
                            <p class="how_to_play__manual">${manual}</p>
                        </li>`
                });
                $howToPlay.append(howToPlayAppend);

                $.each(aboutSwitchData, function () {  //about switch Html 추가
                    number = this.ko.number,
                        name = this.ko.name,
                        subName = this.ko.subName;

                    aboutSwitchAppend +=
                        `<li class="about_switch__content">
                            <small>${number}</small>
                            <strong>${subName}</strong>
                            <p>${name}</p>
                            <a href="#" class="more_long">
                                <span></span>
                                <p>더보기</p>
                            </a>
                        </li>`
                });
                $aboutSwitch.append(aboutSwitchAppend);
                $aboutSwitch.find(".about_switch__content").eq(0).addClass("active");

                $.each(softwareData, function () { //software html 추가
                    title = this.ko.title,
                        device = this.ko.device,
                        genre = this.ko.genre,
                        link = this.ko.link;

                    softwareAppend +=
                        `<figure class="software__list slide_up">
                            <a href="${link}">
                                <img src="img/plus.png" alt="plus" class="plus">
                            </a>
                            <figcaption>
                                <small class="software__device">${device} : ${genre}</small>
                                <p class="software__title">${title}</p>
                            </figcaption>
                        </figure>`;
                });
                $software.append(softwareAppend);
                $softwareList = $(".software__list");

                $.each($softwareList, function () { //software img 추가
                    $softwareImg = $(this).find("a");
                    softwareIndex = $(this).index() - 1;

                    softwareImg = softwareData[softwareIndex].ko.img;
                    $softwareImg.css({ "background": "url(" + softwareImg + ")", "background-repeat": "no-repeat", "background-position": "center", "background-size": "cover" });
                });

                $.each(newsData, function () { //news html 추가
                    kind = this.ko.kind,
                        newsTitle = this.ko.title,
                        date = this.ko.date;

                    newsAppend +=
                        `<li class="news__list">
                            <a href="#">
                                <img src="img/plus.png" alt="plus" class="plus">
                            </a>
                            <small class="news__kind">${kind}</small>
                            <p class="news__title">${newsTitle}</p>
                            <time class="news__date">${date}</time>
                        </li>`;
                });

                $news.append(newsAppend);
                $newsList = $(".news__list");

                $.each($newsList, function () { //news img 추가
                    $newsImg = $(this).find("a");
                    newsIndex = $(this).index();
                    newsImg = newsData[newsIndex].ko.img;

                    $newsImg.css({ "background": "url(" + newsImg + ")", "background-repeat": "no-repeat", "background-position": "center", "background-size": "cover" });
                });










                var $visualCurrent = $(".visual__current"),
                    $visualList = $(".visual__text"),
                    $visualTotal = $(".visual__total"),
                    $visualControl = $(".visual__controls"),
                    $visualLeft = $(".visual__controls input")[0],
                    $visualPlayPause = $(".visual__controls input")[1],
                    $visualRight = $(".visual__controls input")[2],
                    visualIndex = 0,
                    visualSlide,
                    visualBln = true,

                    $aboutSwitchList = $(".about_switch__content"),
                    aboutSwitchIndex = 0,

                    $slideContents = $(".slide_up"),
                    $windowTop = $(window).height(),
                    $scrollTop = 0,
                    $scrollBottom = 0,
                    $slideTop = 0;





                $(window).scroll(scrollEvent); //scroll 이벤트
                $visualTotal.text("0" + softwareData.length); //visual 총 갯수
                $visualControl.click(visualControl); //visual 컨트롤
                $aboutSwitchList.hover(aboutSwitchenter, aboutSwitchleave) //aboutSwitch 마우스 엔터/리브





                function scrollEvent() {
                    $scrollTop = $(this).scrollTop();
                    $scrollBottom = $windowTop + $scrollTop;

                    $slideContents.each(elementsSlide);
                }

                function elementsSlide() {
                    $slideTop = $(this).offset().top;

                    if ($scrollBottom - 200 > $slideTop) {
                        $(this).addClass("active");
                    } else {
                        $(this).removeClass("active");
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
                        } else if (target == $visualPlayPause) { //재생, 멈춤 버튼
                            if (target.src.includes("play")) { //재생
                                target.src = "img/pause.png";
                                visualSlide();
                            } else { //일시정지
                                target.src = "img/play.png";
                                clearInterval(visualSlideInter);
                            };
                        };

                        function change() {
                            $visualList.removeClass("active");
                            $visual.css({ "background": "url(img/visual0" + visualIndex + ".jpg)", "background-repeat": "no-repeat", "background-position": "top right", "background-size": "cover" });
                            setTimeout(function () {
                                $visualList.eq(visualIndex).addClass("active");
                            }, 500);

                            $visualCurrent.text("0" + (visualIndex + 1)); //visual 현재 페이지
                        }

                        setTimeout(function () {
                            visualBln = true;
                        }, 1500);
                    }
                }

                function visualSlide() { //visual slide
                    visualSlideInter = setInterval(function () { //visual 슬라이드
                        $visualRight.click();
                    }, 5000);
                }
                visualSlide();

                function aboutSwitchenter() {
                    aboutSwitchIndex = $(this).index();
                    $aboutSwitch.css({ "background": "url(img/ABOUT_SWITCH0" + aboutSwitchIndex + ".jpg)", "background-repeat": "no-repeat", "background-position": "center", "background-size": "cover" });

                    $aboutSwitchList.removeClass("active");
                    $(this).addClass("active");
                }

                function aboutSwitchleave() {
                    $aboutSwitch.css({ "background": "url(img/ABOUT_SWITCH00.jpg)", "background-repeat": "no-repeat", "background-position": "center", "background-size": "cover" });

                    $aboutSwitchList.removeClass("active");
                    $aboutSwitchList.eq(0).addClass("active");
                }

                //End
            }
        }, 100)
    });
});