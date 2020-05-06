$(function () { //문서 로드 후 실행
    $.ajax({
        url: 'data/nintendo_news.json',
        dataType: 'json',
        type: 'get',
        success: function (data) { //josn파일 로드 성공 후 실행
            //start

            var newsData = data.news,
                indicatorTop = $(".visual__indicator").offset().top;



            $("header").hover(headerRemove, headerAdd); //헤더 엔터/리브
            $(window).scroll(scrollHeader); //스크롤 관련 이벤트

            $(".search__select").click(searchSelect); //검색 유형 on/off
            $(".search__select_list li").click(searchSelected); //검색 유형 선택
            $(".search__text_result").click(result); //검색 실행
            $(".search__text_typing").keydown(enterResult); //검색 키보드 실행
            $(".search__reset").click(reset); //검색 초기화

            $(".view").click(listAdd); //리스트 추가



            function scrollHeader() { //스크롤 관련 이벤트
                headerRemove();

                if ($(this).scrollTop() == 0) {
                    headerAdd();
                }

                if ($(this).scrollTop() >= indicatorTop) {
                    addActive($(".visual__indicator"));
                } else {
                    removeActive($(".visual__indicator"));
                }
            }

            function headerAdd() { //Header online Class 추가
                $("header").addClass("online");

                if (!$(window).scrollTop() == 0) {
                    headerRemove();
                }
            }
            headerAdd();

            function headerRemove() { //Header online Class 제거
                $("header").removeClass("online");
            }

            function searchSelect() { //검색 유형 on/off
                if ($(this).hasClass("active")) {
                    removeActive($(this));
                } else {
                    addActive($(this));
                }
            }

            function searchSelected(e) { //검색 유형 선택
                $(".search__select_selected").html($(e.target).html());
            }

            function result() { //검색 실행
                var text = $(".search__text_typing").val();
                $(".list__box").hide();

                var $result = $(".list__text_main:contains(" + text + ")");
                $result.parent().parent().show();

                if ($(".list").css("height").replace(/[^0-9]/g, "") <= 110) {
                    alert("검색결과가 없습니다.");
                    reset();
                }
            }

            function enterResult() { //검색 키보드 실행
                if (event.keyCode == 13) {
                    result();
                }
            }

            function reset() { //검색 초기화
                $(".list__box").show();
                $(".search__text_typing").val("");
            }

            var listAppend = "";
            $(".search__amount_number").html(newsData.length); //뉴스 총 갯수
            $(".view__max").html(newsData.length); //뉴스 총 갯수
            $(".view").click(); //로딩 시 뉴스 리스트 추가
            function listAdd() { //리스트 추가
                $(".list__box").show();

                for (var i = 0; i < 3; i++) {
                    if ($(".list__box").length < newsData.length) {
                        var listCount = $(".list__box").length,
                            kinds = newsData[listCount].kinds,
                            title = newsData[listCount].title,
                            first = newsData[listCount].first,
                            second = newsData[listCount].second,
                            date = newsData[listCount].date;

                        listAppend =
                            `<figure class="list__box">
                                <div class="list__img">
                                    <span class="list__img_kinds">${kinds}</span>
                                </div>
                                <figcaption class="list__text">
                                    <p class="list__text_main">${title}</p>
                                    <div class="list__text_sub">
                                        <small class="list__text_sub_first">${first}</small>
                                        <small class="list__text_sub_second">${second}</small>
                                    </div>
                                    <time class="list__text_date">${date}</time>
                                </figcaption>
                            </figure>`

                        $(".list").append(listAppend);
                        $(".view__amount").html($(".list__box").length);
                    }
                }
            }

            var mainAppend = "";
            function mainNews() { //메인 뉴스 추가
                var kinds = newsData[0].kinds,
                    title = newsData[0].title,
                    first = newsData[0].first,
                    second = newsData[0].second,
                    date = newsData[0].date;

                mainAppend =
                    `<figure class="content">
                        <div class="content__img"></div>
                        <figcaption class="content__text">
                            <span class="content__text_kinds">${kinds}</span>
                            <p class="content__text_main">${title}</p>
                            <div class="content__text_sub">
                                <small class="content__text_sub_first">${first}</small>
                                <small class="content__text_sub_second">${second}</small>
                            </div>
                            <time class="content__text_date">${date}</time>
                        </figcaption>
                    </figure>`
                $(".contents").append(mainAppend);

                $(".content__img").css({
                    background: `url("img/news/news0${0}.jpg") no-repeat center / cover`
                });
            }
            mainNews(); //메인 뉴스 추가

            //End
        }
    });
});