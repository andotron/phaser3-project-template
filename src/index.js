import "phaser";

const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 }
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

const game = new Phaser.Game(config);
let player;
let cursors;




function preload() {
  this.load.image("tiles", "../assets/assets.png");
  this.load.tilemapTiledJSON("map", "../assets/level1.json");
  this.load.image("background", "../assets/water.png");
  this.load.spritesheet('player', "../assets/player.png", { frameWidth: 32, frameHeight: 64 })
}

function create() {
  const map = this.make.tilemap({ key: "map" });
  const tileset = map.addTilesetImage("assets", "tiles");

  this.add.image(600, 300, 'background');
  const lowerLayer = map.createStaticLayer("LowerGround", tileset, 0, 0);
  const groundLayer = map.createStaticLayer("Ground", tileset, 0, 0);
  const grassLayer = map.createStaticLayer("Grass", tileset, 0, 0);
  const worldLayer = map.createStaticLayer("World", tileset, 0, 0);
  const highLayer = map.createStaticLayer("High", tileset, 0, 0);

  player = this.physics.add.sprite(100, 450, 'player');
}


function update() {
  cursors = this.input.keyboard.createCursorKeys();
  
  if (cursors.left.isDown) {
    player.body.setVelocityX(-100);
  } else if (cursors.right.isDown) {
    player.body.setVelocityX(100);
  } else if (cursors.up.isDown) {
    player.body.setVelocityY(-100);
  } else if (cursors.down.isDown) {
    player.body.setVelocityY(100);
  }
}