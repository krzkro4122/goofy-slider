const g = 9.81
const slider = {
  min: 0,
  max: 100,
  value: 60,
  velocity: 0,
  rotation: 0,
  rotationThreshold: 15,
  rotationStep: 3,
}


function fall() {

  initialVelocity = slider.velocity
  slider.velocity = slider.velocity + Math.floor(slider.rotation) * (g * Math.pow(20e-3, 2)) * 100

  return slider.velocity + 1/2 * (initialVelocity + slider.velocity) * 20e-3
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

  slider.value = fall()
  hitBorder()

  // value's width
  document.getElementById("value").style.width = `${slider.value}%`;

  // sliderPointer's position
  const sliderWidth = document.getElementById('slider').offsetWidth;
  document.getElementById('sliderPointer').style.left = `${( slider.value / 100) * sliderWidth}px`;
}


// Rotate the 'slider' elemnt until a specified threshold
function changeRotation(rotationValue) {
  rotationValue = slider.rotation + rotationValue
  if (Math.abs(rotationValue) >= slider.rotationThreshold)
    return
  slider.rotation = rotationValue
  document.getElementById('slider').style.transform = `rotate(${rotationValue}deg)`;
}


// Main script entry
function main() {
  // Bind the buttons so they tilt the slider
  document.getElementById("plus").addEventListener("click", () => {
    changeRotation(slider.rotationStep)
  });
  document.getElementById("minus").addEventListener("click", () => {
    changeRotation(-slider.rotationStep)
  });

  // Basic event loop
  setInterval(updateSlider, 20);
}

main()