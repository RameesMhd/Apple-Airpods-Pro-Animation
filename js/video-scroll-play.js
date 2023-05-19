var secondSection = document.getElementById('second-section')
var secondSectionHeight = secondSection.offsetTop;
const firstSectionHeight = document.getElementById('first-section').offsetHeight;
const video = document.getElementById('charging-case-video');

window.addEventListener('scroll', function () {
  const scrollTrigger = document.getElementById('second-section');
  const scrollTriggerRect = scrollTrigger.getBoundingClientRect();
  const viewportHeight = window.innerHeight;

  videoPadding = (viewportHeight - video.offsetHeight) / 2;
  console.log("height of the viewport",viewportHeight);
  console.log("height of the video",videoPadding);
  if (scrollTriggerRect.top <= viewportHeight  - (videoPadding + video.offsetHeight)) {
    // If the scroll-trigger div reaches the middle of the viewport
    // set the video position to the center of the viewport
    video.style.position = 'fixed';
    video.style.top = '50%';
    video.style.left = '50%';
    video.style.transform = 'translate(-50%, -50%)';
  } else if (scrollTriggerRect.top <= viewportHeight  - (videoPadding - video.offsetHeight)){
    // Otherwise, reset the video position
    video.style.position = '';
    video.style.top = '';
    video.style.left = '';
    video.style.transform = ''
    secondSection.style.alignItems = 'flex-start';
  }
  if (scrollTriggerRect.bottom <= viewportHeight - videoPadding){
    video.style.position = '';
    video.style.top = '';
    video.style.left = '';
    video.style.transform = ''
    console.log("Bottom reached");
    video.style.position = '';
    secondSection.style.alignItems = 'flex-end';
  }
});

function scrollPlay() {
  console.log("ScrollPLay Working");
  var frameNumber  = (window.pageYOffset - sectionHeight) / 300
  video.currentTime  = frameNumber;
  window.requestAnimationFrame(scrollPlay);
}
scrollPlay();