/* =====================================
   DARK MODE
===================================== */

function toggleTheme() {

    document.body.classList.toggle("dark");

    const dark =
        document.body.classList.contains("dark");

    localStorage.setItem(
        "darkMode",
        dark
    );

}


/* Load saved theme */

if (
    localStorage.getItem("darkMode")
    === "true"
) {

    document.body.classList.add("dark");

}


/* =====================================
   MOTIVATIONAL QUOTES
===================================== */

const quotes = [

    "Your future is created by what you do today.",

    "Small progress is still progress.",

    "Don't wish for success. Work for it.",

    "One focused hour can change your entire day.",

    "You don't need to be perfect. You need to keep improving.",

    "Discipline can take you places motivation cannot.",

    "The best time to start is now.",

    "Your effort today becomes your confidence tomorrow."

];


function changeQuote() {

    const random =
        Math.floor(
            Math.random() * quotes.length
        );

    const element =
        document.getElementById("homeQuote");

    if (element) {

        element.innerText =
            quotes[random];

    }

}


function dashboardMotivation() {

    const random =
        Math.floor(
            Math.random() * quotes.length
        );

    const element =
        document.getElementById(
            "dashboardQuote"
        );

    if (element) {

        element.innerText =
            quotes[random];

    }

}


/* =====================================
   POMODORO TIMER
===================================== */

let timeLeft = 25 * 60;

let timerInterval = null;


function updateTimer() {

    let minutes =
        Math.floor(timeLeft / 60);

    let seconds =
        timeLeft % 60;

    seconds =
        seconds < 10
        ? "0" + seconds
        : seconds;

    const timer =
        document.getElementById("timer");

    if (timer) {

        timer.innerText =
            minutes + ":" + seconds;

    }

}


function startTimer() {

    if (timerInterval !== null)
        return;

    timerInterval =
        setInterval(function () {

            if (timeLeft > 0) {

                timeLeft--;

                updateTimer();

            } else {

                clearInterval(
                    timerInterval
                );

                timerInterval = null;

                alert(
                    "🎉 Focus session complete!\nTake a short break."
                );

            }

        }, 1000);

}


function pauseTimer() {

    clearInterval(timerInterval);

    timerInterval = null;

}


function resetTimer() {

    clearInterval(timerInterval);

    timerInterval = null;

    timeLeft = 25 * 60;

    updateTimer();

}


updateTimer();


/* =====================================
   DAILY GOAL
===================================== */

let studyGoal = 0;

let studyProgress = 0;


function setGoal() {

    const input =
        document.getElementById(
            "goalInput"
        );

    if (!input)
        return;

    studyGoal =
        Number(input.value);

    studyProgress = 0;

    localStorage.setItem(
        "studyGoal",
        studyGoal
    );

    updateProgress();

}


function updateProgress() {

    const bar =
        document.getElementById(
            "progressBar"
        );

    const text =
        document.getElementById(
            "goalText"
        );

    if (!bar || !text)
        return;

    if (studyGoal <= 0) {

        text.innerText =
            "No goal set yet.";

        bar.style.width = "0%";

        return;

    }

    let percentage =
        (studyProgress /
            studyGoal) * 100;

    percentage =
        Math.min(
            percentage,
            100
        );

    bar.style.width =
        percentage + "%";

    text.innerText =
        studyProgress +
        " / " +
        studyGoal +
        " minutes studied (" +
        Math.round(percentage) +
        "%)";

}


if (
    localStorage.getItem(
        "studyGoal"
    )
) {

    studyGoal =
        Number(
            localStorage.getItem(
                "studyGoal"
            )
        );

    updateProgress();

}


/* =====================================
   TASK MANAGER
===================================== */

let tasks =
    JSON.parse(
        localStorage.getItem(
            "studyTasks"
        )
    ) || [];


function addTask() {

    const input =
        document.getElementById(
            "taskInput"
        );

    if (!input)
        return;

    const task =
        input.value.trim();

    if (task === "")
        return;

    tasks.push(task);

    localStorage.setItem(
        "studyTasks",
        JSON.stringify(tasks)
    );

    input.value = "";

    displayTasks();

}


function deleteTask(index) {

    tasks.splice(
        index,
        1
    );

    localStorage.setItem(
        "studyTasks",
        JSON.stringify(tasks)
    );

    displayTasks();

}


function displayTasks() {

    const list =
        document.getElementById(
            "taskList"
        );

    if (!list)
        return;

    list.innerHTML = "";

    tasks.forEach(
        function(task, index) {

            const li =
                document.createElement(
                    "li"
                );

            li.innerHTML = `

                <span>
                    ${task}
                </span>

                <button
                    onclick="deleteTask(${index})">
                    ✓
                </button>

            `;

            list.appendChild(li);

        }
    );

}


displayTasks();


/* =====================================
   STUDY STREAK
===================================== */

let streak =
    Number(
        localStorage.getItem(
            "studyStreak"
        )
    ) || 0;


function increaseStreak() {

    streak++;

    localStorage.setItem(
        "studyStreak",
        streak
    );

    updateStreak();

}


function updateStreak() {

    const element =
        document.getElementById(
            "streak"
        );

    if (element) {

        element.innerText =
            streak;

    }

}


updateStreak();