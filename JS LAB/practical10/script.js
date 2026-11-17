function renderStudents(data, method) {
    if (!Array.isArray(data)) throw new Error('Expected an array');
    const rows = document.getElementById('rows');
    rows.replaceChildren();
    data.forEach(student => {
        const row = document.createElement('tr');
        [student.id, student.name, student.department, student.marks].forEach(value => {
            const cell = document.createElement('td');
            cell.textContent = value;
            row.appendChild(cell);
        });
        rows.appendChild(row);
    });
    document.getElementById('output').textContent = `${data.length} students loaded using ${method}.`;
}
function showError(error) {
    document.getElementById('output').textContent = 'Could not load JSON: ' + error;
}
document.getElementById('fetchBtn').onclick = async function() {
    try {
        const response = await fetch('students.json');
        if (!response.ok) throw new Error('HTTP ' + response.status);
        const data = await response.json();
        renderStudents(data, 'fetch');
    } catch (error) { showError(error.message); }
};
$('#jqueryBtn').on('click', function() {
    $.getJSON('students.json').done(function(data) {
        try { renderStudents(data, 'jQuery getJSON'); }
        catch (error) { showError(error.message); }
    }).fail(function(xhr, status, error) { showError(error || status); });
});
