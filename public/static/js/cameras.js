var cameras = new THREE.Mesh()
var cameraMesh

// var manager = new THREE.LoadingManager();
//   var loader = new THREE.OBJLoader( manager );
//   loader.setPath( '../static/obj/' )
//   loader.load('camera.obj', function ( object ) {
//     cameraMesh = object
//   })

var spriteMap = new THREE.TextureLoader().load("../static/img/camera.png");
var spriteMaterial = new THREE.SpriteMaterial({ map: spriteMap, transparent: true, depthWrite: false });
cameraMesh = new THREE.Sprite(spriteMaterial);

var spriteMap = new THREE.TextureLoader().load("../static/img/camerahighlight.png");
var spriteMaterialHighLigh = new THREE.SpriteMaterial({ map: spriteMap, transparent: true, depthWrite: false });

function addcamera() {
  var ccc
  var url = "../static/json/camera.json"
  var request = new XMLHttpRequest()
  request.open("get", url)
  request.send(null)
  request.onload = function () {
    ccc = JSON.parse(request.responseText)
    for (c in ccc) {
      var mesh = cameraMesh.clone()
      var x = (ccc[c].monitorLocationLongitude - 106.53676) * 9131.986 + 500
      var z = (ccc[c].monitorLocationLatitude - 29.55031) * 19568.013 + 400
      mesh.position.x = x
      mesh.position.y = 7
      mesh.position.z = z
      mesh.scale.set(10, 10, 10)
      mesh.info = ccc[c]
      cameras.add(mesh)
    }
    scene.add(cameras)
  }
}

function clearcameras() {
  cameras.children = []
}

function setcamerahighlight(cameraId) {
  highlightmtl = new THREE.MeshLambertMaterial({ color: "#ff0000" })
  for (c in cameras.children) {
    if (cameras.children[c].info.id == cameraId) {
      cameras.children[c].material = spriteMaterialHighLigh
      sendmessage({ "type": "monitor", "value": cameras.children[c].info.monitorUrl })
    } else {
      for (i in cameras.children[c]) {
        cameras.children[c].material = spriteMaterial
      }

    }
  }
}

function defultcamerahighlight() {
  originmtl = new THREE.MeshLambertMaterial()
  for (c in cameras.children) {
    cameras.children[c].material = spriteMaterial
  }
}