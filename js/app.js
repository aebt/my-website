console.log("App.js has loaded!");

document.addEventListener('DOMContentLoaded', () => {
    initClock();
    setGreeting();
    
    setupFormListener();

    initWorksAnimation();
});

function initWorksAnimation() {
    const cards = document.querySelectorAll('.trigger-anim');
    const ball = document.getElementById('bouncing-ball');
    
    // Only run if we are on the Works page
    if (ball && cards.length > 0) {
        console.log("Works page detected. Bouncing ball ready.");

        // Animation Variables
        let x = 50;
        let y = 50;
        let dx = 5; 
        let dy = 5;
        let isAnimating = false;

        function animate() {
            const maxWidth = window.innerWidth - 50;
            const maxHeight = window.innerHeight - 50;

            x += dx;
            y += dy;

            if (x >= maxWidth || x <= 0) {
                dx = -dx;
                changeBallColor(ball);
            }

            if (y >= maxHeight || y <= 0) {
                dy = -dy;
                changeBallColor(ball);
            }

            ball.style.left = x + 'px';
            ball.style.top = y + 'px';

            requestAnimationFrame(animate);
        }

        cards.forEach(card => {
            card.addEventListener('click', () => {
                if (!isAnimating) {
                    
                    ball.style.display = 'block';
                    isAnimating = true;
                    
                    animate();
                    console.log("Ball activated!");
                }
            });
        });
    }
}

function changeBallColor(element) {
    const colors = ['#e74c3c', '#3498db', '#f1c40f', '#2ecc71', '#9b59b6'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    element.style.backgroundColor = randomColor;
}

function initClock() {
    const clockElement = document.getElementById('digital-clock');
    if (clockElement) {
        const updateClock = () => {
            const now = new Date();
            let h = now.getHours();
            let m = now.getMinutes();
            let s = now.getSeconds();
            let session = "AM";

            if (h === 0) h = 12;
            if (h > 12) { h = h - 12; session = "PM"; }

            h = (h < 10) ? "0" + h : h;
            m = (m < 10) ? "0" + m : m;
            s = (s < 10) ? "0" + s : s;

            clockElement.innerText = h + ":" + m + ":" + s + " " + session;
        };
        updateClock();
        setInterval(updateClock, 1000);
    }
}

function setGreeting() {
    const greetingElement = document.getElementById('greeting');
    if (greetingElement) {
        const h = new Date().getHours();
        let text = "Welcome";
        if (h >= 5 && h < 12) text = "Good Morning!";
        else if (h >= 12 && h < 17) text = "Good Afternoon!";
        else if (h >= 17 && h < 21) text = "Good Evening!";
        else text = "Good Night!";
        greetingElement.innerText = text;
    }
}

function setupFormListener() {
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            const n = document.getElementById('fullName')?.value;
            const e = document.getElementById('email')?.value;
            const m = document.getElementById('message')?.value;
            console.log("--- Form Data ---", n, e, m);
            alert("Form submitted! Check Console.");
        });
    }
}
