function updateTime() {
    const currentTime = new Date();
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const seconds = currentTime.getSeconds();

    const formattedTime = `${hours}:${padZero(minutes)}:${padZero(seconds)}`;
    document.getElementById('time').textContent = formattedTime;

    setTimeout(updateTime, 1000);
}

function padZero(value) {
    return value < 10 ? `0${value}` : value;
}

function getRandomInt(min, max) {
    return Math.random() * (max - min) + min;
}

updateTime();

document.addEventListener("keypress", () => {
    if (window.backgroundAudioStarted) {
        return
    }
    const audio = new Audio("/static/background.mp3")
    audio.preload = "metadata"
    audio.loop = true
    audio.volume = .2
    audio.addEventListener("loadedmetadata", () => {
        audio.currentTime = getRandomInt(1, audio.duration-10) // posude audio do nahodnyho casu
        audio.play();
        window.backgroundAudioStarted = true;
    })
})
