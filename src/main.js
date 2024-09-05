// Function to fetch match data from the API
async function fetchMatchData(id) {
  try {
    const response = await fetch(
      `https://ligo3-dev4.ligo.vn/api/v1.0/PickleballMangement/GetAllMatchSchedule/${id}`
    );
    const data = await response.json();
    return data; // Assuming the API returns an array of matches
  } catch (error) {
    console.error("Error fetching match data:", error);
    return []; // Return an empty array in case of error
  }
}
function formatDateTime(matchDate) {
  const dateObj = new Date(matchDate);

  // Extract date in dd-MM-yyyy format
  const day = String(dateObj.getDate()).padStart(2, "0");
  const month = String(dateObj.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const year = dateObj.getFullYear();
  const formattedDate = `${day}-${month}-${year}`;

  // Extract time in HH:mm format
  const hours = String(dateObj.getHours()).padStart(2, "0");
  const minutes = String(dateObj.getMinutes()).padStart(2, "0");
  const formattedTime = `${hours}:${minutes}`;

  return { formattedDate, formattedTime };
}
// Function to create a match element (same as before)
function createMatchElement(match) {
  const { formattedDate, formattedTime } = formatDateTime(match.MatchDate);

  // Tính thời gian hiện tại và thời gian của match.MatchDate
  const currentTime = Date.now();
  const matchTime = new Date(match.MatchDate).getTime();

  // Tính thời gian đã trôi qua (ms -> seconds -> minutes -> hours)
  const timeLapsedMs = currentTime - matchTime;
  const timeLapsedMinutes = Math.floor(timeLapsedMs / (1000 * 60));
  const hours = Math.floor(timeLapsedMinutes / 60);
  const minutes = timeLapsedMinutes % 60;

  // Định dạng thời gian trôi qua thành "X giờ Y phút"
  const timeLapsed = `${hours} giờ ${minutes} phút`;

  // Kiểm tra và thay thế nếu FirstTeam hoặc SecondTeam không có dữ liệu
  const firstTeam = match.FirstTeam ? match.FirstTeam : "User 1";
  const secondTeam = match.SecondTeam ? match.SecondTeam : "User 2";
  const logoFirstTeam = match.LogoFirstTeam
    ? match.LogoFirstTeam
    : `./src/img/user.jpg`;
  const logoSecondTeam = match.LogoSecondTeam
    ? match.LogoSecondTeam
    : `./src/img/user.jpg`;
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
                          <img class="img__logo" src="${logoFirstTeam}" />
                      </div>
                      <h2 class="team-name">${firstTeam}</h2>
                  </div>
              </div>
              <div class="column">
                  <div class="match-details">
                      <div class="match-date">
                          ${formattedDate} at <strong>${formattedTime}</strong>
                      </div>
                      <div class="match-score">
                          <span class="match-score-number match-score-number--leading">${match.FirstTeamPoint}</span>
                          <span class="match-score-divider">:</span>
                          <span class="match-score-number">${match.SecondTeamPoint}</span>
                      </div>
                      <div class="match-time-lapsed">
                          ${timeLapsed}
                      </div>
                  </div>
              </div>
              <div class="column">
                  <div class="team team--away">
                      <div class="team-logo">
                          <img class="img__logo" src="${logoSecondTeam}" />
                      </div>
                      <h2 class="team-name">${secondTeam}</h2>
                      
                  </div>
              </div>
          </div>
      </div>
    `;
}

// Function to create a list of matches (same as before)
function createMatchListElement(matches) {
  // Kiểm tra và thay thế nếu FirstTeam hoặc SecondTeam không có dữ liệu
  const firstTeam = matches.FirstTeam ? matches.FirstTeam : "User 1";
  const secondTeam = matches.SecondTeam ? matches.SecondTeam : "User 2";
  const logoFirstTeam = matches.LogoFirstTeam
    ? matches.LogoFirstTeam
    : `./src/img/user.jpg`;
  const logoSecondTeam = matches.LogoSecondTeam
    ? matches.LogoSecondTeam
    : `./src/img/user.jpg`;
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
                          <div class="team-logo"><img class="img__logo-list" src="${logoFirstTeam}" /></div>
                          <h2 class="team-name-list">${firstTeam}</h2>
                      </div>
                      <div class="match-score">
                          <span class="match-score-number match-score-number--leading">${match.FirstTeamPoint}</span>
                          <span class="match-score-divider">:</span>
                          <span class="match-score-number">${match.SecondTeamPoint}</span>
                      </div>
                      <div class="team team--away">
                          <div class="team-logo"><img class="img__logo-list" src="${logoSecondTeam}" /></div>
                          <h2 class="team-name-list">${secondTeam}</h2>
                      </div>
                  </div>
              </div>`
            )
            .join("")}
      </div>
  </div>
    `;
}

// Function to start the match carousel
async function startMatchCarousel(container, id, interval) {
  const matchData = await fetchMatchData(id); // Fetch data from API based on the given id

  if (matchData.length === 0) {
    container.innerHTML = "<p>No matches available</p>";
    return;
  }

  let currentIndex = 0;

  function showNextMatch() {
    if (currentIndex === matchData.length) {
      container.innerHTML = createMatchListElement(matchData);
      currentIndex = 0;
    } else {
      container.innerHTML = createMatchElement(matchData[currentIndex]);
      currentIndex++;
    }
  }

  showNextMatch();
  setInterval(showNextMatch, interval);
}

// Get the match container
const matchContainer = document.getElementById("match-container");

// Start the carousel with a 5-second interval and an example id (replace with dynamic id if necessary)
startMatchCarousel(matchContainer, "1", 50000); // Replace "12345" with the actual ID to fetch
