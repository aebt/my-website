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

const formLoadTime = Date.now();

function setupFormListener() {
    const form = document.getElementById('contactForm');

    if (form) {
        console.log("Contact form found! Listening for submit...");

        form.addEventListener('submit', function(event) {
            event.preventDefault(); // Stop default reload

            const emailVal = document.getElementById('email').value;
            const messageVal = document.getElementById('message').value;
            const nameVal = document.getElementById('fullName').value; 

            // email validation
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(emailVal)) {
                alert("Please enter a valid email address.");
                return;
            }

            // time-based spam filter
            const submitTime = Date.now();
            const timeDifference = (submitTime - formLoadTime) / 1000; 
            
            // If submitted in less than 2 seconds, it's a bot
            if (timeDifference < 2) {
                alert("Submission too fast! You might be a bot.");
                return;
            }

            // keyword detection spam filter
            const spamKeywords = ["free money", "buy now", "click here", "subscribe", "promo"];
            const lowerCaseMessage = messageVal.toLowerCase();
            const foundSpam = spamKeywords.some(keyword => lowerCaseMessage.includes(keyword));

            if (foundSpam) {
                alert("Spam detected: Your message contains blocked keywords.");
                return;
            }

            // if all checks pass, send to web3forms
            console.log("Validation passed. Sending to Web3Forms...");
            
            const formData = new FormData(form);

            fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            })
            .then(async (response) => {
                if (response.status === 200) {
                    const contactContainer = document.querySelector('.contact-form');
                    contactContainer.innerHTML = `
                        <div style="text-align: center; padding: 50px; color: #2ecc71;">
                            <h2 style="font-size: 2.5rem; margin-bottom: 10px;">✅ Message Sent!</h2>
                            <p style="font-size: 1.2rem; color: #555;">Thank you, <strong>${nameVal}</strong>.</p>
                            <p>We received your email successfully.</p>
                            <br>
                            <button onclick="location.reload()" style="padding: 10px 20px; background: #3498db; color: white; border: none; border-radius: 4px; cursor: pointer;">Send Another</button>
                        </div>
                    `;
                } else {
                    console.log("Error response", response);
                    alert("Something went wrong. Please try again.");
                }
            })
            .catch(error => {
                console.log("Network Error:", error);
                alert("Network Error: Your connection might be blocking this form.");
            });
        });
    }
}



