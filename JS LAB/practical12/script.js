const KEY = 'js-prep-board';
let tasks = [];
try {
    const saved = JSON.parse(localStorage.getItem(KEY) || '[]');
    if (!Array.isArray(saved) || saved.some(t => !t || typeof t.id !== 'string' || typeof t.title !== 'string' || typeof t.done !== 'boolean')) throw new Error('Invalid saved data');
    tasks = saved;
} catch (error) { $('#output').text('Saved data could not be loaded. Starting an empty board.'); }
function render() {
    $('#tasks').empty();
    tasks.forEach(task => {
        const row = $('<li>').attr('data-id', task.id);
        const check = $('<input>').attr({type: 'checkbox', 'aria-label': 'Mark task complete'}).prop('checked', task.done).addClass('toggle');
        const title = $('<span>').text(task.title).css('text-decoration', task.done ? 'line-through' : 'none');
        const remove = $('<button>').text('Delete').addClass('delete');
        row.append(check, title, remove).appendTo('#tasks');
    });
}
function saveAndRender() {
    render();
    try { localStorage.setItem(KEY, JSON.stringify(tasks)); }
    catch (error) { $('#output').text('Could not save tasks: ' + error.message); }
}
$('#taskForm').on('submit', function(event) {
    event.preventDefault();
    const title = $('#task').val().trim();
    if (!title) { $('#output').text('Enter a task.'); return; }
    tasks.push({id: 'local-' + Date.now() + '-' + Math.random().toString(36).slice(2), title, done: false});
    $('#task').val(''); $('#output').text('Task added.'); saveAndRender();
});
// Delegation handles events from dynamically created rows.
$('#tasks').on('change', '.toggle', function() {
    const id = $(this).closest('li').attr('data-id');
    tasks.find(task => task.id === id).done = this.checked;
    saveAndRender();
});
$('#tasks').on('click', '.delete', function() {
    const id = $(this).closest('li').attr('data-id');
    tasks = tasks.filter(task => task.id !== id); saveAndRender();
});
$('#clear').on('click', function() { tasks = tasks.filter(task => !task.done); saveAndRender(); });
$('#load').on('click', function() {
    $.ajax({url: 'tasks.json', dataType: 'json', success: function(data) {
        if (!Array.isArray(data) || data.some(t => !t || typeof t.id !== 'string' || typeof t.title !== 'string' || typeof t.done !== 'boolean')) {
            $('#output').text('Invalid task data.'); return;
        }
        data.forEach(task => { if (!tasks.some(t => t.id === task.id)) tasks.push(task); });
        $('#output').text('AJAX import complete. Duplicate IDs were skipped.'); saveAndRender();
    }, error: function() { $('#output').text('AJAX failed. Check tasks.json and the local server.'); }});
});
function updateClock() { $('#clock').text(new Date().toLocaleTimeString()); }
updateClock(); setInterval(updateClock, 1000); render();
