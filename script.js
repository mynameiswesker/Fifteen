      var minBlock = document.querySelector('.min');
      var secBlock = document.querySelector('.sec');
      var steps = document.querySelector('.steps');
      var count = 0;
      var container = document.getElementById('container');
      var box = container.appendChild(document.createElement('div'));
      box.className = 'box';

      window.addEventListener('keydown', handler);
      window.addEventListener('keydown',getTimePoint);
      window.addEventListener('keydown',displayTimer);

var fifteen = {

    Move: {up: -4, left: -1, down: 4, right: 1},

    order: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].sort(function() { return Math.random()-.5; }).concat(0),

    hole: 15,

    isCompleted: function() { 
        return !this.order.some(function(item, i) { return item > 0 && item-1 !== i; }); 
    },

    go: function(move) {
      var index = this.hole + move;
      if (!this.order[index]) return false;
      if (move == fifteen.Move.left || move == fifteen.Move.right)
        if (Math.floor(this.hole/4) !== Math.floor(index/4)) return false;
      this.swap(index, this.hole);
      this.hole = index;
      return true; },

    swap: function(i1, i2) { var t = this.order[i1]; this.order[i1] = this.order[i2]; this.order[i2] = t; },

    isDecide: function(a) {
      for (var kDisorder = 0, i = 1, len = a.length-1; i < len; i++)
        for (var j = i-1; j >= 0; j--) if (a[j] > a[i]) kDisorder++;
      return !(kDisorder % 2); } 
};

  if (!fifteen.isDecide(fifteen.order)) fifteen.swap(0, 1);

  for (var i = 0; i < 16; i++) box.appendChild(document.createElement('div'));

  function handler(e) {
    if (fifteen.go(fifteen.Move[{39: 'left', 37: 'right', 40: 'up', 38: 'down'}[e.keyCode]])) {
      draw();
      countSteps(e); 
      if (fifteen.isCompleted()) {
        box.style.backgroundColor = "gold";
        window.removeEventListener('keydown', handler); 
        stopTimer();
      } 
      }
    };

  function draw() {
    for (var i = 0, tile; tile = box.childNodes[i], i < 16; i++) {
      tile.textContent = fifteen.order[i]; tile.style.visibility = fifteen.order[i]? 'visible' : 'hidden'; } 
};

      draw();


//Таймер
        
function getTimePoint(){//начальное время
  window.removeEventListener('keydown',getTimePoint);
  return smallDate = new Date;
}

function calculateTime(){
  var bigDate = new Date;
  timer = new Date(bigDate-smallDate);
  minutes = timer.getMinutes();
  seconds = timer.getSeconds();

  if(seconds<10){
    seconds = '0'+seconds;
  }

  if(minutes<10){
    minutes = '0'+minutes;
  }

  print();
  
}
             
function displayTimer(){
  window.removeEventListener('keydown',displayTimer);
  timerId = setInterval(calculateTime,1000);
}

function print(){
  minBlock.textContent = minutes;
  secBlock.textContent = seconds;
}

function stopTimer(){
  window.removeEventListener('keydown',stopTimer);
  clearInterval(timerId);
}

function countSteps(e){
  if(e){
    count++;
    steps.textContent = count;
  }
}

