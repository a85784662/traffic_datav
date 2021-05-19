var sprites = {
  "camera": new THREE.Mesh(),
  "car": new THREE.Mesh(),
  "bus": new THREE.Mesh(),
  "cdg": new THREE.Mesh(),
  "project": new THREE.Mesh(),
  "building": new THREE.Mesh(),
  "shap": new THREE.Mesh(),
  "flood": new THREE.Mesh(),
  "water": new THREE.Mesh(),
  "driving_sch": new THREE.Mesh(),
  "railway": new THREE.Mesh(),
  "car_maint": new THREE.Mesh(),
  "sn": new THREE.Mesh()
}


var cubes = new THREE.Mesh()
cubesMounted = false

var markMesh = new THREE.Mesh(new THREE.CubeGeometry(4, 4, 4), new THREE.MeshBasicMaterial({ transparent: true, opacity: 0 }))

function LoadMarkMesh() {
  var manager = new THREE.LoadingManager();
  var loader = new THREE.OBJLoader(manager);
  loader.setPath('../static/obj/')
  loader.load('mark1.obj', function (object) {
    object.scale.set(0.005, 0.005, 0.005)
    for (i in object.children) {
      var obj = object.children[i]
      if (obj.name.slice(0, 4) == "球体.2") {
        obj.material = new THREE.MeshBasicMaterial({ color: "#9df635" })
      } else if (obj.name.slice(0, 4) == "放样.1") {
        obj.material = new THREE.MeshBasicMaterial({ color: "#3a89f3" })
      } else if (obj.name.slice(0, 4) == "放样.2") {
        obj.material = new THREE.MeshBasicMaterial({ color: "#3a89f3", transparent: true, opacity: 0.5 })
      } else if (obj.name.slice(0, 4) == "圆锥") {
        obj.material = new THREE.MeshLambertMaterial({ color: "#00aeff" })
      } else {
        obj.material = new THREE.MeshBasicMaterial({ color: "#fff7a0" })
      }
    }
    var spriteMap = new THREE.TextureLoader().load("../static/img/light.png");
    var spriteMaterial = new THREE.SpriteMaterial({ map: spriteMap, transparent: true, depthWrite: false });
    var spriteMesh = new THREE.Sprite(spriteMaterial);
    spriteMesh.scale.set(1, 1, 1)
    spriteMesh.position.y = 1.5
    markMesh.add(spriteMesh)
    markMesh.add(object)
  }, onProgress, onError);

  loader.load('mark2.obj', function (object) {
    object.scale.set(0.005, 0.005, 0.005)
    for (i in object.children) {
      var obj = object.children[i]
      obj.material = new THREE.MeshBasicMaterial({ color: "#c235f6" })
    }
    markMesh.add(object)
  }, onProgress, onError);

  loader.load('mark3.obj', function (object) {
    object.scale.set(0.005, 0.005, 0.005)
    for (i in object.children) {
      var obj = object.children[i]
      obj.material = new THREE.MeshBasicMaterial({ color: "#fff7a0" })
    }
    markMesh.add(object)
  }, onProgress, onError);




  var onProgress = function () { }
  var onError = function () { };
}
LoadMarkMesh()

function generatecube() {
  var r = 3;
  var cubeMesh = new THREE.Mesh()
  var vertices = [
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(-r, 2 * r, 0),
    new THREE.Vector3(r / 2, 2 * r, -r * 1.732 / 2),
    new THREE.Vector3(r / 2, 2 * r, r * 1.73205 / 2)
  ]
  for (var i = 0; i < vertices.length; i++) {
    var geometry = new THREE.BufferGeometry();
    j = i + 1
    k = i + 2
    if (j >= vertices.length) {
      j -= vertices.length
    }
    if (k >= vertices.length) {
      k -= vertices.length
    }
    var positions = []
    var normals = []

    positions.push(vertices[i].x, vertices[i].y, vertices[i].z)
    positions.push(vertices[j].x, vertices[j].y, vertices[j].z)
    positions.push(vertices[k].x, vertices[k].y, vertices[k].z)

    var ab = new THREE.Vector3()
    var cb = new THREE.Vector3()

    cb.subVectors(vertices[k], vertices[j]);
    ab.subVectors(vertices[i], vertices[j]);
    cb.cross(ab);

    cb.normalize();

    var nx = cb.x;
    var ny = cb.y;
    var nz = cb.z;

    normals.push(nx * 32767, ny * 32767, nz * 32767);
    normals.push(nx * 32767, ny * 32767, nz * 32767);
    normals.push(nx * 32767, ny * 32767, nz * 32767);

    var colors = [
      0, 255, 255,
      0, 255, 255,
      0, 255, 255
    ]

    var positionAttribute = new THREE.Float32BufferAttribute(positions, 3);
    var normalAttribute = new THREE.Int16BufferAttribute(normals, 3);
    var colorAttribute = new THREE.Uint8BufferAttribute(colors, 3);

    normalAttribute.normalized = true; // this will map the buffer values to 0.0f - +1.0f in the shader
    colorAttribute.normalized = true;

    geometry.setAttribute('position', positionAttribute);
    geometry.setAttribute('normal', normalAttribute);
    geometry.setAttribute('color', colorAttribute);

    var material = new THREE.MeshPhongMaterial({
      color: 0xaaaaaa, specular: 0xffffff, shininess: 250,
      side: THREE.DoubleSide, vertexColors: THREE.VertexColors,
      transparent: true, opacity: 0.5
    });

    var subMesh = new THREE.Mesh(geometry, material);
    // subMesh.renderOrder = 1
    cubeMesh.add(subMesh)
  }
  return cubeMesh
}



window.yz_addcubes = function (data) {
  for (c in data) {
    var mesh = markMesh.clone()
    loc = data[c].location.split(',')
    var x = (parseFloat(loc[0]) - 106.53676) * -10000 + 500
    var z = (parseFloat(loc[1]) - 29.55031) * 10000 + 400
    mesh.position.x = x
    mesh.position.y = 0
    mesh.position.z = z
    mesh.info = data[c]
    cubes.add(mesh)
  }
  if (!cubesMounted) {
    scene.add(cubes)
    cubesMounted = true
  }
}

window.yz_clearcubes = function () {
  cubes.children = []
}

window.yz_setcubeshighlight = function (id) {
  for (i in cubes.children) {
    if (cubes.children[i].info.id == id) {
      cyc.mesh.visivle = true
    }
  }
}

window.yz_deflultcubeshightlight = function () {
  for (i in cubes.children) {
    for (j in cubes.children[i].children) {
      cubes.children[i].children[j].geometry.attributes.color = new THREE.Uint8BufferAttribute([0, 1, 1, 0, 1, 1, 0, 1, 1], 3)
    }
  }
}

spritesMounted = {}
var spriteMeshs = {}


window.yz_getspritemesh = function (name) {
  var spriteMap = new THREE.TextureLoader().load("../static/img/" + name + ".png");
  var spriteMaterial = new THREE.SpriteMaterial({ map: spriteMap, transparent: true, depthWrite: false });
  var spriteMap = new THREE.TextureLoader().load("../static/img/" + name + "highlight.png");
  var spriteMaterialHighLigh = new THREE.SpriteMaterial({ map: spriteMap, transparent: true, depthWrite: false });
  spriteMesh = new THREE.Sprite(spriteMaterial);
  return { "originMaterial": spriteMaterial, "highLightMaterial": spriteMaterialHighLigh, "mesh": spriteMesh }
}

for (key in sprites) {
  spriteMeshs[key] = yz_getspritemesh(key)
  spritesMounted[key] = false
}

window.yz_getspritedata = function (name) {
  sprites[name].children = []
  var data
  var url = "../static/json/camera.json"
  var request = new XMLHttpRequest()
  request.open("get", url)
  request.send(null)
  request.onload = function () {
    data = JSON.parse(request.responseText)
    yz_addsprite(name, data)
  }
}

window.yz_addsprite = function (name, data) {
  yz_clearsprite()
  yz_clearcubes()
  for (c in data) {
    var mesh = spriteMeshs[name].mesh.clone()
    loc = data[c].location.split(',')
    var x = (parseFloat(loc[0]) - 106.53676) * -10000 + 500
    var z = (parseFloat(loc[1]) - 29.55031) * 10000 + 400
    mesh.position.x = x
    mesh.position.y = 2
    mesh.position.z = z
    mesh.scale.set(4.77, 3, 2)
    mesh.info = data[c]
    mesh.renderOrder = 2
    mesh.material.depthTest = false
    sprites[name].add(mesh)
  }
  if (!spritesMounted[name]) {
    // sprites[name].children[0].material.map.image.width = 120
    // sprites[name].children[0].material.map.image.height = 120
    scene.add(sprites[name])
    spritesMounted[name] = true
  }
}

window.yz_clearsprite = function (name) {
  if (name) {
    sprites[name].children = []
  } else {
    for (i in sprites) {
      sprites[i].children = []
    }
  }
}

window.yz_setspritehighlight = function (id, name) {
  var target = sprites[name].children
  var originMaterial = spriteMeshs[name].originMaterial
  var highLightMaterial = spriteMeshs[name].highLightMaterial
  for (var i = 0; i < target.length; i++) {
    if (target[i].info.id == id) {
      target[i].material = highLightMaterial
      target[i].material.depthTest = false
    } else {
      target[i].material = originMaterial
      target[i].material.depthTest = false
    }
  }
}

window.yz_defultcamerahighlight = function (name) {
  var target = sprites[name].children
  var originMaterial = spriteMeshs[name].originMaterial
  for (var i = 0; i < target.length(); i++) {
    target[i].material = originMaterial
  }
}