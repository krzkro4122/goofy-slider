const slider = {
  min: 0,
  max: 100,
  value: 60,
  velocity: 0,
  rotation: 0,
  rotationThreshold: 15,
  rotationStep: 3,
}

const g = 9.81

function fall() {

  initialVelocity = slider.velocity
  slider.velocity = slider.velocity + Math.floor(slider.rotation) * (g * Math.pow(20e-3, 2)) * 100
  // console.log('slider.velocity:', slider.velocity)

  return slider.velocity + 1/2 * (initialVelocity + slider.velocity) * 20e-3
}

function hitBorder() {

  if (slider.value < slider.min)
    slider.value = slider.min;

  if (slider.value > slider.max)
    slider.value = slider.max;

}

function updateSlider() {

  slider.value = fall()

  hitBorder()

  // value's width
  document.getElementById("value").style.width = `${slider.value}%`;

  // sliderPointer's position
  const sliderWidth = document.getElementById('slider').offsetWidth;
  document.getElementById('sliderPointer').style.left = `${( slider.value / 100) * sliderWidth}px`;
}

function changeRotation(rotationValue) {
  rotationValue = slider.rotation + rotationValue
  if (Math.abs(rotationValue) >= slider.rotationThreshold)
    return
  slider.rotation = rotationValue
  document.getElementById('slider').style.transform = `rotate(${rotationValue}deg)`;
}

// Main script entry
function main() {
  // so the buttons tilt the slider
  document.getElementById("plus").addEventListener("click", () => {
    changeRotation(slider.rotationStep)
  });
  document.getElementById("minus").addEventListener("click", () => {
    changeRotation(-slider.rotationStep)
  });

  // Make it happen continuously
  setInterval(updateSlider, 20);
}

main()