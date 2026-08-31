// Edit this file to update predictions and the real table.
// Each table is an array of 20 team names, in order from 1st to 20th place.
// "points" is optional — if provided it will be shown next to the team name.

const DATA = {
  season: "2026/27",

  predictorA: {
    name: "Ignas",
    table: [
      { team: "Arsenal" },
      { team: "Manchester City" },
      { team: "Chelsea" },
      { team: "Manchester United" },
      { team: "Tottenham Hotspur" },
      { team: "Liverpool" },
      { team: "Brentford" },
      { team: "Aston Villa" },
      { team: "Brighton" },
      { team: "Nottingham Forest" },
      { team: "Crystal Palace" },
      { team: "Bournemouth" },
      { team: "Sunderland" },
      { team: "Newcastle United" },
      { team: "Everton" },
      { team: "Leeds" },
      { team: "Coventry" },
      { team: "Fulham" },
      { team: "Ipswich" },
      { team: "Hull" }
    ]
  },

  predictorB: {
    name: "Augustinas",
    table: [
      { team: "Arsenal" },
      { team: "Manchester City" },
      { team: "Liverpool" },
      { team: "Manchester United" },
      { team: "Chelsea" },
      { team: "Tottenham Hotspur" },
      { team: "Brentford" },
      { team: "Bournemouth" },
      { team: "Newcastle United" },
      { team: "Everton" },
      { team: "Brighton" },
      { team: "Aston Villa" },
      { team: "Sunderland" },
      { team: "Nottingham Forest" },
      { team: "Crystal Palace" },
      { team: "Leeds" },
      { team: "Fulham" },
      { team: "Coventry" },
      { team: "Ipswich" },
      { team: "Hull" }
    ]
  },

  // Update this table as the real season progresses (or at the end for the final standings).
  actual: {
    table: [
      { team: "Arsenal", played: 0, points: 0 },
      { team: "Manchester City", played: 0, points: 0 },
      { team: "Chelsea", played: 0, points: 0 },
      { team: "Manchester United", played: 0, points: 0 },
      { team: "Tottenham Hotspur", played: 0, points: 0 },
      { team: "Liverpool", played: 0, points: 0 },
      { team: "Brentford", played: 0, points: 0 },
      { team: "Aston Villa", played: 0, points: 0 },
      { team: "Brighton", played: 0, points: 0 },
      { team: "Nottingham Forest", played: 0, points: 0 },
      { team: "Crystal Palace", played: 0, points: 0 },
      { team: "Bournemouth", played: 0, points: 0 },
      { team: "Sunderland", played: 0, points: 0 },
      { team: "Newcastle United", played: 0, points: 0 },
      { team: "Everton", played: 0, points: 0 },
      { team: "Leeds", played: 0, points: 0 },
      { team: "Coventry", played: 0, points: 0 },
      { team: "Fulham", played: 0, points: 0 },
      { team: "Ipswich", played: 0, points: 0 },
      { team: "Hull", played: 0, points: 0 }
    ]
  }
};
