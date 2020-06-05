# 닌텐도 웹사이트 리뉴얼
> 기존 닌텐도 사이트의 레이아웃과 기능을 개선하여 새롭게 리뉴얼한 포트폴리오용 웹 사이트 제작

## 시작하며...
* 본 웹 사이트는 상업용 목적이 아닌 개인용 포트폴리오 목적으로 제작되었습니다.
* URL : https://jangyusu.github.io/Project_Switch

### 작업 기간
* 2020-04 ~ 2020-05 (약 3주)

### 참여도
* 100%

### 사용 기술
* html5
* css3
* Javascript
* jQuery
* SASS
* ajax
* json

### 호환 기종
* PC
* Tablet
* Mobile

### 웹 사이트 예시
![page_main](https://github.com/Jangyusu/Project_Switch/blob/master/readme/img/index_01.jpg)
![page_main](https://jangyusu.github.io/Project_Switch/blob/master/readme/img/lineup_01.jpg)
![page_main](https://jangyusu.github.io/Project_Switch/blob/master/readme/img/peripherals_01.jpg)
![page_main](https://jangyusu.github.io/Project_Switch/blob/master/readme/img/online_01.jpg)
![page_main](https://jangyusu.github.io/Project_Switch/blob/master/readme/img/software_01.jpg)
![page_main](https://jangyusu.github.io/Project_Switch/blob/master/readme/img/news_01.jpg)

## 상세 설명
### 주요 코드
#### 메인 페이지
```javascript
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
```

#### lineup 페이지
```javascript
function lineupSerch() { //제품 검색
    var text = $(this).val();
    $(".contents__list_box").hide();

    var $result = $(".contents__list_text_title:contains(" + text + ")");
    $result.parent().parent().show();
}
```

#### peripherals 페이지
```javascript
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
```

#### News 페이지
```javascript
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
```

#### peripherals 페이지

### 기능 구현
1. 메인페이지 이미지, 텍스트 슬라이드 기능 구현
2. 스크롤 시 헤더 슬라이드 및 높이에 따른 컨텐츠 슬라이드 기능 구현
3. 기본 스크롤을 없애고 직접 스크롤 제작
4. ajax를 통해 Json데이터를 이용하여 코드 간략화
5. 제품 리스트에 있는 목록을 찾을수 있는 검색시스템 기능 구현
6. 제품에 마우스를 올렸을 때 움직임에 따라 확대되는 기능 구현
7. 최상단으로 이동할 수 있는 버튼 구현
8. QnA 탭메뉴 구현
9. Software페이지를 flex-grow를 활용한 원페이지 레이아웃 구성

### 반응형 화면 해상도
* 1440 x 900
* 1024 x 768
* 768 x 1024
* 640 x 1136
* 425 x 736
* 375 x 812

### 버전 관리
* ver 1.0.0
  * 닌텐도 웹사이트 리뉴얼 오픈

### 정보
* 장유수
  * *Github* (https://github.com/Jangyusu)
  * *E-mail* (dbtnss@naver.com)

### 개선해야할 점
* 모든 브라우저에서도 정상적으로 동작할 수 있게 크로스 브라우징 구현
* 메인 페이지 로드 후 visualImg 움직임 개선
