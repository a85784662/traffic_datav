
function tank(name, x, y){
  this.name = name
  this.x = parseInt(x)
  this.y = parseInt(y)
  var tankDiv = document.createElement("div")
  tankDiv.className = "tank"
  tankDiv.style.left = this.x + "px"
  tankDiv.style.top = this.y + "px"
  this.div = tankDiv
  document.getElementById("body").appendChild(tankDiv)
  return this
}

tank.prototype.move = function tankmove(x, y){
  this.x += parseInt(x)
  this.y += parseInt(y)
  this.div.style.left = this.x + "px"
  this.div.style.top = this.y + "px"
}

function game(){
  this.tankDict = {}
  return this
}

game.prototype.appendTank = function appendTank(name, x, y){
  nt = new tank(name, x, y)
  this.tankDict[name] = nt
}

var gameconteoller = new game()
