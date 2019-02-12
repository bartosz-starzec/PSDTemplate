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
  function Slider(elements, slideIndex) {
    _classCallCheck(this, Slider);

    this.elements = elements;
    this.slideIndex = slideIndex;
  }

  _createClass(Slider, [{
    key: "showSlides",
    value: function showSlides(centerSlideIndex) {
      for (var i = 0; i < this.elements.length; i++) {
        this.elements[i].style.color = "white";
      }

      console.log(this.slideIndex);
      var firstSlide = this.elements[this.slideIndex + 1].innerHTML;
      var secondSlide;
      var thirdSlide = this.elements[this.slideIndex].innerHTML;

      if (centerSlideIndex == 0) {
        secondSlide = this.elements[this.slideIndex + 2].innerHTML;
        this.elements[this.slideIndex].innerHTML = firstSlide;
        this.elements[this.slideIndex + 1].innerHTML = secondSlide;
        this.elements[this.slideIndex + 2].innerHTML = thirdSlide;
      } else {
        secondSlide = this.elements[this.slideIndex - 1].innerHTML;
        this.elements[this.slideIndex + 1].innerHTML = thirdSlide; // last slide

        this.elements[this.slideIndex].innerHTML = secondSlide; // center

        this.elements[this.slideIndex - 1].innerHTML = firstSlide; //first slide
      }
    }
  }, {
    key: "plusDivs",
    value: function plusDivs(n) {
      this.showSlides(this.slideIndex = n);
    }
  }]);

  return Slider;
}();

var sliderElements = document.getElementsByClassName("slider");
var worksSlider = new Slider(sliderElements, 2); // worksSlider.showSlides(1);

var nextSlide = document.getElementsByClassName("js--next-slide")[0];
nextSlide.addEventListener("click", function () {
  worksSlider.plusDivs(1);
});
var prevSlide = document.getElementsByClassName("js--prev-slide")[0];
prevSlide.addEventListener("click", function () {
  worksSlider.plusDivs(0);
}); // var slideIndex = 1;
// showDivs(slideIndex);
// function plusDivs(n) {
//   showDivs(slideIndex += n);
// }
// function showDivs(n) {
//   var i;
//   var x = document.getElementsByClassName("slider");
//   if (n > x.length) {slideIndex = 1} 
//   if (n < 1) {slideIndex = x.length} ;
//   for (i = 0; i < x.length; i++) {
//     x[i].style.display = "none"; 
//   }
//   x[slideIndex-1].style.display = "block"; 
// }
// function plusDivs(n) {
//     showDivs(slideIndex += n);
// }
// function showDivs(n) {
//     var i;
//     var x = document.getElementsByClassName("slider");
//     if (n > x.length) {
//         slideIndex = 1
//     }
//     if (n < 1) {
//         slideIndex = x.length
//     }
//     for (i = 0; i < x.length; i++) {
//         x[i].style.color = "white";
//     }
//     x[slideIndex - 1].style.color = "red";
// }