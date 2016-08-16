var buttons = document.getElementsByTagName('button');
var speed = 6;

for (var i = 0; i < buttons.length; i++) {
  buttons[i].onmousedown = function(e) {
    var e = e || window.event,
    offsetX = e.offsetX,
    offsetY = e.offsetY,
    radiusX = (this.offsetWidth - offsetX > offsetX?this.offsetWidth - offsetX:offsetX),
    radiusY = (this.offsetHeight - offsetY > offsetY?this.offsetHeight - offsetY:offsetY),
    offsetSize = Math.sqrt(Math.pow(radiusX,2) + Math.pow(radiusY,2)),
    inner = document.createElement('div');
    this.appendChild(inner);

    var interval = setInterval(function() {
      inner.style.width = (inner.offsetWidth + speed) + 'px';
      inner.style.height = (inner.offsetHeight + speed) + 'px';
      inner.style.left = (offsetX - inner.offsetWidth / 2) + 'px';
      inner.style.top = (offsetY - inner.offsetHeight / 2) + 'px';
      // 越来越不透明
      inner.style.opacity = inner.offsetWidth/offsetSize/2;

      // 超出范围则不再扩展
      if(inner.offsetWidth >= offsetSize*2 && inner.offsetHeight >= offsetSize*2) {
             clearInterval(interval);
      }

    }, 10);
  }

  buttons[i].onmouseup = function(e) {
    var e = e || window.event,
    this_ = this,
    inner = this.children[0];

    var interval = setInterval(function() {
      inner.style.opacity = inner.style.opacity - speed / this_.offsetWidth;
      if(inner.style.opacity <= 0) {
        try {
          this_.removeChild(inner);
          clearInterval(interval);
        } catch (e){

        }
      }
    }, 10);
  }
}
