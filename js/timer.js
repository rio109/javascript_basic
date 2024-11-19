const localTime = document.getElementById("local-time");
const utcTime = document.getElementById("utc-time");
const timeZoneSelect = document.getElementById("time-zone-select");
const addTimeZoneButton = document.getElementById("add-time-zone-button");
const worldTimeDiv = document.getElementById("world-time-list");

const clocks = []; // 시간 정보를 저장할 목록

// 현재 시간 업데이트
function updateClocks() {
    const now = new Date();
    localTime.textContent = now.toLocaleTimeString();
    console.log(now.toUTCString)
    utcTime.textContent = now.toUTCString().split(" ")[4];
}

// 시간 추가
function addClock(timezone) {
    if (!clocks.includes(timezone)) {
        clocks.push(timezone);

        // DOM
        const clockDiv = document.createElement("div");
        clockDiv.classList.add("clock");
        clockDiv.dataset.timezone = timezone;

        const timezoneName = document.createElement("span");
        timezoneName.classList.add("timezone-name");
        timezoneName.textContent = timezone;

        const timezoneDisplay = document.createElement("span");
        timezoneDisplay.classList.add("time-display");

        const removeContainer = document.createElement("span");
        removeContainer.classList.add("remove-container");

        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.classList.add("remove-btn");

        // delete event
        removeButton.addEventListener("click", () => {
            clocks.splice(clocks.indexOf(timezone), 1)
            clockDiv.remove();
        });

        removeContainer.appendChild(removeButton);
        clockDiv.appendChild(timezoneName);
        clockDiv.appendChild(timezoneDisplay);
        clockDiv.appendChild(removeContainer);
        worldTimeDiv.appendChild(clockDiv);
    }
}


// world time update
function updateWorldTime() {
    const now = new Date();
    const clockElements = document.querySelectorAll(".clock")

    clockElements.forEach((clock) => {
        const timezone = clock.dataset.timezone;
        const timeDisplay = clock.querySelector(".time-display");

        const options = {
            timeZone: timezone,
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        }
        const time = now.toLocaleTimeString("en-US", options);
        timeDisplay.textContent = time;
    })
}

// add timezone
addTimeZoneButton.addEventListener("click", () => {
    const timezone = timeZoneSelect.value;
    addClock(timezone);
})

// 1sec interval
setInterval(() => {
    updateClocks();
    updateWorldTime();
}, 1000);

// init
updateClocks();
updateWorldTime