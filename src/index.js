// Gravity constant
const g = 9.81;

// Slider object and it's basic properties
const slider = {
    min: 0,
    max: 100,
    time: 0,
    value: 69,
    velocity: 0,
    rotation: 0,
    direction: 0, // -1 -> left ,0 -> start, 1 -> right
    rotationThreshold: 15,
    rotationStep: 3,
};

// Physics of falling with rotation of the slope taken into account.
// Returns the desired position change of the sliderPointer.
function fall() {
    // Our time interval between updates is dependant on rotation (to mimmic acceleration)
    const T = 20e-4;


    // Simple, straight-line gravitational fall
    // s = vt + at^2 / 2
    if (Math.floor(slider.rotation) != 0){
        slider.time += T;
        positionDelta = (slider.velocity * slider.time + g * Math.pow(T, 2) * 1/2) * Math.floor(slider.rotation);
        slider.velocity += (g * T);
    }
    else {
        // Drag or just stop
        if (slider.time > 0)
            slider.time -= T;
        else
            slider.time = 0;
        positionDelta = (slider.velocity * slider.time - g * Math.pow(T, 2) * 1/2) * slider.direction;
        slider.velocity += (g * T) * slider.direction;
    }

    // Taking direction into account

    // Changing direction to right
    if (positionDelta > 0 && slider.direction <= 0) {
        slider.time = 0;
        slider.direction = 1;
    } // Changing direction to left
    else if ( positionDelta < 0 && slider.direction >= 0) {
        slider.time = 0;
        slider.direction = -1;
    }

    // console.log(positionDelta)
    return positionDelta;
}


// Limit the sliderPointer so it doesn't go out of bounds.
function hitBorder() {

    if (slider.value < slider.min)
        slider.value = slider.min;

    if (slider.value > slider.max)
        slider.value = slider.max;
}


function win(hidePrize, showPrize) {
    if (Math.floor(slider.value) != 50)
        hidePrize();
    else
        showPrize();
}


// Update slider's value according to it's gravitational speed caused by rotation.
// This is done continouosly.
function updateViewPort() {

    slider.value = slider.value + fall();
    hitBorder();

    // value's width
    document.getElementById("value").style.width = `${slider.value}%`;

    // sliderPointer's position
    const sliderWidth = document.getElementById('slider').offsetWidth;
    document.getElementById('sliderPointer').style.left = `${( slider.value / 100) * sliderWidth}px`;

    // The displayed current value
    document.getElementById('currentValue').innerText = Math.floor(slider.value);

    win(
        // hidePrize
        () => {
            document.getElementById('prize').style.visibility = 'hidden';
        },
        // showPrize
        () => {
            document.getElementById('prize').style.visibility = 'visible';
        },
    );
}


// Rotate the 'slider' DOM element until a specified threshold
function changeRotation(rotationValue) {
    rotationValue = slider.rotation + rotationValue;
    if (Math.abs(rotationValue) >= slider.rotationThreshold)
        return;
    slider.rotation = rotationValue;
    document.getElementById('slider').style.transform = `rotate(${rotationValue}deg)`;
}


// Bind arrow keys to tilt slider
// Left arrow
window.addEventListener('keydown', (event) => {
    if (event.keyCode === 37) {
        document.getElementById('minus').click();
    }
});
// Right arrow
window.addEventListener('keydown', (event) => {
    if (event.keyCode === 39) {
        document.getElementById('plus').click();
    }
});


// Main script entry
function main() {
    // Bind the buttons so they tilt the slider
    document.getElementById("minus").addEventListener("click", () => {
        changeRotation(-slider.rotationStep);
    });
    document.getElementById("plus").addEventListener("click", () => {
        changeRotation(slider.rotationStep);
    });

    // Basic event loop
    setInterval(updateViewPort, 20);
}

main();