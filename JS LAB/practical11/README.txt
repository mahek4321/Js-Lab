Aim: setTimeout, setInterval, import/export and responsive countdown.
RUN: Local HTTP server is required for module imports. This folder has script.js + timer.js.
TEST: 3 seconds -> 00:03 then countdown then Time is up!; Stop freezes countdown.
TEST: Start twice -> only latest countdown continues. 0 / 1.5 / 3601 -> rejected.
VIVA: setTimeout executes once; setInterval repeats; clearTimeout/clearInterval cancel.
export exposes a function; import uses it. type=module is required on script tag.
Date.now-based remaining time reduces accumulated interval drift, but browser timers can be delayed.
BUILD: Form -> timer.js exported formatter -> import -> interval render -> timeout finish -> stop.
