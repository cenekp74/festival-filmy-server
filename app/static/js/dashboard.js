function changeCurrentDay() {
    let daySelectEle = document.getElementById('day-select');
    let day = daySelectEle.value;
    response = confirm('Opravdu chcete změnit den?');
    if (response) {
        window.location.href = "/change_current_day/"+day
    }
}

function fetch() {
    response = confirm('Opravdu chcete fetchnout data? Tímto změníte program filmů v systému na ten, který je na stránkách festivalu. Program je v souboru config.json na serveru.');
    if (response) {
        window.location.href = "/fetch"
    }
}

let log_elements = document.querySelectorAll('.log')
log_elements.forEach(element => {
    element.scrollTop = element.scrollHeight;
});