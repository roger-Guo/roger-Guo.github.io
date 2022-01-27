var WINDOW_WIDTH,
    WINDOW_HEIGHT,
    RADIUS,
    MARGIN_LEFT,
    MARGIN_TOP,
    Heart_SIZE
    ;

var balls = [];
var colors = ['#CC543A', '#FB966E', '#F05E1C', '#FFB11B', '#DDD23B', '#91B493', '#86C166', '#66BAB7', '#7B90D2', '#B28FCE'];
var currentShowTimeSeconds = getTimeRemaining(new Date(), moment("2022-10-16 00:00:00").valueOf());

window.onload = function () {
    // self responsive
    WINDOW_WIDTH = window.innerWidth || 1000;
    WINDOW_HEIGHT = window.innerHeight || 1000;
    RADIUS = (Math.round(WINDOW_WIDTH * 4 / 5 / 108) - 1) * 0.75;
    MARGIN_LEFT = Math.round(WINDOW_WIDTH / 25);
    MARGIN_TOP = Math.round(WINDOW_HEIGHT / 10) - 2 * 5 * (RADIUS+1);
    console.log(WINDOW_WIDTH, WINDOW_HEIGHT, MARGIN_TOP, RADIUS);
    Heart_SIZE = 0.42;

    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');

    canvas.width = WINDOW_WIDTH;
    canvas.height = WINDOW_HEIGHT;

    var myInterval = setInterval(function () {
        render(context);
        update();
    }, 50);
}

function render (ctx) {
    ctx.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);
    var { days, hours, minutes, seconds } = currentShowTimeSeconds;

    renderDigit(MARGIN_LEFT, MARGIN_TOP, parseInt(days / 100), ctx);
    renderDigit(MARGIN_LEFT + 15*(RADIUS+1), MARGIN_TOP, parseInt((days % 100) / 10), ctx);
    renderDigit(MARGIN_LEFT + 30*(RADIUS+1), MARGIN_TOP, parseInt(days % 10), ctx);
    renderDigit(MARGIN_LEFT + 45*(RADIUS+1), MARGIN_TOP, 10, ctx);
    renderDigit(MARGIN_LEFT + 54*(RADIUS+1), MARGIN_TOP, parseInt(hours / 10), ctx);
    renderDigit(MARGIN_LEFT + 69*(RADIUS+1), MARGIN_TOP, parseInt(hours % 10), ctx);
    renderDigit(MARGIN_LEFT + 84*(RADIUS+1), MARGIN_TOP, 10, ctx);
    renderDigit(MARGIN_LEFT + 93*(RADIUS+1), MARGIN_TOP, parseInt(minutes / 10), ctx);
    renderDigit(MARGIN_LEFT + 108*(RADIUS+1), MARGIN_TOP, parseInt(minutes % 10), ctx);
    renderDigit(MARGIN_LEFT + 123*(RADIUS+1), MARGIN_TOP, 10, ctx);
    renderDigit(MARGIN_LEFT + 132*(RADIUS+1), MARGIN_TOP, parseInt(seconds / 10), ctx);
    renderDigit(MARGIN_LEFT + 148*(RADIUS+1), MARGIN_TOP, parseInt(seconds % 10), ctx);

    // render balls
    for (var i = 0; i < balls.length; i++) {
        var heart = new Heart(ctx, balls[i].x, balls[i].y, Heart_SIZE, balls[i].color);
        heart.draw();
    }
}

function renderDigit (x, y, num, ctx) {
    for (var i = 0; i < digit[num].length; i++) {
        for (var j = 0; j < digit[num][i].length; j++) {
            if (digit[num][i][j] == 1) {
                var heart = new Heart(ctx, x + j*2*(RADIUS+1) + (RADIUS+1), y + i*2*(RADIUS+1) + (RADIUS+1), Heart_SIZE);
                heart.draw();
            }
        } 
    }
} 

function getCurrentShowTimeSeconds () {
    var curTime = new Date();
    var ret = curTime.getHours() *  3600 + curTime.getMinutes() * 60 + curTime.getSeconds();

    return ret;
}

function update () {
    var nextShowTimeSeconds = getTimeRemaining(new Date(), moment("2022-10-16 00:00:00").valueOf());

    var nextdays = nextShowTimeSeconds.days;
    var nexthours = nextShowTimeSeconds.hours;
    var nextminutes = nextShowTimeSeconds.minutes;
    var nextseconds = nextShowTimeSeconds.seconds;

    var curdays = currentShowTimeSeconds.days;
    var curhours = currentShowTimeSeconds.hours;
    var curminutes = currentShowTimeSeconds.minutes;
    var curseconds = currentShowTimeSeconds.seconds;

    if (nextShowTimeSeconds.total != currentShowTimeSeconds.total) {
        if (parseInt(nextdays / 100) != parseInt(curdays / 100)) {
          addBalls(MARGIN_LEFT, MARGIN_TOP, parseInt(nextdays / 100));
        }
        
        if ( parseInt((nextdays % 100) / 10) !=  parseInt((curdays % 100) / 10)) {
          addBalls(MARGIN_LEFT + 15*(RADIUS+1), MARGIN_TOP,  parseInt((nextdays % 100) / 10));
        }

        if (parseInt(nextdays % 10) != parseInt(curdays % 10)) {
          addBalls(MARGIN_LEFT + 30*(RADIUS+1), MARGIN_TOP, parseInt(nextdays % 10));
        }

        if (parseInt(nexthours / 10) != parseInt(curhours / 10)) {
            addBalls(MARGIN_LEFT + 54*(RADIUS+1), MARGIN_TOP, parseInt(nexthours / 10));
        }

        if (parseInt(nexthours % 10) != parseInt(curhours % 10)) {
            addBalls(MARGIN_LEFT + 69*(RADIUS+1), MARGIN_TOP, parseInt(nexthours % 10));
        }

        if (parseInt(nextminutes / 10) != parseInt(curminutes / 10)) {
            addBalls(MARGIN_LEFT + 93*(RADIUS+1), MARGIN_TOP, parseInt(nextminutes / 10));
        }

        if (parseInt(nextminutes % 10) != parseInt(curminutes % 10)) {
            addBalls(MARGIN_LEFT + 108*(RADIUS+1), MARGIN_TOP, parseInt(nextminutes % 10));
        }

        if (parseInt(nextseconds / 10) != parseInt(curseconds / 10)) {
            addBalls(MARGIN_LEFT + 132*(RADIUS+1), MARGIN_TOP, parseInt(nextseconds / 10));
        }

        if (parseInt(nextseconds % 10) != parseInt(curseconds % 10)) {
            addBalls(MARGIN_LEFT + 148*(RADIUS+1), MARGIN_TOP, parseInt(nextseconds % 10));
        }

        currentShowTimeSeconds = nextShowTimeSeconds;
    }

    updateBalls();

}

function addBalls (x, y, num) {
    for (var i = 0; i < digit[num].length; i++) {
        for (var j = 0; j < digit[num][i].length; j++) {
            if (digit[num][i][j] == 1) {
                var aBall = {
                    x : x + j*(RADIUS+1)*2 + (RADIUS+1),
                    y : y + i*(RADIUS+1)*2 + (RADIUS+1),
                    r : RADIUS,
                    g : 1.5 * Math.random() + 1,
                    vx : Math.pow(-1, Math.ceil(Math.random() * 1000)) * 4,
                    vy : -5,
                    color : colors[Math.floor(Math.random() * colors.length)]
                };
                balls.push(aBall);
            }
        }
    }
}

function updateBalls () {
    for (var i = 0; i < balls.length; i++) {
        balls[i].x += balls[i].vx;
        balls[i].y += balls[i].vy;
        balls[i].vy += balls[i].g;

        if (balls[i].y >= WINDOW_HEIGHT - RADIUS) {
            balls[i].y = WINDOW_HEIGHT - RADIUS;
            balls[i].vy = -balls[i].vy * 0.5;
        }
    }

    // remove balls that are out of the screen
    var cnt = 0;
    for (var i = 0; i < balls.length; i++) {
        if (balls[i].x + RADIUS > 0 && balls[i].x - RADIUS < WINDOW_WIDTH) {
            balls[cnt++] = balls[i];
        }
    }

    while (balls.length > cnt) {
        balls.pop();
    }
}

function getTimeRemaining(startTime, endTime = new Date()) {
  var t =  (typeof endTime !== "number" ? Date.parse(endTime) : endTime) - Date.parse(startTime);
  var seconds = Math.floor((t / 1000) % 60);
  var minutes = Math.floor((t / 1000 / 60) % 60);
  var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
  var days = Math.floor(t / (1000 * 60 * 60 * 24));
  return {
    'total': t,
    'days': days,
    'hours': hours,
    'minutes': minutes,
    'seconds': seconds
  };
} 

digit =
    [
        [
            [0,0,1,1,1,0,0],
            [0,1,1,0,1,1,0],
            [1,1,0,0,0,1,1],
            [1,1,0,0,0,1,1],
            [1,1,0,0,0,1,1],
            [1,1,0,0,0,1,1],
            [1,1,0,0,0,1,1],
            [1,1,0,0,0,1,1],
            [0,1,1,0,1,1,0],
            [0,0,1,1,1,0,0]
        ],//0
        [
            [0,0,0,1,1,0,0],
            [0,1,1,1,1,0,0],
            [0,0,0,1,1,0,0],
            [0,0,0,1,1,0,0],
            [0,0,0,1,1,0,0],
            [0,0,0,1,1,0,0],
            [0,0,0,1,1,0,0],
            [0,0,0,1,1,0,0],
            [0,0,0,1,1,0,0],
            [1,1,1,1,1,1,1]
        ],//1
        [
            [0,1,1,1,1,1,0],
            [1,1,0,0,0,1,1],
            [0,0,0,0,0,1,1],
            [0,0,0,0,1,1,0],
            [0,0,0,1,1,0,0],
            [0,0,1,1,0,0,0],
            [0,1,1,0,0,0,0],
            [1,1,0,0,0,0,0],
            [1,1,0,0,0,1,1],
            [1,1,1,1,1,1,1]
        ],//2
        [
            [1,1,1,1,1,1,1],
            [0,0,0,0,0,1,1],
            [0,0,0,0,1,1,0],
            [0,0,0,1,1,0,0],
            [0,0,1,1,1,0,0],
            [0,0,0,0,1,1,0],
            [0,0,0,0,0,1,1],
            [0,0,0,0,0,1,1],
            [1,1,0,0,0,1,1],
            [0,1,1,1,1,1,0]
        ],//3
        [
            [0,0,0,0,1,1,0],
            [0,0,0,1,1,1,0],
            [0,0,1,1,1,1,0],
            [0,1,1,0,1,1,0],
            [1,1,0,0,1,1,0],
            [1,1,1,1,1,1,1],
            [0,0,0,0,1,1,0],
            [0,0,0,0,1,1,0],
            [0,0,0,0,1,1,0],
            [0,0,0,1,1,1,1]
        ],//4
        [
            [1,1,1,1,1,1,1],
            [1,1,0,0,0,0,0],
            [1,1,0,0,0,0,0],
            [1,1,1,1,1,1,0],
            [0,0,0,0,0,1,1],
            [0,0,0,0,0,1,1],
            [0,0,0,0,0,1,1],
            [0,0,0,0,0,1,1],
            [1,1,0,0,0,1,1],
            [0,1,1,1,1,1,0]
        ],//5
        [
            [0,0,0,0,1,1,0],
            [0,0,1,1,0,0,0],
            [0,1,1,0,0,0,0],
            [1,1,0,0,0,0,0],
            [1,1,0,1,1,1,0],
            [1,1,0,0,0,1,1],
            [1,1,0,0,0,1,1],
            [1,1,0,0,0,1,1],
            [1,1,0,0,0,1,1],
            [0,1,1,1,1,1,0]
        ],//6
        [
            [1,1,1,1,1,1,1],
            [1,1,0,0,0,1,1],
            [0,0,0,0,1,1,0],
            [0,0,0,0,1,1,0],
            [0,0,0,1,1,0,0],
            [0,0,0,1,1,0,0],
            [0,0,1,1,0,0,0],
            [0,0,1,1,0,0,0],
            [0,0,1,1,0,0,0],
            [0,0,1,1,0,0,0]
        ],//7
        [
            [0,1,1,1,1,1,0],
            [1,1,0,0,0,1,1],
            [1,1,0,0,0,1,1],
            [1,1,0,0,0,1,1],
            [0,1,1,1,1,1,0],
            [1,1,0,0,0,1,1],
            [1,1,0,0,0,1,1],
            [1,1,0,0,0,1,1],
            [1,1,0,0,0,1,1],
            [0,1,1,1,1,1,0]
        ],//8
        [
            [0,1,1,1,1,1,0],
            [1,1,0,0,0,1,1],
            [1,1,0,0,0,1,1],
            [1,1,0,0,0,1,1],
            [0,1,1,1,0,1,1],
            [0,0,0,0,0,1,1],
            [0,0,0,0,0,1,1],
            [0,0,0,0,1,1,0],
            [0,0,0,1,1,0,0],
            [0,1,1,0,0,0,0]
        ],//9
        [
            [0,0,0,0],
            [0,0,0,0],
            [0,1,1,0],
            [0,1,1,0],
            [0,0,0,0],
            [0,0,0,0],
            [0,1,1,0],
            [0,1,1,0],
            [0,0,0,0],
            [0,0,0,0]
        ]//:
    ];

   