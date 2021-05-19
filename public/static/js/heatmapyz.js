var heatMesh = new THREE.Mesh()
mounted = false

window.yz_addheatmap = function (heatdata) {
  heatMesh.children = []
  var ddd
  var url = "../static/json/fake-heatmap.json"
  var request = new XMLHttpRequest()
  request.open("get", url)
  request.send(null)
  request.onload = function () {
    ddd = JSON.parse(request.responseText)
    if (heatdata) {
      ddd = heatdata
    }
    for (i in ddd["data"]) {
      ddd["data"][i]["lng"] -= 106.53676
      ddd["data"][i]["lng"] *= -40000
      ddd["data"][i]["lat"] -= 29.55031
      ddd["data"][i]["lat"] *= 40000
      ddd["data"][i]["lng"] += 500 + 2200
      ddd["data"][i]["lat"] += 340 + 1020
      // console.log(ddd["data"][i]["x"], ddd["data"][i]["y"])
      ddd["data"][i]["y"] = parseInt(ddd["data"][i]["lat"])
      ddd["data"][i]["x"] = parseInt(ddd["data"][i]["lng"])

      // ddd["data"][i]["radius"] *= 0.2
      ddd["data"][i]["radius"] = 11
      ddd["data"][i]["value"] = parseFloat(ddd["data"][i]["count"])
      // console.log(ddd["data"][i])
    }

    var heatmapInstance = h337.create({
      // only container is required, the rest will be defaults
      container: document.getElementById('heatmap'),
      backgroundColor: "rgba(255,0,0)",
      gradient: {
        '1.0': '#ff2222',
        '0.995': '#ff4444',
        '0.990': '#ff6666',
        '0.980': '#ffca3a',
        '0.970': '#ffff43',
        '0.5': '#00ff00',
        '0.0': '#0000ff'
      }
      // maxOpacity: .1,
      // minOpacity: 0,
      // opacity: .5
    });

    heatmapInstance.setData(ddd);
    var canvas = document.getElementById('heatmap')

    var canvasmaterial = new THREE.MeshBasicMaterial({ opacity: 0.9, transparent: true, depthWrite: false, depthTest: false });
    console.log(canvasmaterial);
    var gridMap = new THREE.TextureLoader().load("../static/img/" + "grid" + ".png");
    gridMap.wrapS = THREE.RepeatWrapping
    gridMap.wrapT = THREE.RepeatWrapping
    // gridMap.repeat.set(10,10)
    // canvasmaterial.alphaMap = gridMap
    // canvasmaterial = new THREE.MeshBasicMaterial({color: 0x000000})

    var heatMap = new THREE.CanvasTexture(canvas.children[0]);

    canvasmaterial.map = heatMap
    var c = document.getElementById('gridmap')
    var ctx=c.getContext("2d");
    var girdSize = 4;

    var CanvasWidth = ctx.canvas.width;
    var CanvasHeight = ctx.canvas.height;

    ctx.rect(0,0,8192,4096);
    ctx.fillStyle="#fff";
    ctx.fill();

    var xLineTotals = Math.floor(CanvasHeight / girdSize); // 计算需要绘画的x轴条数
    console.log(CanvasHeight);
    for (var i = 0; i < xLineTotals; i++) {
        ctx.beginPath(); // 开启路径，设置不同的样式
        ctx.moveTo(0, girdSize * i - 0.5); // -0.5是为了解决像素模糊问题
        ctx.lineTo(CanvasWidth, girdSize * i - 0.5);
        ctx.strokeStyle = "#000"; // 设置每个线条的颜色
        ctx.stroke();

        ctx.beginPath(); // 开启路径，设置不同的样式
        ctx.moveTo(0, girdSize * i + 0.5); // -0.5是为了解决像素模糊问题
        ctx.lineTo(CanvasWidth, girdSize * i + 0.5);
        ctx.strokeStyle = "#000"; // 设置每个线条的颜色
        ctx.stroke();
    }
    var yLineTotals = Math.floor(CanvasWidth / girdSize); // 计算需要绘画y轴的条数
    console.log(yLineTotals);
    for (var j = 0; j < yLineTotals; j++) {
        ctx.beginPath(); // 开启路径，设置不同的样式
        ctx.moveTo(girdSize * j - 0.5, 0);
        ctx.lineTo(girdSize * j - 0.5, CanvasHeight);
        ctx.strokeStyle = "#000"; // 设置每个线条的颜色
        ctx.stroke();

        ctx.beginPath(); // 开启路径，设置不同的样式
        ctx.moveTo(girdSize * j + 0.5, 0);
        ctx.lineTo(girdSize * j + 0.5, CanvasHeight);
        ctx.strokeStyle = "#000"; // 设置每个线条的颜色
        ctx.stroke();
    }
    canvasmaterial.alphaMap = new THREE.CanvasTexture(c)

    heatmesh = new THREE.Mesh(new THREE.BoxBufferGeometry(2048, 1024, 0.01, 1.0), canvasmaterial);
    heatmesh.rotation.x = -1.5707963
    heatmesh.position.x = 914
    heatmesh.position.z = 510
    heatmesh.position.y = 0
    heatmesh.renderOrder = -1
    heatMesh.add(heatmesh)
    if (!mounted) {
      scene.add(heatMesh)
      mounted = true
    }
  }
}

window.yz_clearheatmap = function () {
  heatMesh.children = []
}
