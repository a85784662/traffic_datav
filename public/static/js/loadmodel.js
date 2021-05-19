var buildings = new THREE.Mesh()
var origin_buildings = new THREE.Mesh()

window.yz_loadmodel1 = function () {
  var manager = new THREE.LoadingManager();
  var loader = new THREE.OBJLoader(manager);
  loader.setPath('../static/obj/')
  loader.load('yz6.obj', function (object) {
    textureA = new THREE.TextureLoader().load("../static/img/download.jpg")
    for (i in object.children) {
      obj = object.children[i]
      obj.traverse(function (child) {
        if (child.isMesh) {
          bufferGeo = child.geometry;
          // bufferGeo.center()
          uniformsA = {
            amplitude: { value: 1.0 },
            texture: { value: textureA }
          };
          var materialRaw = new THREE.ShaderMaterial({
            uniforms: uniformsA,
          });
          materialRaw = new THREE.MeshLambertMaterial({ color: "#3e4f89", transparent: true, opacity: 0.65, depthWrite: true, depthTest: true })
          // materialRaw = new THREE.MeshLambertMaterial({color: "rgb(255,255,255)", transparent: true, opacity:0.65, depthWrite: false, depthTest: false})
          mesh = new THREE.Mesh(bufferGeo, materialRaw)
          buildings.add(mesh)
          // scene.add( mesh );
          mesh.scale.set(0.1, 0.1, 0.1)
          mesh.position.x = 606.8
          mesh.position.z = 258.7
          // mesh.position.x = 250
          // mesh.position.z = 440
          // mesh.position.y = 8
          mesh.rotation.set(0, Math.PI, 0)
          mesh.castShadow = true
          mesh.receiveShadow = true
        }
      })
    }
    origin_buildings = Object(buildings)
    scene.add(buildings)
  }, onProgress, onError);

  var onProgress = function (xhr) {
    if (xhr.lengthComputable) {
      var percentComplete = xhr.loaded / xhr.total * 100;
      console.log(Math.round(percentComplete, 2) + '% downloaded');
    }
  };
  var onError = function () { };
}

window.yz_loadmodel = function () {
  var manager = new THREE.LoadingManager();
  new THREE.MTLLoader(manager)
    .setPath('../static/obj/')
    .load('yz6.mtl', function (materials) {

      materials.preload();

      new THREE.OBJLoader(manager)
        .setMaterials(materials)
        .setPath('../static/obj/')
        .load('yz6.obj', function (object) {
          object.scale.set(0.115, 0.127, 0.127)
          object.position.x = -220
          object.position.z = 442
          object.castShadow = true
          scene.add(object);
        }, onProgress, onError);
    })
  renderer.render(scene, camera);
  var onProgress = function (xhr) {
    if (xhr.lengthComputable) {
      var percentComplete = xhr.loaded / xhr.total * 100;
      console.log(Math.round(percentComplete, 2) + '% downloaded');
    }
  };
  var onError = function () { };
}

function loadgltf() {
  var loader = new THREE.GLTFLoader().setPath('../static/obj/');
  loader.load('yz2.glb', function (gltf) {
    gltf.scene.traverse(function (child) {
      var mtl = new THREE.MeshLambertMaterial({ color: "#3e4f89", transparent: true, opacity: 0.85, depthWrite: true, depthTest: true })
      if (child.isMesh) {
        child.material = mtl
        // child.position.y = 0
        // console.log(child.position.y);
      }
    });
    // console.log(gltf);
    gltf.scene.scale.set(0.103, 0.1, 0.098)
    gltf.scene.position.set(908, -18, 519)
    gltf.scene.rotation.y = Math.PI
    scene.add(gltf.scene);
  });
}

// function loadcoloada(){
//   var loader = new THREE.ColladaLoader();
//       loader.load( '../static/obj/yz.dae', function ( collada ) {

//         // var animations = collada.animations;
//         var avatar = collada.scene;

//         avatar.traverse( function ( node ) {

//           if ( node.isSkinnedMesh ) {

//             node.frustumCulled = false;

//           }

//         } );

//         // mixer = new THREE.AnimationMixer( avatar );
//         // var action = mixer.clipAction( animations[ 0 ] ).play();

//         scene.add( avatar );

//       } );
// }

