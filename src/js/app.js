let dotTopMargin = 0;
const dotContainer = document.getElementById("dotContainer"); // DOM Element which contains all content dots
const distanceBetweenContentDots = 130;
const marginalValue = 60;
const numberOfContents = 5;
let contentNameIndex = 1;
let scrollDirection = "";
let contentIndex = 0;

const dots = document.getElementsByClassName("dotContent");

class Element {
  constructor(width, height, top, left, classes) {
    const element = document.createElement("div");
    element.classList = classes;
    element.setAttribute(
      "style",
      "top:" +
        top +
        "px; left: " +
        left +
        "px; width: " +
        width +
        "px; height:" +
        height +
        "px;"
    );
    return element;
  }
}

class Slider {
  constructor(elements, centerElementClass) {
    this.elements = document.getElementsByClassName(elements);
    this.centerElementClass = centerElementClass;
  }

  toggleSlide(centerSlideIndex) {
    for (let i = 0; i < this.elements.length; i++) {
      if (this.elements[i].classList.contains(this.centerElementClass)) {
        this.elements[i].classList.remove(this.centerElementClass);
      }
    }
    const firstSlide = this.elements[centerSlideIndex + 1].outerHTML;
    let secondSlide;
    const thirdSlide = this.elements[centerSlideIndex].outerHTML;

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
}

const contentDot = {
  width: 4,
  height: 4
};

const contentNames = ["Home", "Works", "About", "Contact", "Hire-us"];

const setLineHeight = (distance, numberOfContents) => {
  document.getElementById("dotContainer").style.height =
    distance * (numberOfContents - 1) + marginalValue * 2 + "px";
};

setLineHeight(distanceBetweenContentDots, numberOfContents);

for (let i = 0; i < numberOfContents; i++) {
  let dot;

  if (i == 0) {
    dotTopMargin += marginalValue;
  } else {
    dotTopMargin += distanceBetweenContentDots;
  }

  dot = new Element(
    contentDot.width,
    contentDot.height,
    dotTopMargin,
    0,
    " dot dotContent"
  );
  dot.setAttribute("data-index", "0" + contentNameIndex);
  dot.setAttribute("data-name", contentNames[contentNameIndex - 1]);
  contentNameIndex++;
  dot.addEventListener("click", function() {
    activateElement(dot);
  });
  dotContainer.appendChild(dot);
}

// activate proper dot-content and show its content
function activateElement(section_name) {
  document
    .getElementsByClassName("active-section")[0]
    .classList.remove("active-section");
  let elem = document.querySelectorAll(".activeDot");
  for (let i = 0; i < elem.length; i++) {
    elem[i].classList.remove("activeDot");
  }
  let el = document.querySelectorAll('[data-name="' + section_name + '"]');
  for (let i = 0; i < el.length; i++) {
    el[i].classList.add("activeDot");
  }
  document
    .getElementsByClassName("section-" + section_name)[0]
    .classList.add("active-section");
}

const firstDot = document
  .getElementsByClassName("dotContent")[0]
  .classList.add("activeDot");

// detect direction of mouse scroll
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
}

// check which key is pressed
function checkKey(e) {
  e = e || window.event;
  let direction;

  if (e.keyCode == "38") {
    direction = "up";
  } else if (e.keyCode == "40") {
    direction = "down";
  }

  return direction;
}

function handleMouseWheelDirection(direction) {
  let currentContentDot = document.getElementsByClassName("dot activeDot")[0];
  var parentOfSelected = currentContentDot.parentNode;
  var children = parentOfSelected.childNodes;
  let elementIndex = currentContentDot.getAttribute("data-index");
  contentIndex = Number(elementIndex[elementIndex.length - 1]) - 1;

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

  for (var i = 0; i < children.length; i++) {
    if (
      children[i].classList &&
      children[i].getAttribute("data-name") == contentNames[contentIndex]
    ) {
      activateElement(children[i].getAttribute("data-name"));
    }
  }
}

// handle content line on scroll
document.onmousewheel = function(e) {
  handleMouseWheelDirection(detectMouseWheelDirection(e));
};

// check what key was pressed and handle content line if needed
document.onkeydown = function(e) {
  handleMouseWheelDirection(checkKey(e));
};

if (window.addEventListener) {
  document.addEventListener("DOMMouseScroll", function(e) {
    handleMouseWheelDirection(detectMouseWheelDirection(e));
  });
}

const sliderElementClass = "works-slider__item";
const centerElementClass = "works-slider__item--center";

const worksSlider = new Slider(sliderElementClass, centerElementClass);
worksSlider.toggleSlide(1);
const nextSlide = document.getElementsByClassName("js--next-slide")[0];
nextSlide.addEventListener("click", function() {
  worksSlider.toggleSlide(1);
});

const prevSlide = document.getElementsByClassName("js--prev-slide")[0];
prevSlide.addEventListener("click", function() {
  worksSlider.toggleSlide(0);
});

const classname = document.getElementsByClassName("options-item");

const checkOption = function(event, className) {
  event.target.classList.toggle(className);
};

for (let i = 0; i < classname.length; i++) {
  classname[i].addEventListener(
    "click",
    function() {
      checkOption(event, "options-item--checked");
    },
    false
  );
}

const isEmptyInput = function() {
  this.classList.remove("has-value");
  if (this.value !== "") {
    this.classList.add("has-value");
  }
};

const inputs = document.getElementsByClassName("js--form-input");

for (let i = 0; i < inputs.length; i++) {
  inputs[i].addEventListener("change", isEmptyInput, false);
  inputs[i].addEventListener("keyup", isEmptyInput, false);
}
