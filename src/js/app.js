class Dot {
    constructor(width, height, top, parent, contentIndex = null) {
        this.width = width;
        this.height = height;
        this.top = top;
        this.parent = parent;
        this.contentIndex = contentIndex;
    }

    createDot() {
        const parent = this.parent;
        const dot = document.createElement('div');
        dot.classList = 'dot';
        dot.setAttribute('style', 'top:' + this.top + 'px; width: ' + this.width + 'px; height:' + this.height + 'px;');
        if (this.contentIndex !== null) {
            dot.setAttribute('data-content', contentNames[this.contentIndex]);
        }
        parent.appendChild(dot);
    }

    addContentName(nameIndex) {
        
    }

}

let dotTop = 0;
const dotContainer = document.getElementById('dotContainer');
const numberofDotSpace = 5;
const numberOfContents = 5;
const numberOfDots = numberOfContents * numberofDotSpace;
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
        dot = new Dot(contentDot.width, contentDot.height, dotTop, document.getElementById('dotContainer'), contentNameIndex);
        contentNameIndex++;
        bigDotPoint += numberOfContentDots;
    } else {
        dot = new Dot(smallDot.width, smallDot.height, dotTop, document.getElementById('dotContainer'));
    }
    dot.createDot();
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