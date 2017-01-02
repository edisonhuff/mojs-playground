// (function(){
  var bursts = [],
      x,
      y,
      x2,
      y2;

  var mouseDownHandler = function(event) {

    console.log(document.getElementById('outer').parentElement.querySelector(':hover'));
    if(document.getElementById('outer').parentElement.querySelector(':hover')) {
      x  = null;
      y  = null;
      x2 = null;
      y2 = null;
      return;
    }
    x = event.x || event.touches[0].pageX;
    y = event.y || event.touches[0].pageY;
    x2 = null;
    y2 = null;
  }

  var touchmoveHandler = function(event) {
    x2 = event.touches[0].pageX;
    y2 = event.touches[0].pageY;
  }

  var addBurst = function(event) {
    if (x === null || y === null) {
      return 
    }

    var d = document.documentElement,
        middleX = d.clientWidth / 2,
        middleY = d.clientHeight / 2;

    x2 = event.x || x2 || x;
    y2 = event.y || y2 || y;

    var angle0 = Math.atan2(x - middleX, middleY - y) * 180 / Math.PI,
        angle1 = Math.atan2(
          x2 - middleX ,
          middleY - y2
        ) * 180 / Math.PI;

    var burst = new mojs.Burst({
      angle: { [angle0]: angle1 },
      count: 6,
      radius: { 135: 400 },
      children: {
        shape: 'circle',
        fill: '#fff',
        stroke: '#fff',
        strokeWidth: { 1: 4 },
      },
      onComplete() { setTimeout(this.replay.bind(this), 1780) },
    });

    bursts.push(burst);
    burst.play();
  }

  var $e = document.getElementById('swirl-touch');
  $e.addEventListener('mousedown', mouseDownHandler);
  $e.addEventListener('touchmove', touchmoveHandler);
  $e.addEventListener('mouseup', addBurst);

// })()