var xhr = new XMLHttpRequest();

xhr.addEventListener("load", function () {

    responseObject = JSON.parse(xhr.responseText);
    var howToPlay = $(".how_to_play"),
        howToPlayKoCon = `<li>
                            <img src="img/HOW_TO_PLAY00_TV.jpg" alt="switch TV mode" class="how_to_play__mode__img">
                            <p class=" how_to_play__mode">TV 모드</p>
                            <p class="how_to_play__manual">TV로 다함께 즐기는 모드<br>모임이나 홈 파티에 적합</p>
                        </li>`;





    howToPlay.append(howToPlayKoCon);
});

xhr.open("GET", "json/data.json", true);
xhr.send(null);