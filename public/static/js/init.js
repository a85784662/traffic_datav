
var camera, scene, renderer, controls, trafficlayer
var emp, cyc, road
var planemesh = new THREE.Mesh()
var cubes = new THREE.Mesh()

//   stats = new Stats();

// init();
// animate();

// 重新定义sessionStorage.setItem
var orignalSetItem = sessionStorage.setItem
sessionStorage.setItem = function (key, newValue) {
  var setItemEvent = new Event("setItemEvent")
  setItemEvent.key = key
  setItemEvent.newValue = newValue
  orignalSetItem.apply(this, arguments)
  window.dispatchEvent(setItemEvent)
}

function init() {

  scene = new THREE.Scene();

  planemesh.add(new THREE.Mesh(new THREE.BoxBufferGeometry(1536, 1024, 1, 1.0), new THREE.MeshBasicMaterial({ transparent: true, opacity: 0 })))
  planemesh.rotation.x = -1.5707963
  planemesh.position.x = 786 - 128
  planemesh.position.z = 512
  planemesh.position.y = -1
  scene.add(planemesh)

  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 100000);
  // camera.position.x = 213;
  // camera.position.y = 100;
  // camera.position.z = 362;
  // camera.rotation.x = -2.394
  // camera.rotation.y = 0.002
  // camera.rotation.z = 3.14

  // camera.lookAt(768,0,512)

  controls = new THREE.MapControls(camera);
  controls.maxPolarAngle = Math.PI / 2;
  controls.object.position.x = 213
  controls.object.position.y = 75
  controls.object.position.z = 353
  controls.target = new THREE.Vector3(223, 7.6, 431)
  controls.update();
  controls.rotateSpeed = 3;
  controls.panSpeed = 5;
  controls.maxDistance = 250

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.setClearColor(0xaaaaaa, 0.0);
  // renderer.autoClear = True;

  // renderer.setSize( document.body.clientWidth, document.body.clientHeight );
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById("three").appendChild(renderer.domElement);
  window.addEventListener('resize', onWindowResize, false);

  var ambient = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambient);

  directionalLight = new THREE.DirectionalLight('#ffffff', 0.3)
  directionalLight.position.set(-100, 100, 35);
  directionalLight.castShadow = true
  directionalLight.shadow.camera.near = 10; //产生阴影的最近距离
  directionalLight.shadow.camera.far = 150; //产生阴影的最远距离
  directionalLight.shadow.camera.left = -50; //产生阴影距离位置的最左边位置
  directionalLight.shadow.camera.right = 50; //最右边
  directionalLight.shadow.camera.top = 50; //最上边
  directionalLight.shadow.camera.bottom = -50; //最下面

  //这两个值决定使用多少像素生成阴影 默认512
  directionalLight.shadow.mapSize.height = 1024;
  directionalLight.shadow.mapSize.width = 1024;

  scene.add(directionalLight)

  // scene.add( shadowCameraHelper );

  // emp = new EmpEffect([30,0,0], "#ff00ff", 2, 5, camera, .5)
  // scene.add(emp.mesh)

  // cyc = new CyclinderEffect([0,0,0], 3, 50.0, "#aa00ff", camera)    
  // scene.add(cyc.mesh)

  // road = new roadEffect(5,1,[new THREE.Vector3(0,0,0),new THREE.Vector3(50,0,0),new THREE.Vector3(0,0,50),new THREE.Vector3(-50,0,0),new THREE.Vector3(0,0,-50)], "#ff0000")
  // scene.add(road.mesh)

  cyc = new CyclinderEffect([0, 0, 0], 3, 50.0, "#aa00ff", camera)
  cyc.mesh.visible = false
  scene.add(cyc.mesh)

  window.addEventListener('click', onclickmodel, false)

  // yz_loadmodel1()
  // addborder()
  window.addroad()
  loadgltf()

  // yz_addheatmap()
  // addcamera()

  renderer.render(scene, camera)
  // composer.render()





}



function onclickmodel(event) {
  var mouse = new THREE.Vector2();
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  var vector = new THREE.Vector3(mouse.x, mouse.y, 0.5).unproject(camera);
  var raycaster = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());
  raycaster.camera = camera
  var building_intersects = (raycaster.intersectObjects(buildings.children))[0]
  for (var i = 0; i < cubes.children.length; i++) {
    // try {
    //   var cube_intersects = (raycaster.intersectObjects(cubes.children[i].children))[0]
    // } catch {
    // }
    // if (cube_intersects) {
    //   yz_setspritehighlight(cube_intersects.object.parent.info.id)
    //   sessionStorage.setItem("modelClickVal", JSON.stringify(cube_intersects.object.parent.info))
    // }

    try {
      var cube_intersects = (raycaster.intersectObjects(cubes.children))[0]
    } catch (err) {
      console.log('err', err);
    }
    if (cube_intersects) {
      var cop = cube_intersects.object.position
      sessionStorage.setItem("modelClickVal", JSON.stringify(cube_intersects.object.info))
      cyc.position = [cop.x, 0, cop.z]
      cyc.mesh.position.x = cop.x
      cyc.mesh.position.z = cop.z
      cyc.mesh.visible = true
    }


  }
  for (var name in sprites) {
    sprite = sprites[name]
    try {
      var sprite_intersects = (raycaster.intersectObjects(sprite.children))[0].object
    } catch { }

    if (sprite_intersects) {
      yz_setspritehighlight(sprite_intersects.info.id, name)
      sessionStorage.setItem("modelClickVal", JSON.stringify(sprite_intersects.info))
      return
    }
  }
}



function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

var lastTime = Date.now()
function animate() {
  var thisTime = Date.now()
  delteTime = thisTime - lastTime
  lastTime = thisTime
  cyc.animate()
  requestAnimationFrame(animate);

  renderer.render(scene, camera);
  for (b in bus) {
    bus[b].animate()
  }
  // for (i in cubes.children) {
  //   cubes.children[i].rotation.y += delteTime * 0.0012
  //   // cubes.children[i].position.y = Math.sin(thisTime * 0.005) * 5 + 5
  // }
  for (var i = 0; i < antiemp.length; i++) {
    antiemp[i].animate()
  }

  for (i in cubes.children) {
    cubeChildren = cubes.children[i].children
    cubeChildren[0].rotation.y -= delteTime * 0.000618 * 2
    cubeChildren[0].position.y = Math.sin(thisTime / 1000) * 1
    cubeChildren[1].rotation.y += delteTime * 0.000618 * 2
    cubeChildren[1].position.y = -Math.sin(thisTime / 1000) * 1
    cubeChildren[3].rotation.y -= delteTime * 0.000618 * 1.5
  }

  for (b in bus) {
    bus[b].animate()
  }

  for (i in busstopMesh.children) {
    // console.log(busstopMesh.children[i].material.color);
    var sint = (Math.sin(thisTime / 800) + 1) / 2
    var r = sint * 0.0039 + 0.9922
    var g = sint * 0.6647 + 0.3255
    var b = sint * -0.2275 + 1
    busstopMesh.children[i].material.color = new THREE.Color(r, g, b)
  }

  // composer.render()
}

window.addEventListener('message', function (e) {
  // alert(e.data)
  if (e.data == "addcamera") {
    addcamera()
  } else if (e.data == "clearcameras") {
    clearcameras()
  }
})

function sendmessage(msg) {
  window.parent.postMessage(JSON.stringify(msg), '*');
}

window.getcenter = function () {
  var vector = new THREE.Vector3(0, 0, 0.5).unproject(camera);
  var raycaster = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());
  raycaster.camera = camera
  var location_intersects = (raycaster.intersectObjects(planemesh.children))[0]
  var point = location_intersects.point
  var x = ((-point.x + 500) / 10000) + 106.53676
  var z = ((point.z - 400) / 10000) + 29.55031
  console.log(x, z);
  return [x, z]
}
