Aim: JS + jQuery app combining DOM, events, storage, AJAX, live clock.
RUN: Use local server. Bundled jQuery and local tasks.json allow an offline demonstration.
TEST: Add Study JS -> tick -> reload -> task and done state persist. Delete -> reload -> stays deleted.
TEST: Import sample tasks twice -> only 2 sample entries, no duplicate IDs.
TEST: Complete all -> Clear completed -> reload -> remains empty, no automatic default-task repopulation.
TEST: Rename tasks.json temporarily -> AJAX error displayed. Restore afterward.
VIVA: AJAX loads data without full-page refresh. Event delegation handles dynamic elements.
JSON.stringify stores array as text; JSON.parse restores. text() safely inserts task titles.
Real-time here means in-page live clock and immediate local updates; this is NOT multi-user server sync.
BUILD: tasks array -> render -> form events -> storage -> delegated check/delete -> AJAX import -> clock.
