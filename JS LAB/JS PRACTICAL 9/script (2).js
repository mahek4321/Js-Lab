// ------------------------------------
// DOM ACCESS
// ------------------------------------

let schedules =
    document.querySelectorAll(".schedule");

let saved =
    document.getElementById("saved");

let clearBtn =
    document.getElementById("clearBtn");


// ------------------------------------
// LOAD SAVED PREFERENCE
// ------------------------------------

let savedSchedule =
    localStorage.getItem("selectedSchedule");


if (savedSchedule != null) {

    saved.innerHTML =
        "Saved Schedule: " +
        savedSchedule;

}


// ------------------------------------
// CLICK EVENT
// ------------------------------------

schedules.forEach(function(row) {

    row.addEventListener(
        "click",
        function() {


            // Get schedule information

            let schedule =
                row.getAttribute("data-info");


            // --------------------------------
            // ALERT BOX
            // --------------------------------

            alert(
                "Selected Schedule:\n" +
                schedule
            );


            // --------------------------------
            // LOCAL STORAGE
            // --------------------------------

            localStorage.setItem(
                "selectedSchedule",
                schedule
            );


            // --------------------------------
            // SESSION STORAGE
            // --------------------------------

            sessionStorage.setItem(
                "currentSchedule",
                schedule
            );


            // --------------------------------
            // DOM MANIPULATION
            // --------------------------------

            saved.style.color =
                "green";

            saved.innerHTML =
                "Selected Schedule: " +
                schedule;


            // Highlight selected row

            schedules.forEach(
                function(item) {

                    item.style.backgroundColor =
                        "";

                }
            );


            row.style.backgroundColor =
                "#fff3cd";

        }
    );

});


// ------------------------------------
// CLEAR BUTTON
// ------------------------------------

clearBtn.addEventListener(
    "click",
    function() {


        // Remove localStorage

        localStorage.removeItem(
            "selectedSchedule"
        );


        // Remove sessionStorage

        sessionStorage.removeItem(
            "currentSchedule"
        );


        // Clear message

        saved.style.color =
            "red";

        saved.innerHTML =
            "Saved preferences cleared.";


        // Remove row highlight

        schedules.forEach(
            function(row) {

                row.style.backgroundColor =
                    "";

            }
        );

    }
);