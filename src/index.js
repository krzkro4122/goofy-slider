// Gravity constant
const g = 9.81;
// Slider object and it's basic properties
const slider = {
  min: 0,
  max: 100,
  value: 60,
  velocity: 0,
  rotation: 0,
  rotationThreshold: 15,
  rotationStep: 3,
}


// Physics of falling with
function fall() {
  // Base condition to prevent infinite acceleration
  if (slider.rotation == 0) {
    slider.velocity = 0;
    return 0;
  }

  // Our time interval between updates
  const t = 80e-4 * Math.abs(slider.rotation)

  // v0
  initialVelocity = slider.velocity;
  // v = v0 + a * t , with rotation information
  slider.velocity = initialVelocity + g * Math.pow(t, 2);

  // x - x0 (the position delta)
  positionDelta = (1/2 * (initialVelocity + slider.velocity) * t ) * slider.rotation;

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


// Update slider's value according to it's gravitational speed caused by rotation.
// This is done continouosly.
function updateSlider() {

  slider.value = slider.value + fall();
  hitBorder();

  // value's width
  document.getElementById("value").style.width = `${slider.value}%`;

  // sliderPointer's position
  const sliderWidth = document.getElementById('slider').offsetWidth;
  document.getElementById('sliderPointer').style.left = `${( slider.value / 100) * sliderWidth}px`;

  // The displayed current value
  document.getElementById('currentValue').innerText = Math.floor(slider.value);
}


// Rotate the 'slider' DOM element until a specified threshold
function changeRotation(rotationValue) {
  rotationValue = slider.rotation + rotationValue;
  if (Math.abs(rotationValue) >= slider.rotationThreshold)
    return;
  slider.rotation = rotationValue;
  document.getElementById('slider').style.transform = `rotate(${rotationValue}deg)`;
}


// Main script entry
function main() {
  // Bind the buttons so they tilt the slider
  document.getElementById("plus").addEventListener("click", () => {
    changeRotation(slider.rotationStep);
  });
  document.getElementById("minus").addEventListener("click", () => {
    changeRotation(-slider.rotationStep);
  });

  // Basic event loop
  setInterval(updateSlider, 20);
}

main();