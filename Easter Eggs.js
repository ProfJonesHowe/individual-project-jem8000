

//THIS IS JUST FOR THE MOVING BUTTON
let msgCount = 0;
let unlocked = false;
let startTime = Date.now();
const secretCode = "WWSSADADba";

function movingButton() {
    if (unlocked) return;

    const messages = [
    "Looks like someone doesn't know my password",
    "What could it be?",
    "This is an Easter Egg page after all",
    "Do you think it would be one of the most iconic codes in video game history?",
    "Freddie Wong would have known this immediately",
    "Come on, its not that hard",
    "Ok fine, I'll give you a hint",
    "The company behind it developed MGS (metal gear solid)",
    "You have access to google BTW",
    "THATS ENOUGH",
    "STOP GETTING IT WRONG",
    "ITS NOT HARD",
    "A TODDLER COULD DO IT FASTER THAN YOU",
    "MY DYSLEXIC BROTHER COULD DO IT FASTER",
    "I would like to apologize for my outburst",
    "FYI, the last 2 digits of the code are lowercase",
    "ITS NOT THAT HARD",
    "EVEN I COULD DO IT!",
    "WWSSADADba",
    "did you really just ragebait me into doing it for you?",
    "and you still didn't input the code?",
    "OMG do you have a crush on me or something?",
    "Is this you wanting to spend more time with me?????",
    "Just kidding, Im not sentient nor AI, get your lonely butt out of here"
];

// Move button logic
    let h = window.innerHeight;
    let w = window.innerWidth;

    let randW = Math.random() * (w - 150);
    let randH = Math.random() * (h - 75);

    let btn = document.getElementById("moveBtn");
    btn.style.left = randW + "px";
    btn.style.top = randH + "px";

    btn.textContent = messages[msgCount];
    msgCount = (msgCount + 1) % messages.length;
}



function setupInputListener() { //this just listens for the button textbox
    const input = document.getElementById("secretInput");

    input.addEventListener("input", function () {
        if (input.value === secretCode) {
            unlockButton();
        }
    });
}

function setupRunningButton() {
    document.addEventListener("mousemove", function (event) {
        if (unlocked) return;

        let btn = document.getElementById("moveBtn");
        if (!btn) return;

        const rect = btn.getBoundingClientRect(); //some math I took from my last lab
        const btnX = rect.left + rect.width / 2;
        const btnY = rect.top + rect.height / 2;

        const distance = Math.hypot(
            event.clientX - btnX,
            event.clientY - btnY
        );

        if (distance < 170) { // i just like the number 170 for this, it works a lot better than some others (especailly with the weird shapes)
            movingButton();
        }
    });
}

function unlockButton() { //this unlocks the button once you get the code... or technically it locks the button... this naming scheme sucks
    unlocked = true;

    const btn = document.getElementById("moveBtn");
    btn.textContent = "QUICKLY! YOU NEED TO CLICK ME";
    btn.style.cursor = "pointer";

    document.getElementById("hintText").textContent =
        "You did it! Now hurry and click the button!";

    btn.addEventListener("click", showElapsedTime, { once: true });
}

function showElapsedTime() {
    const elapsedSeconds = Math.floor((Date.now() - startTime) / 1000);
    document.getElementById("moveBtn").textContent =
        `And it only took you ${elapsedSeconds} seconds`; //here we use a backtick so we can use a variable in the string... i looked up what the use of it was after being shown it in some google AI responses so i looked it up, its pretty cool
        //https://stackoverflow.com/questions/27678052/usage-of-the-backtick-character-in-javascript
}

// SUPER EPIC RESPONSE FORM!!!

function setupContactForm() {
    const form = document.getElementById("contactForm");
    if (!form) return;

    form.addEventListener("submit", function (e) { //just listens to whatever you put in the contact form
        e.preventDefault();

        const responses = [ //nasty response messages
            "Thanks for reaching out! Please don't do it again",
            "Your message has been received and immediately ignored",
            "I saw this... I regret seeing this",
            "Bold of you to assume I read messages",
            "Message received. Emotional damage sustained",
            "Thank you! I will respond in 3-5 business days",
            "This form exists solely to give you this message",
            "This is going to the shredding pile",
            "Thanks for the feedback! I will be ignoring all of it!",
            "Have you considered not complaining?",
            "Im shaking in my custom baby seal leather boots"
        ];

        const randomIndex = Math.floor(Math.random() * responses.length); //this makes sure we get a randome response based on the amount of responses we have to choose from

        document.getElementById("response").textContent =
            responses[randomIndex]; //just pull one from the array

        document.getElementById("message").value = ""; 
    });
}


//loads both easter eggs when the page loads
window.onload = function () {
    setupRunningButton();
    setupContactForm();
    setupInputListener();
};