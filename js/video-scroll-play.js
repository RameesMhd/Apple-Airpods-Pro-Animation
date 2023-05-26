const video = document.getElementById('charging-case-video');
const maskVideo = document.getElementById('maskVideo');

const viewportHeight = window.innerHeight;
// Calculate the padding required to center the video vertically in the viewport
const videoPadding = (viewportHeight - video.offsetHeight) / 2;
const secondSection = document.getElementById('second-section');
const thirdSection = document.getElementById('third-section');
var playBackSpeed = 300

video.addEventListener('loadedmetadata', function () {
  const videoDuration = video.duration;
  secondSection.style.height = (videoDuration * playBackSpeed) + viewportHeight / 3 + "px";
});

window.addEventListener('scroll', function () {
  // getBoundingClientRect() is used to get the size and position of the element
  const secondSectionRect = secondSection.getBoundingClientRect();
  const thirdSectionRect = thirdSection.getBoundingClientRect();
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
  // ****************************************************
  // *************** Video Masking Section **************
  // ****************************************************
  const wrapper = document.getElementById('wrapper')
  var maskImage = document.getElementById('svgMask')
  var border = document.getElementById('border')

  if (thirdSectionRect.top <= 0) {
    maskVideo.classList.add('take-action')
    maskImage.style.cssText = 'position: fixed; left: 20%; right: 20%; top: 30%;';;
    border.style.position = 'fixed';

    maxScale = 8
    var scale = 1 + ((thirdSectionRect.top * thirdSectionRect.top) / (- thirdSectionRect.top)) / 100;

    maskImage.style.transform = 'scale(' + Math.min(scale, maxScale) + ')';
    border.style.width = 60 * scale + 'vh'
    border.style.height = 25 * scale + 'vh'

    maskImage.style.opacity = (scale >= maxScale / 2) ? '0.5' : '1';
    maskImage.style.opacity = (scale >= maxScale) ? '0' : 1
    maskVideo.style.width = (scale >= maxScale) ? (window.innerWidth / scale) + 'vh' : '';
  }
  else {
    maskVideo.classList.remove('take-action')
  }

  if (thirdSectionRect.top >= 0) {
    maskImage.style.position = '';
    border.style.position = '';
  }

  if (((window.innerHeight - maskVideo.offsetHeight) / 2) + maskVideo.offsetHeight >= thirdSectionRect.bottom) {
    maskVideo.classList.remove('take-action')
    thirdSection.style.cssText = 'display: flex; align-items: flex-end;';
    border.style.display = 'none';
    maskImage.style.display = 'none';

  } else {
    thirdSection.style.alignItems = 'flex-start'
    border.style.display = 'block';
  }

  // *****************************************************************
  // *************  Chnages for Mobile screens ***********************
  // *****************************************************************
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