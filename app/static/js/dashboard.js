let log_elements = document.querySelectorAll('.log')

log_elements.forEach(element => {
    element.scrollTop = element.scrollHeight;
});