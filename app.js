function zoneClass(position) {
  if (position <= 4) return "zone-ucl";
  if (position === 5) return "zone-uel";
  if (position >= 18) return "zone-relegation";
  return "";
}

function buildActualPositionMap(actualTable) {
  const map = new Map();
  actualTable.forEach((row, index) => map.set(row.team, index + 1));
  return map;
}

function deltaInfo(predictedPos, actualPos) {
  if (actualPos == null) return { label: "–", cls: "" };
  const diff = Math.abs(predictedPos - actualPos);
  if (diff === 0) return { label: "0", cls: "correct" };
  if (diff <= 2) return { label: String(diff), cls: "close" };
  return { label: String(diff), cls: "off" };
}

function renderPredictionTable(tbodyId, predictionTable, actualPosMap) {
  const tbody = document.getElementById(tbodyId);
  tbody.innerHTML = "";

  predictionTable.forEach((row, index) => {
    const predictedPos = index + 1;
    const actualPos = actualPosMap.get(row.team) ?? null;
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

function render() {
  document.getElementById("season-label").textContent = `${DATA.season} season`;
  document.getElementById("name-a").textContent = `${DATA.predictorA.name}'s Prediction`;
  document.getElementById("name-b").textContent = `${DATA.predictorB.name}'s Prediction`;

  const actualPosMap = buildActualPositionMap(DATA.actual.table);

  renderPredictionTable("rows-a", DATA.predictorA.table, actualPosMap);
  renderActualTable(DATA.actual.table);
  renderPredictionTable("rows-b", DATA.predictorB.table, actualPosMap);
}

render();
