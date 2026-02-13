document.addEventListener('DOMContentLoaded', () => {
    initClock();
    setGreeting();
    setupFormListener();
});

function setGreeting() {
    const greetingElement = document.getElementById('greeting');

    if (greetingElement) {
        const now = new Date();
        const hour = now.getHours();
        let greetingText = "Welcome";

        if (hour >= 5 && hour < 12) {
            greetingText = "Good Morning!";
        } else if (hour >= 12 && hour < 17) {
            greetingText = "Good Afternoon!";
        } else if (hour >= 17 && hour < 21) {
            greetingText = "Good Evening!";
        } else {
            greetingText = "Good Night!";
        }

        greetingElement.innerText = greetingText;
    }
}

function initClock() {
    const clockElement = document.getElementById('digital-clock');

    if (clockElement) {
        function updateClock() {
            const now = new Date();
            let h = now.getHours();
            let m = now.getMinutes();
            let s = now.getSeconds();
            let session = "AM";

            if (h === 0) h = 12;
            if (h > 12) {
                h = h - 12;
                session = "PM";
            }

            h = (h < 10) ? "0" + h : h;
            m = (m < 10) ? "0" + m : m;
            s = (s < 10) ? "0" + s : s;

            const timeString = h + ":" + m + ":" + s + " " + session;
            clockElement.innerText = timeString;
        }

        updateClock();
        setInterval(updateClock, 1000);
    }
}

function setupFormListener() {
    const form = document.getElementById('contactForm');

    if (form) {
        form.addEventListener('submit', function(event) {

            event.preventDefault();

            const nameVal = document.getElementById('fullName').value;
            const emailVal = document.getElementById('email').value;
            const msgVal = document.getElementById('message').value;

            console.log("--- Form Submission Data ---");
            console.log("Full Name: " + nameVal);
            console.log("Email: " + emailVal);
            console.log("Message: " + msgVal);

            alert("Form submitted! Check the Console (F12) to see the values.");
        });
    }
}
