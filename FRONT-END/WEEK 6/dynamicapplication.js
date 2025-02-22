
const originalColor = document.body.style.backgroundColor;

function changeBackground() {
    const colorInput = document.getElementById('colorPicker').value;
    if (isValidColor(colorInput)) {
        document.body.style.backgroundColor = colorInput;
    } else {
        alert('Invalid color. Using default color.');
        document.body.style.backgroundColor = 'lightcoral';
    }
}

function isValidColor(strColor) {
    const s = new Option().style;
    s.color = strColor;
    return s.color !== '';
}

document.getElementById('Change').onclick = function() {
    if (this.innerHTML === 'Change Background') {
        changeBackground();
        this.innerHTML = 'Reset Background';
    } else {
        document.body.style.backgroundColor = originalColor;
        this.innerHTML = 'Change Background';
    }
};


