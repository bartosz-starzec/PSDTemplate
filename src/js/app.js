class Element  {
    constructor (width, height, top, left, classes) {
        const element = document.createElement('div');
        element.classList = classes;
        element.setAttribute('style', 'top:' + top + 'px; left: ' + left + 'px; width: ' + width + 'px; height:' + height + 'px;');
        return element;
    }
}

let dotTop = 0;
const dotContainer = document.getElementById('dotContainer');
const distanceBetweenContentDots = 5;
const numberOfContents = 5;
const numberOfDots = numberOfContents * distanceBetweenContentDots;
const numberOfContentDots = Math.round(numberOfDots / numberOfContents);
let bigDotPoint = 2;
let contentNameIndex = 0;

const smallDot = {
    width: 3,
    height: 3
}

const contentDot = {
    width: 6,
    height: 6
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
        dot.addEventListener('click', function() {
            activateElement(dot)
        });
        bigDotPoint += numberOfContentDots;
    } else {
        dot = new Element(smallDot.width, smallDot.height, dotTop, 0, 'dot');
    }
    dotContainer.appendChild(dot);
}

const firstDot = document.getElementsByClassName('dotContent')[0].classList.add('activeDot');

function activateElement(dot) {
    const dots = document.getElementsByClassName('dotContent');
    for (let i = 0; i < dots.length; i++) {
        dots[i].classList.remove('activeDot');
        dot.classList.add('activeDot');
    }
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