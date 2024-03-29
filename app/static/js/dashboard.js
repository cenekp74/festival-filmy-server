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

function delete_logs() {
    response = confirm('Opravdu si přejete smazat logy? Automaticky se vytvoří záloha ve složce log_archive. ');
    if (response) {
        window.location.href = "/delete_logs"
    }
}

function displayMinutesPassed() {
    var startTime = new Date();
    setInterval(function() {
        var currentTime = new Date();
        var timeDiff = Math.floor((currentTime - startTime) / 60000);
        document.getElementById('minutes').innerHTML = timeDiff + "min";
    }, 60000);
}

displayMinutesPassed();

let log_elements = document.querySelectorAll('.log')
log_elements.forEach(element => {
    element.scrollTop = element.scrollHeight;
});