async function fetchCSV(filePath) {
    const response = await fetch(filePath);
    const csvText = await response.text();
    return parseCSV(csvText);
}

function parseCSV(csv) {
    const rows = csv.split('\n').map(row => row.split(','));
    const headers = rows.shift();

    return rows.map(row => {
        const yearLocation = row[0];
        const cyclist = row[1];
        return { yearLocation, cyclist };
    });
}

function searchByYear(data, year) {
    const results = data.filter(row => row.yearLocation.startsWith(year.toString()));
    return results.length > 0
        ? results.map(result => `${result.yearLocation}, ${result.cyclist}`).join('\n')
        : 'No results found';
}

document.getElementById('form').addEventListener('submit', async function(e) {
    e.preventDefault();
    const year = document.getElementById('year').value;
    const data = await fetchCSV('data/cyclists.csv');
    const result = searchByYear(data, year);
    document.getElementById('result').innerText = result;
});

