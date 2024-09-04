const matches = [
  {
    status: "Live",
    tournament: "Pickleball An Sinh Sport",
    tournamentLogo: "https://assets.codepen.io/285131/pl-logo.svg",
    homeTeam: {
      name: "West Ham",
      logo: "https://assets.codepen.io/285131/whufc.svg",
    },
    awayTeam: {
      name: "Chelsea",
      logo: "https://assets.codepen.io/285131/chelsea.svg",
    },
    date: "12 Aug",
    time: "19:00",
    score: { home: 2, away: 0 },
    timeLapsed: "72'",
    referee: "Joseph Hicks",
  },
  {
    status: "Live",
    tournament: "Pickleball An Sinh Sport",
    tournamentLogo: "https://assets.codepen.io/285131/pl-logo.svg",
    homeTeam: {
      name: "thanh",
      logo: "https://www.didongmy.com/vnt_upload/news/05_2024/anh-27-meme-dang-yeu-didongmy.jpg",
    },
    awayTeam: {
      name: "Sơn",
      logo: "https://www.didongmy.com/vnt_upload/news/05_2024/anh-2-meme-dang-yeu-didongmy_1.jpg",
    },
    date: "12 Aug",
    time: "19:00",
    score: { home: 2, away: 0 },
    timeLapsed: "72'",
    referee: "thanh",
  },
  {
    status: "Live",
    tournament: "Pickleball An Sinh Sport",
    tournamentLogo: "https://assets.codepen.io/285131/pl-logo.svg",
    homeTeam: {
      name: "CN",
      logo: "https://assets.codepen.io/285131/whufc.svg",
    },
    awayTeam: {
      name: "VN",
      logo: "https://assets.codepen.io/285131/chelsea.svg",
    },
    date: "12 Aug",
    time: "19:00",
    score: { home: 2, away: 0 },
    timeLapsed: "72'",
    referee: "Sơn",
  },
];
//<button class="btn-icon"><i class="material-icons-outlined">grade</i></button>
//<button class="btn-icon"><i class="material-icons-outlined">add_alert</i></button>
// Function to create a match element
function createMatchElement(match) {
  return `
      <div class="match">
          <div class="match-header">
              <div class="match-status">${match.status}</div>
              <div class="match-tournament"><img src="${match.tournamentLogo}" />${match.tournament}</div>
              <div class="match-actions"></div>
          </div>
          <div class="match-content">
              <div class="column">
                  <div class="team team--home">
                      <div class="team-logo">
                          <img class="img__logo" src="${match.homeTeam.logo}" />
                      </div>
                      <h2 class="team-name">${match.homeTeam.name}</h2>
                  </div>
              </div>
              <div class="column">
                  <div class="match-details">
                      <div class="match-date">
                          ${match.date} at <strong>${match.time}</strong>
                      </div>
                      <div class="match-score">
                          <span class="match-score-number match-score-number--leading">${match.score.home}</span>
                          <span class="match-score-divider">:</span>
                          <span class="match-score-number">${match.score.away}</span>
                      </div>
                      <div class="match-time-lapsed">
                          ${match.timeLapsed}
                      </div>
                      <div class="match-referee">
                          Trọng tài: <strong>${match.referee}</strong>
                      </div>
                  </div>
              </div>
              <div class="column">
                  <div class="team team--away">
                      <div class="team-logo">
                          <img class="img__logo" src="${match.awayTeam.logo}" />
                      </div>
                      <h2 class="team-name">${match.awayTeam.name}</h2>
                  </div>
              </div>
          </div>
      </div>
    `;
}

function createMatchListElement(matches) {
  return `
  <div class="container__box">
  
  <div class="container__list">Danh sách thi đấu</div>
      <div class="match-list">
          ${matches
            .map(
              (match) => `
              <div class="match-list-item">
                  <div class="match-header">
                      <div class="match-status-list">${match.status}</div>
                      <div class="match-tournament"><img src="${match.tournamentLogo}" />${match.tournament}</div>
                  </div>
                  <div class="match__details-list">
                      <div class="team team--home">
                          <div class="team-logo"><img class="img__logo-list" src="${match.homeTeam.logo}" /></div>
                          <h2 class="team-name-list">${match.homeTeam.name}</h2>
                      </div>
                      <div class="match-score">
                          <span class="match-score-number match-score-number--leading">${match.score.home}</span>
                          <span class="match-score-divider">:</span>
                          <span class="match-score-number">${match.score.away}</span>
                      </div>
                      <div class="team team--away">
                          <div class="team-logo"><img class="img__logo-list" src="${match.awayTeam.logo}" /></div>
                          <h2 class="team-name-list">${match.awayTeam.name}</h2>
                      </div>
                  </div>
              </div>
          `
            )
            .join("")}
      </div>
      </div>
    `;
}

function startMatchCarousel(container, matchData, interval) {
  let currentIndex = 0;

  function showNextMatch() {
    if (currentIndex === matchData.length) {
      // Display the list of all matches
      container.innerHTML = createMatchListElement(matchData);
      currentIndex = 0; // Reset the index to start again
    } else {
      // Display the current match
      container.innerHTML = createMatchElement(matchData[currentIndex]);
      currentIndex++;
    }
  }

  showNextMatch(); // Show the first match immediately
  setInterval(showNextMatch, interval); // Continue showing the next matches
}

// Get the match container
const matchContainer = document.getElementById("match-container");

// Start the carousel with a 5-second interval
startMatchCarousel(matchContainer, matches, 100000);
