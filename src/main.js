// Function to fetch match data from the API
// async function fetchMatchData(id) {
//   try {
//     const response = await fetch(
//       `https://ligo3-dev4.ligo.vn/api/v1.0/PickleballMangement/GetAllMatchSchedule/${id}`
//     );
//     const data = await response.json();
//     return data; // Assuming the API returns an array of matches
//   } catch (error) {
//     console.error("Error fetching match data:", error);
//     return []; // Return an empty array in case of error
//   }
// }
async function fetchMatchData(screenNo) {
  try {
    const response = await fetch(
      `https://ligo3-dev4.ligo.vn/api/v1.0/PickleballMangement/GetScheduleByScreen/${screenNo}`
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
              <div class="match-status">Live</div>
              <div class="match-tournament"><img src="./src/img/logo-mau.png" /></div>
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
                          ${formattedDate} lúc <strong class="match-date">${formattedTime}</strong>
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

// Function to create a list of matches with 6 boxes, filling empty boxes if necessary
function createMatchListElement(matches) {
  const totalBoxes = 6;
  const filledBoxes = matches.length;
  const emptyBoxes = totalBoxes - filledBoxes;

  // Kiểm tra và thay thế nếu FirstTeam hoặc SecondTeam không có dữ liệu
  const firstTeam = matches.FirstTeam ? matches.FirstTeam : "User 1";
  const secondTeam = matches.SecondTeam ? matches.SecondTeam : "User 2";
  const logoFirstTeam = matches.LogoFirstTeam
    ? matches.LogoFirstTeam
    : `./src/img/user.jpg`;
  const logoSecondTeam = matches.LogoSecondTeam
    ? matches.LogoSecondTeam
    : `./src/img/user.jpg`;

  // Render the filled match boxes
  let matchListHTML = matches
    .map(
      (match) => `
      <div class="match-list-item">
          <div class="match-header-list">
              <div class="match-status-list">Live</div>
          </div>
          <div class="match__details-list">
              <div class="team team--home">
                  <div class="team-logo-list"><img class="img__logo-list" src="${logoFirstTeam}" /></div>
                  <h2 class="team-name-list">${firstTeam}</h2>
              </div>
              <div class="match-score">
                  <span class="match-score-number-list match-score-number--leading">${match.FirstTeamPoint}</span>
                  <span class="match-score-divider">:</span>
                  <span class="match-score-number-list">${match.SecondTeamPoint}</span>
              </div>
              <div class="team team--away">
                  <div class="team-logo-list"><img class="img__logo-list" src="${logoSecondTeam}" /></div>
                  <h2 class="team-name-list">${secondTeam}</h2>
              </div>
          </div>
      </div>`
    )
    .join("");

  // Render the empty boxes if there are not enough matches
  for (let i = 0; i < emptyBoxes; i++) {
    matchListHTML += `
      <div class="match-list-item">
          <div class="match-header-list">
              <div class="match-status-list">-</div>
          </div>
         
      </div>
    `;
  }

  return `
    <div class="container__box">
        <div class="match-list">
            ${matchListHTML}
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
const searchParam = new URLSearchParams(window.location.search);
if (searchParam.size >= 1) {
  const src = searchParam.get("src");
  if (typeof src === "string" && parseFloat(src)) {
    startMatchCarousel(matchContainer, parseFloat(src), 500000);
  } else {
    alert("Vui lòng chọn src 1 hoặc 2");
  }
} else {
  alert("Vui lòng chọn src");
}

// startMatchCarousel(matchContainer, "1", 500000); // Replace "12345" with the actual ID to fetch

{
  /* <div class="match-list-item">
          <div class="match-header-list">
              <div class="match-status-list">-</div>
          </div>
          <div class="match__details-list">
              <div class="team team--home">
                  <div class="team-logo-list"><img class="img__logo-list" src="./src/img/user.jpg" /></div>
                  <h2 class="team-name-list">-</h2>
              </div>
              <div class="match-score">
                  <span class="match-score-number-list match-score-number--leading">-</span>
                  <span class="match-score-divider">:</span>
                  <span class="match-score-number-list">-</span>
              </div>
              <div class="team team--away">
                  <div class="team-logo-list"><img class="img__logo-list" src="./src/img/user.jpg" /></div>
                  <h2 class="team-name-list">-</h2>
              </div>
          </div>
      </div> */
}
