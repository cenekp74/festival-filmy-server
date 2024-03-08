function changeCurrentDay() {
    let daySelectEle = document.getElementById('day-select');
    let day = daySelectEle.value;
    response = confirm('Opravdu chcete změnit den?');
    if (response) {
        window.location.href = "/change_current_day/"+day
    }
}

let log_elements = document.querySelectorAll('.log')
log_elements.forEach(element => {
    element.scrollTop = element.scrollHeight;
});