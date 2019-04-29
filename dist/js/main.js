"use strict";

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var dotTopMargin = 0;
var dotContainer = document.getElementById("dotContainer"); // DOM Element which contains all content dots

var distanceBetweenContentDots = 130; // distance between dots in pixels

var marginalValue = 60; // marginal distance between first/last dot and edge of the line

var numberOfContents = 5;
var contentNameIndex = 1;
var scrollDirection = "";
var currentContentIndex = 0;
var hamburgerButton = document.querySelector(".hamburger");
var dots = document.getElementsByClassName("dotContent");
var navbarClass = "navbar";
var activeNavbarClass = "active-navbar";
var wrapperClass = "wrapper";
var wrapperOpacityClass = "wrapperLowOpacity";

var Element = function Element(width, height, top, left, classes) {
  _classCallCheck(this, Element);

  var element = document.createElement("div");
  element.classList = classes;
  element.setAttribute("style", "top:" + top + "px; left: " + left + "px; width: " + width + "px; height:" + height + "px;");
  return element;
};

var Slider =
/*#__PURE__*/
function () {
  function Slider(elements, centerElementClass) {
    _classCallCheck(this, Slider);

    this.elements = document.getElementsByClassName(elements);
    this.centerElementClass = centerElementClass;
  }

  _createClass(Slider, [{
    key: "toggleSlide",
    value: function toggleSlide(centerSlideIndex) {
      for (var i = 0; i < this.elements.length; i++) {
        if (this.elements[i].classList.contains(this.centerElementClass)) {
          this.elements[i].classList.remove(this.centerElementClass);
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
      this.elements[1].classList.add(this.centerElementClass);
      this.elements[2].outerHTML = thirdSlide;
    }
  }]);

  return Slider;
}();

var contentDot = {
  width: 4,
  height: 4
};
var contentNames = ["Home", "Works", "About", "Contact", "Hire-us"];

var hamburgerEngine = function hamburgerEngine(hamburgerButton, navbarClass, activeNavbarClass, wrapperClass, wrapperOpacityClass) {
  hamburgerButton.addEventListener("click", function () {
    document.querySelector("." + navbarClass + "").classList.toggle(activeNavbarClass);
    document.querySelector("." + wrapperClass + "").classList.toggle(wrapperOpacityClass);
  });
};

var setLineHeight = function setLineHeight(distance, numberOfContents) {
  document.getElementById("dotContainer").style.height = distance * (numberOfContents - 1) + marginalValue * 2 + "px";
};

var createDots = new Promise(function (resolve, reject) {
  for (var i = 0; i < numberOfContents; i++) {
    var dot = void 0;

    if (i == 0) {
      dotTopMargin += marginalValue;
    } else {
      dotTopMargin += distanceBetweenContentDots;
    }

    dot = new Element(contentDot.width, contentDot.height, dotTopMargin, 0, " dot dotContent js--nav-element");
    dot.setAttribute("data-index", "0" + contentNameIndex);
    dot.setAttribute("data-name", contentNames[contentNameIndex - 1]);
    contentNameIndex++;
    dotContainer.appendChild(dot);
  }

  var result = dotContainer.children.length;
  resolve(result);
});

var navigationEngine = function navigationEngine() {
  createDots.then(function (value) {
    if (value === numberOfContents) {
      (function () {
        var navElements = document.querySelectorAll(".js--nav-element");

        var _loop = function _loop(i) {
          navElements[i].addEventListener("click", function () {
            activateElement(navElements[i].getAttribute("data-name"));
          });
        };

        for (var i = 0; i < navElements.length; i++) {
          _loop(i);
        }
      })();
    }
  });
}; // activate proper dot-content and show its content


function activateElement(section_name) {
  document.getElementsByClassName("active-section")[0].classList.remove("active-section");
  var elem = document.querySelectorAll(".activeDot");

  for (var i = 0; i < elem.length; i++) {
    elem[i].classList.remove("activeDot");
  }

  var el = document.querySelectorAll('[data-name="' + section_name + '"]');

  for (var _i = 0; _i < el.length; _i++) {
    el[_i].classList.add("activeDot");
  }

  document.getElementsByClassName("section-" + section_name)[0].classList.add("active-section");
} // detect direction of mouse scroll


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
    direction = delta > 0 ? "up" : "down";
  }

  return direction;
} // check which key is pressed


function checkKey(e) {
  e = e || window.event;
  var direction;

  if (e.keyCode == "38") {
    direction = "up";
  } else if (e.keyCode == "40") {
    direction = "down";
  }

  return direction;
}

var handleMouseWheelDirection = function handleMouseWheelDirection(direction, contentIndex) {
  contentIndex = contentIndex;

  if (direction == "down") {
    contentIndex++;

    if (contentIndex == contentNames.length) {
      contentIndex = 0;
    }
  } else if (direction == "up") {
    contentIndex--;

    if (contentIndex < 0) {
      contentIndex = contentNames.length - 1;
    }
  }

  switchContentLine(contentIndex);
};

var getCurrentContentIndex = function getCurrentContentIndex() {
  var currentContentDot = getCurrentContentDot();
  var elementIndex = currentContentDot.getAttribute("data-index");
  currentContentIndex = Number(elementIndex[elementIndex.length - 1]) - 1;
  return currentContentIndex;
};

var getCurrentContentDot = function getCurrentContentDot() {
  return document.getElementsByClassName("dot activeDot")[0];
};

var switchContentLine = function switchContentLine(contentIndex) {
  var currentContentDot = getCurrentContentDot();
  var parentOfSelected = currentContentDot.parentNode;
  var children = parentOfSelected.childNodes;

  for (var i = 0; i < children.length; i++) {
    if (children[i].classList && children[i].getAttribute("data-name") == contentNames[contentIndex]) {
      activateElement(children[i].getAttribute("data-name"));
    }
  }
}; // handle content line on scroll


document.onmousewheel = function (e) {
  handleMouseWheelDirection(detectMouseWheelDirection(e), getCurrentContentIndex());
}; // check what key was pressed and handle content line if needed


document.onkeydown = function (e) {
  handleMouseWheelDirection(checkKey(e), getCurrentContentIndex());
};

if (window.addEventListener) {
  document.addEventListener("DOMMouseScroll", function (e) {
    handleMouseWheelDirection(detectMouseWheelDirection(e));
  });
}

var firstDot = document.getElementsByClassName("dotContent")[0].classList.add("activeDot");
var sliderElementClass = "works-slider__item";
var centerElementClass = "works-slider__item--center";
var worksSlider = new Slider(sliderElementClass, centerElementClass);
worksSlider.toggleSlide(1);
var nextSlide = document.getElementsByClassName("js--next-slide")[0];
nextSlide.addEventListener("click", function () {
  worksSlider.toggleSlide(1);
});
var prevSlide = document.getElementsByClassName("js--prev-slide")[0];
prevSlide.addEventListener("click", function () {
  worksSlider.toggleSlide(0);
});
var optionClassName = document.getElementsByClassName("options-item");

var checkOption = function checkOption(event, className) {
  event.target.classList.toggle(className);
};

var optionsEngine = function optionsEngine(optionClassName) {
  for (var i = 0; i < optionClassName.length; i++) {
    optionClassName[i].addEventListener("click", function () {
      checkOption(event, "options-item--checked");
    }, false);
  }
};

var isEmptyInput = function isEmptyInput() {
  this.classList.remove("has-value");

  if (this.value !== "") {
    this.classList.add("has-value");
  }
};

var inputs = document.getElementsByClassName("js--form-input");

var manageInputs = function manageInputs(inputs) {
  for (var i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener("change", isEmptyInput, false);
    inputs[i].addEventListener("keyup", isEmptyInput, false);
  }
};

var closeMenuOnClickOutside = function closeMenuOnClickOutside(navbar, wrapper, navbarActive, wrapperOpacity) {
  document.addEventListener("click", function (event) {
    var navbarDOM = document.querySelector("." + navbar + "");
    var wrapperDOM = document.querySelector("." + wrapper + "");

    if (event.target.tagName == "BODY" && navbarDOM.classList.contains(navbarActive)) {
      navbarDOM.classList.remove(navbarActive);
      wrapperDOM.classList.remove(wrapperOpacity);
    }
  });
};

window.onload = function () {
  setLineHeight(distanceBetweenContentDots, numberOfContents);
  navigationEngine();
  manageInputs(inputs);
  closeMenuOnClickOutside(navbarClass, wrapperClass, activeNavbarClass, wrapperOpacityClass);
  hamburgerEngine(hamburgerButton, navbarClass, activeNavbarClass, wrapperClass, wrapperOpacityClass);
  optionsEngine(optionClassName);
};