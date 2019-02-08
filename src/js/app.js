class Element {
    constructor(width, height, top, left, classes) {
        const element = document.createElement('div');
        element.classList = classes;
        element.setAttribute('style', 'top:' + top + 'px; left: ' + left + 'px; width: ' + width + 'px; height:' + height + 'px;');
        return element;
    }
}

let dotTop = 0;
const dotContainer = document.getElementById('dotContainer');
const distanceBetweenContentDots = 4;
const numberOfContents = 5;
const numberOfDots = numberOfContents * distanceBetweenContentDots;
const numberOfContentDots = Math.round(numberOfDots / numberOfContents);
let bigDotPoint = 2;
let contentNameIndex = 0;
let scrollDirection = '';
let contentIndex = 0;


const smallDot = {
    width: 3,
    height: 3
}

const contentDot = {
    width: 4,
    height: 4
}

const contentNames = [
    'Home',
    'About',
    'Contact',
    'Info',
    'More' 
]

for (let i = 0; i < numberOfDots; i++) {

    let dot;

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
}


function activateElement(dot) {
    const dots = document.getElementsByClassName('dotContent');
    for (let i = 0; i < dots.length; i++) {
        dots[i].classList.remove('activeDot');
        dot.classList.add('activeDot');
    }
}

const firstDot = document.getElementsByClassName('dotContent')[0].classList.add('activeDot');

function detectMouseWheelDirection(e) {
    var delta = null,
        direction = false;
    if (!e) { // if the event is not provided, we get it from the window object
        e = window.event;
    }
    if (e.wheelDelta) { // will work in most cases
        delta = e.wheelDelta / 60;
    } else if (e.detail) { // fallback for Firefox
        delta = -e.detail / 2;
    }
    if (delta !== null) {
        direction = delta > 0 ? 'up' : 'down';
    }

    return direction;
}

function handleMouseWheelDirection(direction) {
    let currentContentDot = document.getElementsByClassName('activeDot')[0];
    var parentofSelected = currentContentDot.parentNode;
    var children = parentofSelected.childNodes;
    let elementIndex = currentContentDot.getAttribute('data-index');
    contentIndex = Number(elementIndex[elementIndex.length - 1]) - 1;


    if (direction == 'down') {
        contentIndex++;
        if (contentIndex == contentNames.length) {
            contentIndex = 0;
        }

    } else if (direction == 'up') {
        contentIndex--;
        if (contentIndex < 0) {
            contentIndex = (contentNames.length - 1);
        }
    }
    console.log(contentIndex);

    for (var i = 0; i < children.length; i++) {
        if (children[i].classList && (children[i].getAttribute('data-name') == contentNames[contentIndex])) {
            activateElement(children[i]);
        }
    }
}

document.onmousewheel = function (e) {
    handleMouseWheelDirection(detectMouseWheelDirection(e));
};

if (window.addEventListener) {
    document.addEventListener('DOMMouseScroll', function (e) {
        handleMouseWheelDirection(detectMouseWheelDirection(e));
    });
}
// var xmlhttp = new XMLHttpRequest();

// xmlhttp.onreadystatechange = function() {
//   if (xmlhttp.readyState == XMLHttpRequest.DONE) {
//     if (xmlhttp.status == 200) {
//        console.log(xmlhttp.responseText);
//       }
//     }
//   };

// xmlhttp.open("GET", "src/images", true);
// xmlhttp.send();