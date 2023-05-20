const video = document.getElementById('charging-case-video');
const viewportHeight = window.innerHeight;
// Calculate the padding required to center the video vertically in the viewport
const videoPadding = (viewportHeight - video.offsetHeight) / 2;
const secondSection = document.getElementById('second-section');

window.addEventListener('scroll', function () {
  // getBoundingClientRect() is used to get the size and position of the element
  const secondSectionRect = secondSection.getBoundingClientRect();

  if (secondSectionRect.top <= viewportHeight - (videoPadding + video.offsetHeight)) {
    // If the top position of the second section is within the range
    video.classList.add('take-action')
  } else if (secondSectionRect.top <= viewportHeight - (videoPadding - video.offsetHeight)) {
    // If the top position of the second section is within another range
    video.classList.remove('take-action')
    // align the items into the top of the second section
    secondSection.style.alignItems = 'flex-start';
  }

  if (secondSectionRect.bottom <= viewportHeight - videoPadding) {
    video.classList.remove('take-action')
    // align the items into the bottom of the second section
    secondSection.style.alignItems = 'flex-end';
  }
});

function scrollPlay() {
  var playBackSpeed = 200
  var frameNumber = (window.pageYOffset - (sectionHeight - videoPadding)) / playBackSpeed
  video.currentTime = frameNumber;
  window.requestAnimationFrame(scrollPlay);
}
scrollPlay();