var busMesh = new THREE.Mesh()
var bus = []

var busstopMesh = new THREE.Mesh()
var busstop = []

var borderMesh = new THREE.Mesh()
var border = []

var roadMesh = new THREE.Mesh()
var road = []

var trafficMesh = new THREE.Mesh()
var traffic = []

var antiemp = []
var antiempMesh = new THREE.Mesh()

window.addbus = function (data) {
  clearbus()
  if (data) {
    return Promise.resolve(_addbus(data))
  }
  return new Promise((resolve, reject) => {

    var url = "../static/json/bus.json"
    var request = new XMLHttpRequest()
    request.open("get", url)
    request.send()

    request.onload = function () {
      var ccc = JSON.parse(request.responseText).records
      resolve(_addbus(ccc))
    }
  })
}

window._addbus = function (ccc) {
  height = 0.04
  for (c in ccc) {
    var r = []
    var aline = ccc[c].line.split('\n')
    for (s in aline) {
      if (aline[s] == "") {
        continue
      }
      loc = aline[s].split(",")
      x = (loc[0] - 106.53676) * -10000 + 500
      z = (loc[1] - 29.55031) * 10000 + 400
      r.push(new THREE.Vector3(x, 0, z))
    }
    var standBy = ccc[c].standByLocNamePairs

    for (s in standBy) {
      if (standBy[s] == "") {
        continue
      }
      loc = standBy[s].point.split(',')
      x = (loc[0] - 106.53676) * -10000 + 500
      z = (loc[1] - 29.55031) * 10000 + 400

      var ae = new AntiEmpEffect([x, 0, z], "#fd53ff", 1, 1, camera, 0.1)
      ae.info = standBy[s]

      var screenPosition = new THREE.Vector3(x, 0, z).project(camera)
      var a = window.innerWidth / 2;
      var b = window.innerHeight / 2;
      var xx = Math.round(screenPosition.x * a + a)
      var yy = Math.round(-screenPosition.y * b + b)
      ae.info.data = { "left": xx, "top": yy, "label": ae.info.name }

      antiempMesh.add(ae.mesh)
      antiemp.push(ae)

    }
    bu = new roadEffect(0.5, height, r, "flow")
    bus.push(bu)
    busMesh.add(bu.mesh)
    height += 0.04
  }
  scene.add(busMesh)
  scene.add(antiempMesh)
  return antiemp

}

window.getscreenlocationofbusstop = function () {
  for (i in antiemp) {
    var point = antiemp[i].info.point.split(',')
    // console.log(point);
    var screenPosition = new THREE.Vector3((point[0] - 106.53676) * -10000 + 500, 0, (point[1] - 29.55031) * 10000 + 400).project(camera)
    var a = window.innerWidth / 2;
    var b = window.innerHeight / 2;
    var x = Math.round(screenPosition.x * a + a)
    var y = Math.round(-screenPosition.y * b + b)
    antiemp[i].info.data = { "left": x, "top": y, "label": antiemp[i].info.name }
  }
  return antiemp
}

window.clearbus = function () {
  busMesh.children = []
  antiempMesh.children = []
  antiemp = []
  bus = []
}

window.addborder = function () {
  clearborder()
  var ccc
  var url = "../static/json/border.json"
  var request = new XMLHttpRequest()
  request.open("get", url)
  request.send(null)
  request.onload = function () {
    ccc = JSON.parse(request.responseText)
    height = 0.04
    var r = []
    for (c in ccc) {
      loc = ccc[c]
      x = (loc[0] - 106.53676) * -10000 + 500
      z = (loc[1] - 29.55031) * 10000 + 400
      r.push(new THREE.Vector3(x, 0, z))
    }
    bo = new roadEffect(1, height, r, "border")
    border.push(bo)
    bo.mesh.renderOrder = -1
    borderMesh.add(bo.mesh)
    scene.add(borderMesh)
  }
}

window.clearborder = function () {
  borderMesh.children = []
  border = []
}

window.addroad = function (data) {
  clearroad()
  var ccc
  var url = "../static/json/roads.json"
  var request = new XMLHttpRequest()
  request.open("get", url)
  request.send(null)
  request.onload = function () {
    ccc = JSON.parse(request.responseText)
    if (data) {
      ccc = data
    }
    height = 0.04
    for (c in ccc) {
      var r = []
      for (s in ccc[c].polylines) {
        loc = ccc[c].polylines[s].split(",")
        x = (loc[0] - 106.53676) * -10000 + 500
        z = (loc[1] - 29.55031) * 10000 + 400
        r.push(new THREE.Vector3(x, 0, z))
      }
      bu = new roadEffect(0.5, height, r, "#557")
      road.push(bu)
      bu.renderOrder = -1
      roadMesh.add(bu.mesh)
    }
    scene.add(roadMesh)
  }
}

window.addtraffic = function (data) {
  cleartraffic()
  var ccc
  var url = "../static/json/traffic.json"
  var request = new XMLHttpRequest()
  request.open("get", url)
  request.send(null)
  request.onload = function () {
    ccc = JSON.parse(request.responseText).data
    if (data) {
      ccc = data.data
    }
    height = 0.14
    var color = "#55d"
    for (c in ccc) {
      if (ccc[c].status === "1") {
        color = "#7bff7b"
      } else if (ccc[c].status === "2") {
        color = "#dbff7b"
      } else if (ccc[c].status === "3") {
        color = "#32d250"
      } else if (ccc[c].status === "4") {
        color = "#032609"
      }
      var r = []
      var polylines = ccc[c].polyline.split(";")
      for (s in polylines) {
        loc = polylines[s].split(",")
        x = (loc[0] - 106.53676) * -10000 + 500
        z = (loc[1] - 29.55031) * 10000 + 400
        r.push(new THREE.Vector3(x, 0, z))
      }
      bu = new roadEffect(0.5, height, r, color)
      traffic.push(bu)
      bu.renderOrder = -1
      trafficMesh.add(bu.mesh)
    }
    scene.add(trafficMesh)
  }
}


window.clearroad = function () {
  roadMesh.children = []
  road = []
}
window.cleartraffic = function () {
  trafficMesh.children = []
  traffic = []
}