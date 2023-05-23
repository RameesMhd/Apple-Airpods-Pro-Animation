const video = document.getElementById('charging-case-video');
const viewportHeight = window.innerHeight;
// Calculate the padding required to center the video vertically in the viewport
const videoPadding = (viewportHeight - video.offsetHeight) / 2;
const secondSection = document.getElementById('second-section');
var playBackSpeed = 300

video.addEventListener('loadedmetadata', function () {
  const videoDuration = video.duration;
  console.log('Video duration:', videoDuration);
  secondSection.style.height = (videoDuration * playBackSpeed) + viewportHeight / 3 + "px";
});

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
  if (window.innerWidth <= 540) {
    var videoPaddingMobile = (window.innerHeight - video.offsetHeight) / 2;
    if (secondSectionRect.top <= videoPaddingMobile) {
      video.classList.add('take-action')
    } else if (secondSectionRect.top <= viewportHeight - (videoPadding - video.offsetHeight)) {
      // If the top position of the second section is within another range
      video.classList.remove('take-action')
      // align the items into the top of the second section
      secondSection.style.alignItems = 'flex-start';
    }

    if (secondSectionRect.bottom <= window.innerHeight - videoPaddingMobile) {
      video.classList.remove('take-action')
      // align the items into the bottom of the second section
      secondSection.style.alignItems = 'flex-end';
    }
    // console.log("secondSectionRect.top", secondSectionRect.top);
  }
});

function scrollPlay() {
  var frameNumber = (window.pageYOffset - (sectionHeight - videoPadding)) / playBackSpeed
  video.currentTime = frameNumber;
  window.requestAnimationFrame(scrollPlay);
}
scrollPlay();