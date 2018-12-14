
//This is the section that creates our canvas//
var animate = window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  function(callback) { window.setTimeout(callback, 1000/60) };
//The part you see above basically calls the canvas everytime we open the frame//
var canvas = document.createElement('canvas');
var width = 400;
var height = 600;
canvas.width = width;
canvas.height = height;
var context = canvas.getContext('2d');
//This part above sets up the physical canvas we'll see everytime we want to play//
window.onload = function() {
    document.body.appendChild(canvas);
    animate(step);
  };
var step = function() {
    update();
    render();
    animate(step);
  };
//This chunk is called a step function. Is uses the animate method we used to call ->
//our canvas, and it makes sure the position of our objects are updated, and that ->
//they're rendered in the first place.//
  var update = function() {
};

var render = function() {
  context.fillStyle = "#FF00FF";
  context.fillRect(0, 0, width, height);
};
//This adds a bright and easy to recognize color to the canvas//


//Now that we created the canvas out of these inputs, we can make our paddles and ball//
function Paddle(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.x_speed = 0;
    this.y_speed = 0;
  }
  Paddle.prototype.render = function() {
    context.fillStyle = "#0000FF";
    context.fillRect(this.x, this.y, this.width, this.height);
  };
//This function above creates a paddle that has a defined position, shape, and speed//
function Player() {
   this.paddle = new Paddle(175, 580, 50, 10);
}

function Computer() {
  this.paddle = new Paddle(175, 10, 50, 10);
}
//This chunk above tells us that the bottom paddle is the player, and the top is computer//
Player.prototype.render = function() {
    this.paddle.render();
  };
  
Computer.prototype.render = function() {
    this.paddle.render();
  };
//This function reminds our computer to load the paddles every time//

  function Ball(x, y) {
    this.x = x;
    this.y = y;
    this.x_speed = 0;
    this.y_speed = 3;
    this.radius = 5;
  }
  
  Ball.prototype.render = function() {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 2 * Math.PI, false);
    context.fillStyle = "#000000";
    context.fill();
  };
//This chunk above does the exact same thing as the paddles, but gives us a ball//
var player = new Player();
var computer = new Computer();
var ball = new Ball(200, 300);

var render = function() {
  context.fillStyle = "#FF00FF";
  context.fillRect(0, 0, width, height);
  player.render();
  computer.render();
  ball.render();
};
//This bit physically builds our objects

//Now we're ready to add animation//
var update = function() {
    ball.update();
  };
  
  Ball.prototype.update = function() {
    this.x += this.x_speed;
    this.y += this.y_speed;
  };
//This chunk tells the ball to move towards the bottom paddle//


  var update = function() {
    ball.update(player.paddle, computer.paddle);
  };
  
  Ball.prototype.update = function(paddle1, paddle2) {
    this.x += this.x_speed;
    this.y += this.y_speed;
    var top_x = this.x - 5;
    var top_y = this.y - 5;
    var bottom_x = this.x + 5;
    var bottom_y = this.y + 5;
  
    if(this.x - 5 < 0) { // hitting the left wall
      this.x = 5;
      this.x_speed = -this.x_speed;
    } else if(this.x + 5 > 400) { // hitting the right wall
      this.x = 395;
      this.x_speed = -this.x_speed;
    }
  
    if(this.y < 0 || this.y > 600) { // a point was scored
      this.x_speed = 0;
      this.y_speed = 3;
      this.x = 200;
      this.y = 300;
    }
  
    if(top_y > 300) {
      if(top_y < (paddle1.y + paddle1.height) && bottom_y > paddle1.y && top_x < (paddle1.x + paddle1.width) && bottom_x > paddle1.x) {
        // hit the player's paddle
        this.y_speed = -3;
        this.x_speed += (paddle1.x_speed / 2);
        this.y += this.y_speed;
      }
    } else {
        if(top_y < (paddle2.y + paddle2.height) && bottom_y > paddle2.y && top_x < (paddle2.x + paddle2.width) && bottom_x > paddle2.x) {
            // hit the computer's paddle
            this.y_speed = 3;
            this.x_speed += (paddle2.x_speed / 2);
            this.y += this.y_speed;
          }
        }
      };
//This huge chunk determines how the ball moves relative to both the paddles and the walls//

//Now we have our objects and the ball animation. We need to add controls for our paddles//
var keysDown = {};

window.addEventListener("keydown", function(event) {
  keysDown[event.keyCode] = true;
});

window.addEventListener("keyup", function(event) {
  delete keysDown[event.keyCode];
});
//This chunk makes sure our program is listening for a key press//

var update = function() {
    player.update();
    ball.update(player.paddle, computer.paddle);
  };
  
  Player.prototype.update = function() {
    for(var key in keysDown) {
      var value = Number(key);
      if(value == 37) { // left arrow
        this.paddle.move(-4, 0);
      } else if (value == 39) { // right arrow
        this.paddle.move(4, 0);
      } else {
        this.paddle.move(0, 0);
      }
    }
  };
  
  Paddle.prototype.move = function(x, y) {
    this.x += x;
    this.y += y;
    this.x_speed = x;
    this.y_speed = y;
    if(this.x < 0) { // all the way to the left
      this.x = 0;
      this.x_speed = 0;
    } else if (this.x + this.width > 400) { // all the way to the right
      this.x = 400 - this.width;
      this.x_speed = 0;
    }
  }
//This large function makes sure that the player has control over their paddle//

//Now we have controls. finally, we need an AI opponent//
  var update = function() {
    player.update();
    computer.update(ball);
    ball.update(player.paddle, computer.paddle);
  };
  
  Computer.prototype.update = function(ball) {
    var x_pos = ball.x;
    var diff = -((this.paddle.x + (this.paddle.width / 2)) - x_pos);
    if(diff < 0 && diff < -4) { // max speed left
      diff = -5;
    } else if(diff > 0 && diff > 4) { // max speed right
      diff = 5;
    }
    this.paddle.move(diff, 0);
    if(this.paddle.x < 0) {
      this.paddle.x = 0;
    } else if (this.paddle.x + this.paddle.width > 400) {
      this.paddle.x = 400 - this.paddle.width;
    }
  };
//This last bit off code adds computer controll over the top paddle so it faces against the player with AI//

//Using the bits of code above, you've got a succesful game of Pong!!//