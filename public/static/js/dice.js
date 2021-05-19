var camera, scene, renderer;
var meshList = [];

init();


function init(){
  var pointLight = new THREE.PointLight( 0xffffff, 1 );
  camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000 );


  camera.position.y = 80;
  camera.position.z = 40
  camera.position.x = 5;
  camera.rotation.x = -1
  // camera.position.z = 250;

	scene = new THREE.Scene();
  var ambientLight = new THREE.AmbientLight( 0xcccccc, 0.4 );
	scene.add( ambientLight );
  scene.add( pointLight );
	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );

	window.addEventListener( 'resize', onWindowResize, false );
}

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );
}

function animate() {

	requestAnimationFrame( animate );

	mesh.rotation.x += 0.005;
	mesh.rotation.y += 0.01;

	renderer.render( scene, camera );

}

var g = -1
var deltaTime = 0.6

bind = function(fn, me) {
    return function() {
        return fn.apply(me, arguments);
    };
};

function D6(x, y, z) {
  this.name = "d6";
  this.x = x;
  this.y = y;
  this.z = z;
  this.velocity = [0,0,0,0,0,0];
  this.point = 0
  this.rolled = false
  this.roll = bind(this.roll, this);
  return this
}

D6.prototype.generate = function(){
  function loadModel(){

  }
  var manager = new THREE.LoadingManager( loadModel );
  var loader = new THREE.OBJLoader( manager );
  var object
  var _this = this
	loader.load( 'http://localhost:8848/static/obj/shaizi.obj', function ( obj ) {
    _this.object = obj;
    _this.object.position.x += _this.x;
    _this.object.position.y += _this.y;
    _this.object.position.z += _this.z;
		scene.add(_this.object)
    renderer.render( scene, camera );
	} );
}

D6.prototype.roll = function(point, v0){
  if (!this.rolled) {
    this.point = point
    this.velocity = v0
    this.rolled = true
  }
  requestAnimationFrame( this.roll );
  if (!this.object) {
    return
  }
  if (this.object.position.y >= 0) {
    this.object.position.x += this.velocity[0] * deltaTime
    this.object.position.y += this.velocity[1] * deltaTime
    this.object.position.z += this.velocity[2] * deltaTime
    this.object.rotation.x += this.velocity[3] * deltaTime
    this.object.rotation.y += this.velocity[4] * deltaTime
    this.object.rotation.z += this.velocity[5] * deltaTime
    this.velocity[1] += g * deltaTime
  } else {
    this.velocity = [0,0,0,0,0,0]
    var mx = new THREE.Matrix4()
    var my = new THREE.Matrix4()
    var mz = new THREE.Matrix4()
    switch (this.point) {
      case 1:
        this.object.rotation.x = 0
        this.object.rotation.z = 0
        break;
      case 2:
        mx.makeRotationAxis(new THREE.Vector3(1,0,0), -Math.PI/2)
        mz.makeRotationAxis(new THREE.Vector3(0,0,1), this.object.rotation.z)
        this.object.rotation.setFromRotationMatrix(mx.multiply(mz))
        break;
      case 3:
        mx.makeRotationAxis(new THREE.Vector3(1,0,0), Math.PI/2)
        mz.makeRotationAxis(new THREE.Vector3(0,0,1), this.object.rotation.z)
        this.object.rotation.setFromRotationMatrix(mx.multiply(mz))
        break;
      case 4:
        mx.makeRotationAxis(new THREE.Vector3(0,0,1), -Math.PI/2)
        mz.makeRotationAxis(new THREE.Vector3(1,0,0), this.object.rotation.x)
        this.object.rotation.setFromRotationMatrix(mx.multiply(mz))
        break;
      case 5:
        mx.makeRotationAxis(new THREE.Vector3(0,0,1), Math.PI/2)
        mz.makeRotationAxis(new THREE.Vector3(1,0,0), this.object.rotation.x)
        meshList[i].rotation.setFromRotationMatrix(mx.multiply(mz))
        break;
      case 6:
        mx.makeRotationAxis(new THREE.Vector3(1,0,0), Math.PI)
        mz.makeRotationAxis(new THREE.Vector3(0,1,0), this.object.rotation.y)
        meshList[i].rotation.setFromRotationMatrix(mx.multiply(mz))
        break;
    }
  }
  renderer.render( scene, camera );
}

function D10(x, y, z, point, v0) {
  this.name = "d6";
  this.x = x;
  this.y = y;
  this.z = z;
  this.velocity = v0;
  this.point = point
  this.rolled = false
  this.roll = bind(this.roll, this);
  return this
}

D10.prototype.generate = function(){
  function loadModel(){

  }
  var manager = new THREE.LoadingManager( loadModel );
  var loader = new THREE.OBJLoader( manager );
  var object
  var _this = this
	loader.load( 'http://localhost:8848/static/obj/shaizi.obj', function ( obj ) {
    _this.object = obj;
    _this.object.position.x += _this.x;
    _this.object.position.y += _this.y;
    _this.object.position.z += _this.z;
		scene.add(_this.object)
    renderer.render( scene, camera );
	} );
}

D10.prototype.roll = function(){
  requestAnimationFrame( this.roll );
  if (!this.object) {
    return
  }
  if (this.object.position.y >= 0) {
    this.object.position.x += this.velocity[0] * deltaTime
    this.object.position.y += this.velocity[1] * deltaTime
    this.object.position.z += this.velocity[2] * deltaTime
    this.object.rotation.x += this.velocity[3] * deltaTime
    this.object.rotation.y += this.velocity[4] * deltaTime
    this.object.rotation.z += this.velocity[5] * deltaTime
    this.velocity[1] += g * deltaTime
  } else {
    this.velocity = [0,0,0,0,0,0]
    var mx = new THREE.Matrix4()
    var my = new THREE.Matrix4()
    var mz = new THREE.Matrix4()
    switch (this.point) {
      case 1:
        this.object.rotation.x = 0
        this.object.rotation.z = 0
        break;
      case 2:
        mx.makeRotationAxis(new THREE.Vector3(1,0,0), -Math.PI/2)
        mz.makeRotationAxis(new THREE.Vector3(0,0,1), this.object.rotation.z)
        this.object.rotation.setFromRotationMatrix(mx.multiply(mz))
        break;
      case 3:
        mx.makeRotationAxis(new THREE.Vector3(1,0,0), Math.PI/2)
        mz.makeRotationAxis(new THREE.Vector3(0,0,1), this.object.rotation.z)
        this.object.rotation.setFromRotationMatrix(mx.multiply(mz))
        break;
      case 4:
        mx.makeRotationAxis(new THREE.Vector3(0,0,1), -Math.PI/2)
        mz.makeRotationAxis(new THREE.Vector3(1,0,0), this.object.rotation.x)
        this.object.rotation.setFromRotationMatrix(mx.multiply(mz))
        break;
      case 5:
        mx.makeRotationAxis(new THREE.Vector3(0,0,1), Math.PI/2)
        mz.makeRotationAxis(new THREE.Vector3(1,0,0), this.object.rotation.x)
        meshList[i].rotation.setFromRotationMatrix(mx.multiply(mz))
        break;
      case 6:
        mx.makeRotationAxis(new THREE.Vector3(1,0,0), Math.PI)
        mz.makeRotationAxis(new THREE.Vector3(0,1,0), this.object.rotation.y)
        meshList[i].rotation.setFromRotationMatrix(mx.multiply(mz))
        break;
    }
  }
  renderer.render( scene, camera );
}

// var newD6a = new D6(0, 0, 0)
// var newD6b = new D6(10, 10, 10)
// newD6a.generate()
// newD6b.generate()
// newD6a.roll(1,[1,10,-1,1,1,1])
// newD6b.roll(1,[1,10,-1,1,1,1])
