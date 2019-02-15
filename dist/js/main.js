"use strict";

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

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
var distanceBetweenContentDots = 130;
var limitDistance = 60;
var numberOfContents = 5;
var contentNameIndex = 0;
var scrollDirection = '';
var contentIndex = 0;
var smallDot = {
  width: 3,
  height: 3
};
var contentDot = {
  width: 4,
  height: 4
};
var contentNames = ['Home', 'About', 'Contact', 'Info', 'More'];

var setLineHeight = function setLineHeight(distance, numberOfContents) {
  document.getElementById('dotContainer').style.height = distance * (numberOfContents - 1) + limitDistance * 2 + 'px';
};

setLineHeight(distanceBetweenContentDots, numberOfContents);

var _loop = function _loop(i) {
  var dot = void 0;

  if (i == 0) {
    dotTop += limitDistance;
  } else {
    dotTop += distanceBetweenContentDots;
  }

  dot = new Element(contentDot.width, contentDot.height, dotTop, 0, ' dot dotContent');
  dot.setAttribute('data-index', '0' + (contentNameIndex + 1));
  dot.setAttribute('data-name', contentNames[contentNameIndex]);
  contentNameIndex++;
  dot.addEventListener('click', function () {
    activateElement(dot);
  });
  dotContainer.appendChild(dot);
};

for (var i = 0; i < numberOfContents; i++) {
  _loop(i);
}

function activateElement(dot) {
  var dots = document.getElementsByClassName('dotContent');

  for (var i = 0; i < dots.length; i++) {
    dots[i].classList.remove('activeDot');
    dot.classList.add('activeDot');
  }
}

var firstDot = document.getElementsByClassName('dotContent')[0].classList.add('activeDot');

function detectMouseWheelDirection(e) {
  var delta = null,
      direction = false;

  if (!e) {
    // if the event is not provided, we get it from the window object
    e = window.event;
  }

  if (e.wheelDelta) {
    // will work in most cases
    delta = e.wheelDelta / 60;
  } else if (e.detail) {
    // fallback for Firefox
    delta = -e.detail / 2;
  }

  if (delta !== null) {
    direction = delta > 0 ? 'up' : 'down';
  }

  return direction;
}

function checkKey(e) {
  e = e || window.event;
  var direction;

  if (e.keyCode == '38') {
    direction = 'up';
  } else if (e.keyCode == '40') {
    direction = 'down';
  }

  return direction;
}

function handleMouseWheelDirection(direction) {
  var currentContentDot = document.getElementsByClassName('activeDot')[0];
  var parentofSelected = currentContentDot.parentNode;
  var children = parentofSelected.childNodes;
  var elementIndex = currentContentDot.getAttribute('data-index');
  contentIndex = Number(elementIndex[elementIndex.length - 1]) - 1;

  if (direction == 'down') {
    contentIndex++;

    if (contentIndex == contentNames.length) {
      contentIndex = 0;
    }
  } else if (direction == 'up') {
    contentIndex--;

    if (contentIndex < 0) {
      contentIndex = contentNames.length - 1;
    }
  }

  console.log(contentIndex);

  for (var i = 0; i < children.length; i++) {
    if (children[i].classList && children[i].getAttribute('data-name') == contentNames[contentIndex]) {
      activateElement(children[i]);
    }
  }
}

document.onmousewheel = function (e) {
  handleMouseWheelDirection(detectMouseWheelDirection(e));
};

document.onkeydown = function (e) {
  handleMouseWheelDirection(checkKey(e));
};

if (window.addEventListener) {
  document.addEventListener('DOMMouseScroll', function (e) {
    handleMouseWheelDirection(detectMouseWheelDirection(e));
  });
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
// $(document).ready(function () {
//     $('.multiple-items').slick({
//         centerMode: true,
//         centerPadding: '60px',
//         slidesToShow: 3,
//         responsive: [{
//                 breakpoint: 768,
//                 settings: {
//                     arrows: false,
//                     centerMode: true,
//                     centerPadding: '40px',
//                     slidesToShow: 3
//                 }
//             },
//             {
//                 breakpoint: 480,
//                 settings: {
//                     arrows: false,
//                     centerMode: true,
//                     centerPadding: '40px',
//                     slidesToShow: 1
//                 }
//             }
//         ]
//     });
// });


var Slider =
/*#__PURE__*/
function () {
  function Slider(elements, centerElementImageClass, centerElementTextClass) {
    _classCallCheck(this, Slider);

    this.elements = document.getElementsByClassName(elements);
    this.centerElementImageClass = centerElementImageClass;
    this.centerElementTextClass = centerElementTextClass;
  }

  _createClass(Slider, [{
    key: "toggleSlide",
    value: function toggleSlide(centerSlideIndex) {
      for (var i = 0; i < this.elements.length; i++) {
        if (this.elements[i].children[0].classList.contains(this.centerElementImageClass)) {
          this.elements[i].children[0].classList.remove(this.centerElementImageClass);
        }

        if (this.elements[i].children[2].classList.contains('works-slider__item__description--center')) {
          this.elements[i].children[2].classList.remove('works-slider__item__description--center');
        }
      }

      var firstSlide = this.elements[centerSlideIndex + 1].outerHTML;
      var secondSlide;
      var thirdSlide = this.elements[centerSlideIndex].outerHTML;

      if (centerSlideIndex == 0) {
        secondSlide = this.elements[centerSlideIndex + 2].outerHTML;
      } else {
        secondSlide = this.elements[centerSlideIndex - 1].outerHTML;
      }

      this.elements[0].outerHTML = firstSlide;
      this.elements[1].outerHTML = secondSlide;
      this.elements[1].children[0].classList.add(this.centerElementImageClass);
      this.elements[1].children[2].classList.add(this.centerElementTextClass);
      this.elements[2].outerHTML = thirdSlide;
    }
  }]);

  return Slider;
}();

var sliderElementClass = "works-slider__item";
var centerElementImageClass = 'works-slider__item__photo--center';
var centerElementTextClass = 'works-slider__item__description--center';
var worksSlider = new Slider(sliderElementClass, centerElementImageClass, centerElementTextClass);
worksSlider.toggleSlide(1);
var nextSlide = document.getElementsByClassName("js--next-slide")[0];
nextSlide.addEventListener("click", function () {
  worksSlider.toggleSlide(1);
});
var prevSlide = document.getElementsByClassName("js--prev-slide")[0];
prevSlide.addEventListener("click", function () {
  worksSlider.toggleSlide(0);
});