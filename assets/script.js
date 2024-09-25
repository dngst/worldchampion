const fetchCSV = async (filePath) => {
  const response = await fetch(filePath);
  const csvText = await response.text();
  return parseCSV(csvText);
};

const parseCSV = (csv) => {
  const rows = csv.split("\n").map((row) => row.split(","));
  const headers = rows.shift();

  return rows.map(([yearLocation, cyclist]) => ({ yearLocation, cyclist }));
};

const searchByYear = (data, year) => {
  const results = data.filter((row) =>
    row.yearLocation.startsWith(year.toString()),
  );
  return results.length > 0
    ? results
        .map((result) => `${result.yearLocation}, ${result.cyclist}`)
        .join("\n")
    : "No results found";
};

document.getElementById("form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const year = document.getElementById("year").value;
  const data = await fetchCSV("data/cyclists.csv");
  const result = searchByYear(data, year);
  document.getElementById("result").innerText = result;
});
