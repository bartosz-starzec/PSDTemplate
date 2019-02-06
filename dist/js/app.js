"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Dot =
/*#__PURE__*/
function () {
  function Dot(width, height, top, parent) {
    var contentIndex = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;

    _classCallCheck(this, Dot);

    this.width = width;
    this.height = height;
    this.top = top;
    this.parent = parent;
    this.contentIndex = contentIndex;
  }

  _createClass(Dot, [{
    key: "createDot",
    value: function createDot() {
      var parent = this.parent;
      var dot = document.createElement('div');
      dot.classList = 'dot';
      dot.setAttribute('style', 'top:' + this.top + 'px; width: ' + this.width + 'px; height:' + this.height + 'px;');

      if (this.contentIndex !== null) {
        dot.setAttribute('data-content', contentNames[this.contentIndex]);
      }

      parent.appendChild(dot);
    }
  }, {
    key: "addContentName",
    value: function addContentName(nameIndex) {}
  }]);

  return Dot;
}();

var dotTop = 0;
var dotContainer = document.getElementById('dotContainer');
var numberofDotSpace = 5;
var numberOfContents = 5;
var numberOfDots = numberOfContents * numberofDotSpace;
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

for (var i = 0; i < numberOfDots; i++) {
  var dot = void 0;

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