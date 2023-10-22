const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZWJhNmY1N2IzMWMwMTk2MWYwMGIyNGVmNjdlOGIxMiIsInN1YiI6IjY1MmYzODI5YTgwMjM2MDExYWM3ZDM0NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.S_IH4hCaPhMg2I4g_mIf1KOXTmR3ufRxIsC5bumI-rk'
  }
};

fetch('https://api.themoviedb.org/3/movie/top_rated?language=ko-KR&page=1', options)
  .then(response => response.json())
  .then(data => {
    const movieContainer = document.getElementById("movie-container");
    console.log(data);
    data.results.forEach(movie => {

      // card 요소를 생성하고 클래스를 추가
      const card = document.createElement("div");
      card.classList.add("card");

      // cardContent 요소를 생성하고 클래스를 추가
      const cardContent = document.createElement("div");
      cardContent.classList.add("content");

      // 이미지를 생성 및 스타일 설정
      const image = document.createElement("img");
      image.src = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
      image.style.width = "100%"; // 이미지의 가로 크기를 카드 박스에 맞춤, 일치시킨다
      image.style.height = "100%"; // 이미지의 세로 크기를 카드 박스에 맞춤, 일치시킨다

      // 영화 제목 생성 및 스타일 설정
      const title = document.createElement("p");
      title.textContent = movie.title;
      title.style.fontSize = "28px";
      title.style.margin = '8%';
      title.style.border = "1px solid #000";
      title.classList.add("title");

      // 영화 설명 생성 및 스타일 설정
      const description = document.createElement("p");
      description.textContent = movie.overview;
      description.style.margin = '8%';
      description.style.fontSize = "22px";
      description.style.border = "1px solid #000";
      description.classList.add("description");

      // 별점 생성 및 스타일 설정
      const rating = document.createElement("p");
      rating.classList.add("rating");

      // rating(별점)을 ⭐ 로 바꿔줌
      const star = document.createElement("span");
      star.textContent = '⭐ ';
      star.style.textShadow = "none"; // '⭐'에는 text-shadow를 적용하지 않음

      // 별점 값 요소 생성 및 스타일 설정
      const ratingValue = document.createElement("span");
      ratingValue.textContent = `${movie.vote_average}`;
      ratingValue.style.textShadow = "-2px 0px rgb(0, 0, 0), 0px 2px rgb(0, 0, 0), 2px 0px rgb(0, 0, 0), 0px -2px rgb(0, 0, 0)"; // 숫자에만 text-shadow 적용

      // 별평을 별점 아래에 추가
      rating.appendChild(star);
      rating.appendChild(ratingValue);

      // cardContent에 이미지, 제목, 설명, 별점을 추가합니다
      cardContent.appendChild(image);
      cardContent.appendChild(title);
      cardContent.appendChild(description);
      cardContent.appendChild(rating); // 별점 추가
      card.appendChild(cardContent);

      // backContent 요소를 생성하고 클래스를 추가합니다.
      const backContent = document.createElement("div");
      backContent.classList.add("content", "back-content");

      // "영화 ID 확인" 버튼을 생성합니다.
      const button = document.createElement("button");
      button.textContent = "영화 ID 확인";

      const buttonWrapper = document.createElement("div");
      buttonWrapper.style.display = "flex";
      buttonWrapper.style.justifyContent = "flex-end";
      buttonWrapper.style.alignItems = "flex-end";
      buttonWrapper.style.height = "100%"; // 버튼Wrapper의 높이를 100%로 설정

      buttonWrapper.appendChild(button); // 버튼을 버튼Wrapper에 추가

      backContent.appendChild(buttonWrapper); // 버튼Wrapper를 후면 컨텐츠에 추가

      card.appendChild(backContent);

      movieContainer.appendChild(card);

      let isFlipped = false; // 카드가 뒤집혔는지 여부를 추적

      card.addEventListener("click", function () {
        card.classList.toggle("flipped");
        const ratingElement = card.querySelector(".rating");

        const movieId = movie.id;

        if (!isFlipped) { // 카드 앞면 (뒤집히지 않은 상태)
          card.style.opacity = 0.5; // 뒤집히지 않은 상태에서만 반투명 효과 적용
          rating.style.display = "none"; // 뒤집히지 않은 상태에서 별점 숨김
        } else { // 카드 뒷면 (뒤집힌 상태)
          card.style.opacity = 1; // 뒤집혔을 때 반투명 효과 제거
          rating.style.display = "block"; // 뒤집혔을 때 별점 표시
        }
      });

      button.addEventListener("click", function (event) {
        event.stopPropagation(); // 부모 카드의 click 이벤트가 전파되지 않도록 하기
        alert("영화 ID: " + movie.id);
      });

      card.addEventListener("mouseenter", function () {
        if (!isFlipped) {
          card.style.opacity = 0.5; // 뒤집히지 않은 상태에서만 반투명 효과 적용
          if (!card.classList.contains("flipped")) {
            rating.style.display = "block"; // 뒤집히지 않은 상태에서 별점 표시
          }
        }
      });

      card.addEventListener("mouseleave", function () {
        if (!isFlipped || card.classList.contains("flipped")) {
          card.style.opacity = 1; // 뒤집히지 않은 상태 또는 뒤집힌 상태에서 반투명 효과 제거
          if (!card.classList.contains("flipped")) {
            rating.style.display = "none"; // 뒤집히지 않은 상태에서만 별점 숨김
          }
        }
      });

    });
  })
  .catch(err => console.error(err));