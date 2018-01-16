// 这是我们的玩家要躲避的敌人 
var Enemy = function(x, y, speed) {
    // 要应用到每个敌人的实例的变量写在这里
    // 我们已经提供了一个来帮助你实现更多
	// 敌人的图片，用一个我们提供的工具函数来轻松的加载文件
	this.x = x
	this.y = y
	this.speed = speed
    this.sprite = 'images/enemy-bug.png';
};

// 此为游戏必须的函数，用来更新敌人的位置
// 参数: dt ，表示时间间隙
Enemy.prototype.update = function(dt) {
    // 你应该给每一次的移动都乘以 dt 参数，以此来保证游戏在所有的电脑上
	// 都是以同样的速度运行的
	this.x += dt * this.speed
	if (this.x > 505) {
		this.x = 0
	}
};

// 此为游戏必须的函数，用来在屏幕上画出敌人，
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// 现在实现你自己的玩家类
// 这个类需要一个 update() 函数， render() 函数和一个 handleInput()函数
var Player = function(x, y) {
	this.x = x
	this.y = y
	this.sprite = 'images/char-boy.png';
}

Player.prototype.update = function() {
	
}

Player.prototype.reset = function() {
	this.x = cellWidth * getRandom(0, numCols)
	this.y = pladerInitY
}

Player.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.moveLeft = function(cellWidth) {
	var newX = this.x - cellWidth
	this.x = newX > 0 ? newX : 0
}

Player.prototype.moveRight = function(cellWidth) {
	var MaxWidth = cellWidth * numCols - cellWidth
	var newX = this.x + cellWidth
	this.x = newX < MaxWidth ? newX : MaxWidth
}

Player.prototype.moveUp = function(cellHeight) {
	var newY = this.y - cellHeight
	this.y = newY >= 0 ? newY : 0
}

Player.prototype.moveDown = function(cellHeight) {
	let MaxHeight = cellHeight * numRows - cellHeight
	var newY = this.y + cellHeight
	this.y = newY <= MaxHeight ? newY : MaxHeight
}

Player.prototype.handleInput = function(key) {
	switch (key) {
		case 'left': 	
			this.moveLeft(cellWidth)
			break;
		case 'right': 
			this.moveRight(cellWidth)
			break;
		case 'up': 
			this.moveUp(cellHeight)
			break;
		case 'down': 
			this.moveDown(cellHeight)
			break;
	}
}
// 现在实例化你的所有对象
// 把所有敌人的对象都放进一个叫 allEnemies 的数组里面
// 把玩家对象放进一个叫 player 的变量里面
var cellWidth = 101
var cellHeight = 83
var numRows = 6
var numCols = 5
var playerInitX = cellWidth * getRandom(0, numCols)
var pladerInitY = cellHeight* (numRows - 1)

var Speed = {
	SLOW: 50,
	NORMAL: 300,
	FAST: 500,
}

var allEnemies = initEnemies()
var player = new Player(playerInitX, pladerInitY)

function getRandom(min, max) {
	return Math.floor(Math.random() * (max - min)) + min
}

function initEnemies () {
	var enemiesNumber =  getRandom(4, 9)
	var enemies = []
	for (var i = 0; i < enemiesNumber; i++) {
		var column = getRandom(1, numCols)
		var row = getRandom(1, numRows - 2)
		var speed = Speed.NORMAL
		if(row%3 === 1) {
			speed = Speed.SLOW
		} else if(row%3 === 2){
			speed = Speed.FAST
		}
		enemies[i] = new Enemy(cellWidth * column,  cellHeight * row - 20, speed)
	}
	return enemies
}

// 这段代码监听游戏玩家的键盘点击事件并且代表将按键的关键数字送到 Player.handleInput()
// 方法里面。你不需要再更改这段代码了。
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
