// Edit this file to update predictions and the real table.
// Each table is an array of 20 team names, in order from 1st to 20th place.
// "points" is optional — if provided it will be shown next to the team name.

const DATA = {
  season: "2026/27",

  predictorA: {
    name: "Alex", // TODO: change to your name
    table: [
      { team: "Manchester City" },
      { team: "Arsenal" },
      { team: "Liverpool" },
      { team: "Chelsea" },
      { team: "Newcastle United" },
      { team: "Aston Villa" },
      { team: "Tottenham Hotspur" },
      { team: "Manchester United" },
      { team: "Brighton & Hove Albion" },
      { team: "West Ham United" },
      { team: "Crystal Palace" },
      { team: "Fulham" },
      { team: "Brentford" },
      { team: "Bournemouth" },
      { team: "Wolverhampton Wanderers" },
      { team: "Everton" },
      { team: "Nottingham Forest" },
      { team: "Leicester City" },
      { team: "Ipswich Town" },
      { team: "Southampton" }
    ]
  },

  predictorB: {
    name: "Sam", // TODO: change to your friend's name
    table: [
      { team: "Arsenal" },
      { team: "Manchester City" },
      { team: "Chelsea" },
      { team: "Liverpool" },
      { team: "Tottenham Hotspur" },
      { team: "Newcastle United" },
      { team: "Manchester United" },
      { team: "Aston Villa" },
      { team: "West Ham United" },
      { team: "Brighton & Hove Albion" },
      { team: "Bournemouth" },
      { team: "Crystal Palace" },
      { team: "Everton" },
      { team: "Brentford" },
      { team: "Fulham" },
      { team: "Nottingham Forest" },
      { team: "Wolverhampton Wanderers" },
      { team: "Ipswich Town" },
      { team: "Leicester City" },
      { team: "Southampton" }
    ]
  },

  // Update this table as the real season progresses (or at the end for the final standings).
  actual: {
    table: [
      { team: "Manchester City", played: 0, points: 0 },
      { team: "Arsenal", played: 0, points: 0 },
      { team: "Liverpool", played: 0, points: 0 },
      { team: "Chelsea", played: 0, points: 0 },
      { team: "Newcastle United", played: 0, points: 0 },
      { team: "Aston Villa", played: 0, points: 0 },
      { team: "Tottenham Hotspur", played: 0, points: 0 },
      { team: "Manchester United", played: 0, points: 0 },
      { team: "Brighton & Hove Albion", played: 0, points: 0 },
      { team: "West Ham United", played: 0, points: 0 },
      { team: "Crystal Palace", played: 0, points: 0 },
      { team: "Fulham", played: 0, points: 0 },
      { team: "Brentford", played: 0, points: 0 },
      { team: "Bournemouth", played: 0, points: 0 },
      { team: "Wolverhampton Wanderers", played: 0, points: 0 },
      { team: "Everton", played: 0, points: 0 },
      { team: "Nottingham Forest", played: 0, points: 0 },
      { team: "Leicester City", played: 0, points: 0 },
      { team: "Ipswich Town", played: 0, points: 0 },
      { team: "Southampton", played: 0, points: 0 }
    ]
  }
};
