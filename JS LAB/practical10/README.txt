Aim: Load external JSON using BOTH fetch() and jQuery $.getJSON(); dynamic table.
RUN: Must use localhost server, not file:// double-click. jQuery is bundled locally, so internet not needed.
TEST: Each button -> exactly 3 student rows; repeated clicks replace, not duplicate, rows.
TEST error: Temporarily rename students.json, click either button -> visible load error. Restore filename.
VIVA: JSON is text data format; JS object is in-memory data. response.json parses asynchronously.
fetch returns a Promise; await waits inside async. HTTP errors need response.ok check.
$.getJSON does AJAX and parses JSON; .fail handles request/parse errors.
This reads a file; it does NOT write changes back to JSON.
BUILD: JSON array -> buttons -> fetch/getJSON -> loop create table rows -> error handler.
