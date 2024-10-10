const start = document.getElementById("start");
const stop = document.getElementById("stop");
const url = document.getElementById("url");
const username = document.getElementById("username");
const content = document.getElementById("message");
const avatar_url = document.getElementById("avatar");
let interval;

start.addEventListener("click", async () => {
    if (!url.value || !content.value) {
        alert("Please fill out all required info!");
        return false;
    }
    try {
        const response = await fetch(url.value);
        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        start.disabled = true;
        stop.disabled = false;
        alert("Started spamming!");
        interval = setInterval(send, 50);
    } catch (e) {
        alert("Invalid webhook URL!");
    }
});

stop.addEventListener("click", async () => {
    clearInterval(interval);
    start.disabled = false;
    stop.disabled = true;
    alert("Stopped spamming!");
});

async function send() {
    const payload = {
        username: username.value,
        avatar_url: avatar_url.value,
        content: content.value,
    };

    try {
        await fetch(url.value, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload),
        });
    } catch (e) {
        console.log(e);
    }
}
