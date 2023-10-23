const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZWJhNmY1N2IzMWMwMTk2MWYwMGIyNGVmNjdlOGIxMiIsInN1YiI6IjY1MmYzODI5YTgwMjM2MDExYWM3ZDM0NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.S_IH4hCaPhMg2I4g_mIf1KOXTmR3ufRxIsC5bumI-rk'
  }
};

function hideMovieIDButton(card) {
  const button = card.querySelector("button");
  if (button) {
    button.style.display = "none";
  }
}

// '영화 ID 확인' 버튼을 보이는 함수
function showMovieIDButton(card) {
  const button = card.querySelector("button");
  if (button) {
    button.style.display = "block";
  }
}

let cardmap = new Map();
const movieContainer = document.getElementById("movie-container");

fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-us&page=1', options)
  .then(response => response.json())
  .then(data => {
    
    console.log(data);
    data.results.forEach(data => {
        creatcard(data)
    });

    console.log(cardmap) ;

    // data.results.forEach(movie => {
    //   // card 요소를 생성하고 클래스를 추가
    //   const card = document.createElement("div");
    //   card.classList.add("card");
    //   card.id = "postingcard";

    //   // cardContent 요소를 생성하고 클래스를 추가
    //   const cardContent = document.createElement("div");
    //   cardContent.classList.add("content");

    //   // 이미지를 생성 및 스타일 설정
    //   const image = document.createElement("img");
    //   image.src = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
    //   image.style.width = "100%"; // 이미지의 가로 크기를 카드 박스에 맞춤, 일치시킨다
    //   image.style.height = "100%"; // 이미지의 세로 크기를 카드 박스에 맞춤, 일치시킨다

    //   // 영화 제목 생성 및 스타일 설정
    //   const title = document.createElement("p");
    //   title.textContent = movie.title;
    //   title.style.fontSize = "28px";
    //   title.style.margin = '8%';
    //   title.style.border = "1px solid #000";
    //   title.classList.add("title");

    //   // 영화 설명 생성 및 스타일 설정
    //   const description = document.createElement("p");
    //   description.textContent = movie.overview;
    //   description.style.margin = '8% 8% 2% 8%';
    //   description.style.fontSize = "22px";
    //   description.style.border = "1px solid #000";
    //   description.classList.add("description");

    //   // 별점 생성 및 스타일 설정
    //   const rating = document.createElement("p");
    //   rating.classList.add("rating");

    //   // rating(별점)을 ⭐ 로 바꿔줌
    //   const star = document.createElement("span");
    //   star.textContent = '⭐ ';
    //   star.style.textShadow = "-1.5px 0px rgb(0, 0, 0), 0px 1.5px rgb(0, 0, 0), 1.5px 0px rgb(0, 0, 0), 0px -1.5px rgb(0, 0, 0)";

    //   // 별점 값 요소 생성 및 스타일 설정
    //   const ratingValue = document.createElement("span");
    //   ratingValue.textContent = `${movie.vote_average}`;
    //   ratingValue.style.textShadow = "-3px 0px rgb(0, 0, 0), 0px 3px rgb(0, 0, 0), 3px 0px rgb(0, 0, 0), 0px -3px rgb(0, 0, 0)";

    //   // 별평을 별점 아래에 추가
    //   rating.appendChild(star);
    //   rating.appendChild(ratingValue);

    //   // cardContent에 이미지, 제목, 설명, 별점을 추가합니다
    //   cardContent.appendChild(image);
    //   cardContent.appendChild(title);
    //   cardContent.appendChild(description);
    //   cardContent.appendChild(rating); // 별점 추가
    //   card.appendChild(cardContent);

    //   // 카드에 "영화 ID 확인" 버튼을 추가
    //   const button = document.createElement("button");
    //   button.textContent = "영화 ID 확인";
    //   button.style.margin = 'auto';
    //   button.style.width = '84%';
    //   cardContent.appendChild(button);

    //   hideMovieIDButton(card); // '영화 ID 확인' 버튼은 처음에는 숨겨둠

    //   movieContainer.appendChild(card);

    //   let isFlipped = false; // 카드가 뒤집혔는지 여부를 추적

    //   card.addEventListener("click", function () {
    //     card.classList.toggle("flipped");
    //     const ratingElement = card.querySelector(".rating");

    //     const movieId = movie.id;

    //     if (card.classList.contains("flipped")) { // 카드 뒷면 (뒤집힌 상태)
    //       image.style.opacity = 1; // 뒤집혔을 때 반투명 효과 제거
    //       rating.style.display = "none"; // 뒤집혔을 때 별점 표시
    //       showMovieIDButton(card); // '영화 ID 확인' 버튼 보이기
    //     } else { // 카드 앞면 (뒤집히지 않은 상태)
    //       image.style.opacity = 0.5; // 뒤집히지 않은 상태에서만 반투명 효과 적용
    //       hideMovieIDButton(card); // '영화 ID 확인' 버튼 숨기기
    //     }
    //   });

    //   button.addEventListener("click", function (event) {
    //     event.stopPropagation(); // 부모 카드의 click 이벤트가 전파되지 않도록 하기
    //     alert("영화 ID: " + movie.id);
    //   });

    //   card.addEventListener("mouseenter", function () {
    //     if (!isFlipped) {
    //       image.style.opacity = 0.5; // 뒤집히지 않은 상태에서만 반투명 효과 적용
    //       if (!card.classList.contains("flipped")) {
    //         rating.style.display = "block"; // 뒤집히지 않은 상태에서 별점 표시
    //       }
    //     }
    //   });

    //   card.addEventListener("mouseleave", function () {
    //     if (!isFlipped || card.classList.contains("flipped")) {
    //       image.style.opacity = 1; // 뒤집히지 않은 상태 또는 뒤집힌 상태에서 반투명 효과 제거
    //       if (!card.classList.contains("flipped")) {
    //         rating.style.display = "none"; // 뒤집히지 않은 상태에서만 별점 숨김
    //       }
    //     }
    //   });
    // });
  })
  .catch(err => console.error(err));

  

  let creatcard = (movie) => {
      // card 요소를 생성하고 클래스를 추가
      const card = document.createElement("div");
      card.classList.add("card");
      card.id = "postingcard";

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
      description.style.margin = '8% 8% 2% 8%';
      description.style.fontSize = "22px";
      description.style.border = "1px solid #000";
      description.classList.add("description");

      // 별점 생성 및 스타일 설정
      const rating = document.createElement("p");
      rating.classList.add("rating");

      // rating(별점)을 ⭐ 로 바꿔줌
      const star = document.createElement("span");
      star.textContent = '⭐ ';
      star.style.textShadow = "-1.5px 0px rgb(0, 0, 0), 0px 1.5px rgb(0, 0, 0), 1.5px 0px rgb(0, 0, 0), 0px -1.5px rgb(0, 0, 0)";

      // 별점 값 요소 생성 및 스타일 설정
      const ratingValue = document.createElement("span");
      ratingValue.textContent = `${movie.vote_average}`;
      ratingValue.style.textShadow = "-3px 0px rgb(0, 0, 0), 0px 3px rgb(0, 0, 0), 3px 0px rgb(0, 0, 0), 0px -3px rgb(0, 0, 0)";

      // 별평을 별점 아래에 추가
      rating.appendChild(star);
      rating.appendChild(ratingValue);

      // cardContent에 이미지, 제목, 설명, 별점을 추가합니다
      cardContent.appendChild(image);
      cardContent.appendChild(title);
      cardContent.appendChild(description);
      cardContent.appendChild(rating); // 별점 추가
      card.appendChild(cardContent);

      // 카드에 "영화 ID 확인" 버튼을 추가
      const button = document.createElement("button");
      button.textContent = "영화 ID 확인";
      button.style.margin = 'auto';
      button.style.width = '84%';
      cardContent.appendChild(button);

      hideMovieIDButton(card); // '영화 ID 확인' 버튼은 처음에는 숨겨둠

      movieContainer.appendChild(card);

      let isFlipped = false; // 카드가 뒤집혔는지 여부를 추적

      card.addEventListener("click", function () {
        card.classList.toggle("flipped");
        const ratingElement = card.querySelector(".rating");

        const movieId = movie.id;

        if (card.classList.contains("flipped")) { // 카드 뒷면 (뒤집힌 상태)
          image.style.opacity = 1; // 뒤집혔을 때 반투명 효과 제거
          rating.style.display = "none"; // 뒤집혔을 때 별점 표시
          showMovieIDButton(card); // '영화 ID 확인' 버튼 보이기
        } else { // 카드 앞면 (뒤집히지 않은 상태)
          image.style.opacity = 0.5; // 뒤집히지 않은 상태에서만 반투명 효과 적용
          hideMovieIDButton(card); // '영화 ID 확인' 버튼 숨기기
        }
      });

      button.addEventListener("click", function (event) {
        event.stopPropagation(); // 부모 카드의 click 이벤트가 전파되지 않도록 하기
        alert("영화 ID: " + movie.id);
      });

      card.addEventListener("mouseenter", function () {
        if (!isFlipped) {
          image.style.opacity = 0.5; // 뒤집히지 않은 상태에서만 반투명 효과 적용
          if (!card.classList.contains("flipped")) {
            rating.style.display = "block"; // 뒤집히지 않은 상태에서 별점 표시
          }
        }
      });

      card.addEventListener("mouseleave", function () {
        if (!isFlipped || card.classList.contains("flipped")) {
          image.style.opacity = 1; // 뒤집히지 않은 상태 또는 뒤집힌 상태에서 반투명 효과 제거
          if (!card.classList.contains("flipped")) {
            rating.style.display = "none"; // 뒤집히지 않은 상태에서만 별점 숨김
          }
        }
      });

      cardmap.set(movie.title, card);
  }

  const searchINPUT = document.getElementById('searchinput');
  const searchBTN = document.getElementById('searchbtn');

  function moviesearch() {
    let inputvalue = searchINPUT.value;

    for(const title of cardmap.keys()) {
      let upperinputvalue = inputvalue.toUpperCase();
      let uppertitle = title.toUpperCase();
      if (uppertitle.includes(upperinputvalue)) {
        cardmap.get(title).style.display = 'block';
      } else {
        cardmap.get(title).style.display = 'none';
      }
    }

    
  };

  searchBTN.addEventListener('click',()=>{moviesearch();});

  searchINPUT.addEventListener('keyup',(event)=>{
      if (event.key === 'Enter') {
        moviesearch();
      }
  });

  searchINPUT.focus