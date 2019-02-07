"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Element = function Element(width, height, top, left, classes) {
  _classCallCheck(this, Element);

  var element = document.createElement('div');
  element.classList = classes;
  element.setAttribute('style', 'top:' + top + 'px; left: ' + left + 'px; width: ' + width + 'px; height:' + height + 'px;');
  return element;
};

var dotTop = 0;
var dotContainer = document.getElementById('dotContainer');
var distanceBetweenContentDots = 5;
var numberOfContents = 5;
var numberOfDots = numberOfContents * distanceBetweenContentDots;
var numberOfContentDots = Math.round(numberOfDots / numberOfContents);
var bigDotPoint = 2;
var contentNameIndex = 0;
var smallDot = {
  width: 3,
  height: 3
};
var contentDot = {
  width: 6,
  height: 6
};
var contentNames = ['Home', 'About', 'Contact', 'Info', 'More'];

var _loop = function _loop(i) {
  var dot = void 0;

  if (i == 0) {
    dotTop += 15;
  } else {
    dotTop += 30;
  }

  if (i == bigDotPoint) {
    dot = new Element(contentDot.width, contentDot.height, dotTop, 0, ' dot dotContent');
    dot.setAttribute('data-index', '0' + (contentNameIndex + 1));
    dot.setAttribute('data-name', contentNames[contentNameIndex]);
    contentNameIndex++;
    dot.addEventListener('click', function () {
      activateElement(dot);
    });
    bigDotPoint += numberOfContentDots;
  } else {
    dot = new Element(smallDot.width, smallDot.height, dotTop, 0, 'dot');
  }

  dotContainer.appendChild(dot);
};

for (var i = 0; i < numberOfDots; i++) {
  _loop(i);
}

var firstDot = document.getElementsByClassName('dotContent')[0].classList.add('activeDot');

function activateElement(dot) {
  var dots = document.getElementsByClassName('dotContent');

  for (var i = 0; i < dots.length; i++) {
    dots[i].classList.remove('activeDot');
    dot.classList.add('activeDot');
  }
} // var xmlhttp = new XMLHttpRequest();
// xmlhttp.onreadystatechange = function() {
//   if (xmlhttp.readyState == XMLHttpRequest.DONE) {
//     if (xmlhttp.status == 200) {
//        console.log(xmlhttp.responseText);
//       }
//     }
//   };
// xmlhttp.open("GET", "src/images", true);
// xmlhttp.send();