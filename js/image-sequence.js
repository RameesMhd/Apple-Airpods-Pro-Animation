const html = document.documentElement;
const canvas = document.getElementById("hero-lightpass");
const context = canvas.getContext("2d");

const frameCount = 64;
const currentFrame = index => (
  `https://sadectip.sirv.com/Apple%20Airpods/Airpods/${index.toString().padStart(4, '0')}.png`
)

const preloadImages = () => {
  for (let i = 1; i < frameCount; i++) {
    const img = new Image();
    img.src = currentFrame(i);
  }
};


/*  Update the canvas  */

window.addEventListener("resize", () => updateCanvas());
const updateCanvas = () => {
  const width = window.innerWidth;
  canvas.width = width
  canvas.height = width * (9 / 16);
  // context.drawImage(img, 0, 0, canvas.width, canvas.height);
}

updateCanvas()

const img = new Image();

img.src = currentFrame(1);
img.onload = function () {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(img, 0, 0, canvas.width, canvas.height);
}

const updateImage = index => {
  img.src = currentFrame(index);
}

var sectionHeight = document.getElementById('image-sequence').offsetHeight;
console.log("sectionHeight", sectionHeight);

window.addEventListener('scroll', () => {
  const scrollTop = html.scrollTop;
  const maxScrollTop = sectionHeight - window.innerHeight;

  const scrollFraction = scrollTop / maxScrollTop;
  // console.log("maxScrollTop",maxScrollTop);
  const frameIndex = Math.min(
    frameCount - 1,
    Math.ceil(scrollFraction * frameCount)
  );
  requestAnimationFrame(() => updateImage(frameIndex + 1))
});

preloadImages()


var container = document.querySelector('#image-sequence');
var header = container.querySelector('h1');
var title = container.querySelector('h3');
var prevScrollPos = window.pageYOffset;

window.addEventListener('scroll', function () {
  var scrollPosition = window.scrollY;
  var containerHeight = container.offsetHeight;
  var opacity = 1 - (scrollPosition / (containerHeight - window.innerHeight));

  var maxScale = 1.2;
  var scale = 1 + (scrollPosition / (containerHeight - window.innerHeight)) * (maxScale - 1);
  header.style.transform = 'scale(' + Math.min(scale, maxScale) + ')';
  header.style.opacity = opacity < 0 ? 0 : opacity;
  title.style.opacity = opacity < 0 ? 0 : opacity;
});

