const STANDINGS_URL = "https://site.api.espn.com/apis/v2/sports/soccer/eng.1/standings";

const TEAM_NAMES = {
  "AFC Bournemouth": "Bournemouth",
  "Brighton & Hove Albion": "Brighton",
  "Coventry City": "Coventry",
  "Hull City": "Hull",
  "Ipswich Town": "Ipswich",
  "Leeds United": "Leeds"
};

function normalizeTeamName(name) {
  return TEAM_NAMES[name] ?? name;
}

function zoneClass(position) {
  if (position <= 4) return "zone-ucl";
  if (position === 5) return "zone-uel";
  if (position >= 18) return "zone-relegation";
  return "";
}

function buildActualPositionMap(actualTable) {
  const map = new Map();
  actualTable.forEach((row, index) => map.set(normalizeTeamName(row.team), index + 1));
  return map;
}

function deltaInfo(predictedPos, actualPos) {
  if (actualPos == null) return { label: "–", cls: "" };
  const diff = Math.abs(predictedPos - actualPos);
  if (diff === 0) return { label: "0", cls: "correct" };
  const arrow = actualPos < predictedPos ? "&uarr;" : "&darr;";
  if (diff <= 2) return { label: `${arrow} ${diff}`, cls: "close" };
  return { label: `${arrow} ${diff}`, cls: "off" };
}

function totalDifference(predictionTable, actualPosMap) {
  return predictionTable.reduce((total, row, index) => {
    const actualPos = actualPosMap.get(normalizeTeamName(row.team));
    return total + (actualPos == null ? 0 : Math.abs(index + 1 - actualPos));
  }, 0);
}

function renderPredictionTable(tbodyId, predictionTable, actualPosMap) {
  const tbody = document.getElementById(tbodyId);
  tbody.innerHTML = "";

  predictionTable.forEach((row, index) => {
    const predictedPos = index + 1;
    const actualPos = actualPosMap.get(normalizeTeamName(row.team)) ?? null;
    const delta = deltaInfo(predictedPos, actualPos);

    const tr = document.createElement("tr");
    tr.className = zoneClass(predictedPos);
    tr.innerHTML = `
      <td class="pos">${predictedPos}</td>
      <td>${row.team}</td>
      <td class="delta ${delta.cls}">${delta.label}</td>
    `;
    tbody.appendChild(tr);
  });
}

function renderActualTable(actualTable) {
  const tbody = document.getElementById("rows-actual");
  tbody.innerHTML = "";

  actualTable.forEach((row, index) => {
    const position = index + 1;
    const tr = document.createElement("tr");
    tr.className = zoneClass(position);
    tr.innerHTML = `
      <td class="pos">${position}</td>
      <td>${row.team}</td>
      <td>${row.points ?? "–"}</td>
    `;
    tbody.appendChild(tr);
  });
}

function render(actualTable) {
  document.getElementById("season-label").textContent = `${DATA.season} season`;
  document.getElementById("name-a").textContent = DATA.predictorA.name;
  document.getElementById("name-b").textContent = DATA.predictorB.name;

  const actualPosMap = buildActualPositionMap(actualTable);
  document.getElementById("total-a").textContent = `Total: ${totalDifference(DATA.predictorA.table, actualPosMap)}`;
  document.getElementById("total-b").textContent = `Total: ${totalDifference(DATA.predictorB.table, actualPosMap)}`;

  renderPredictionTable("rows-a", DATA.predictorA.table, actualPosMap);
  renderActualTable(actualTable);
  renderPredictionTable("rows-b", DATA.predictorB.table, actualPosMap);
}

function statValue(entry, name) {
  return entry.stats.find((stat) => stat.name === name)?.value ?? 0;
}

async function loadLiveStandings() {
  const response = await fetch(STANDINGS_URL);
  if (!response.ok) throw new Error(`Standings request failed: ${response.status}`);

  const payload = await response.json();
  const entries = payload.children?.[0]?.standings?.entries;
  if (!Array.isArray(entries) || entries.length !== 20) {
    throw new Error("Live standings were incomplete.");
  }

  return entries.map((entry) => ({
    team: normalizeTeamName(entry.team.displayName),
    played: statValue(entry, "gamesPlayed"),
    points: statValue(entry, "points")
  }));
}

async function initializeDashboard() {
  render(DATA.actual.table);

  try {
    const actualTable = await loadLiveStandings();
    render(actualTable);
  } catch {
    render(DATA.actual.table);
  }
}

initializeDashboard();
