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

updateTime();