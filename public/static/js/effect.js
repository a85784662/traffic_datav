class EmpEffect {
    constructor(position, color, min, maxmultiple, camera, speed){
        this.position = position
        this.maxmultiple = maxmultiple
        this.camera = camera
        this.speed = speed
        this.scale = 1.0
        this.min = min

        var geometry = new THREE.SphereGeometry(min, 50, 50, 50)
        var vShader = `
            precision highp float;
            uniform float camerax;
            uniform float cameray;
            uniform float cameraz;
            uniform vec3 color;

            attribute vec3 translate;

            varying vec2 vUv;

            varying vec3 v_normal;

            varying float v_camerax;
            varying float v_cameray;
            varying float v_cameraz;
            varying vec3 v_color;
            varying vec3 v_position;

            void main() {

                vUv = uv;

                v_normal = normal;

                v_camerax = camerax;
                v_cameray = cameray;
                v_cameraz = cameraz;
                v_color = color;
                v_position = position;

                gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

            }
        `
        var fShader = `
            precision highp float;

            uniform sampler2D map;

            // varying vec3 v_color;

            varying vec3 v_normal;

            varying float v_camerax;
            varying float v_cameray;
            varying float v_cameraz;
            varying vec3 v_color;
            varying vec3 v_position;

            void main() {

                gl_FragColor = vec4( v_color, (1.- dot(v_normal, vec3( v_camerax, v_cameray, v_cameraz ))) * step(0.0, v_position.y) );
                
            }
        `
        var material = new THREE.ShaderMaterial({
            uniforms: {
                color: { value: new THREE.Color(color) },
                camerax: { value: 0.0 },
                cameray: { value: 0.0 },
                cameraz: { value: 0.0 }
            },
            vertexShader: vShader,
            fragmentShader: fShader,
            transparent: true,
            // side: THREE.DoubleSide,
            depthTest: false
        })
        this.mesh = new THREE.Mesh(geometry, material)
        this.mesh.position.set(position[0], position[1], position[2])
        this.pointLight = new THREE.PointLight(color, 0.9, min)
        // this.pointLight.castShadow = true
        this.mesh.add(this.pointLight)
    }

    animate(){
        this.scale += 0.1 * this.speed
        if(this.scale >= this.maxmultiple){
            this.scale = 1.0
        }
        this.mesh.scale.set(this.scale, this.scale, this.scale)
        this.pointLight.distance = this.scale * this.min

        var pos = this.camera.position.clone()
        var unitPosition = pos.sub(new THREE.Vector3(this.position[0], this.position[1], this.position[2])).normalize()

        this.mesh.material.uniforms[ "camerax" ].value = unitPosition.x;
        this.mesh.material.uniforms[ "cameray" ].value = unitPosition.y;
        this.mesh.material.uniforms[ "cameraz" ].value = unitPosition.z;
    }
}

class AntiEmpEffect {
    constructor(position, color, min, maxmultiple, camera, speed){
        this.position = position
        this.maxmultiple = maxmultiple
        this.camera = camera
        this.speed = speed
        this.scale = 1.0
        this.min = min
        this.firstTime = Date.now() + Math.random()*3.14*500
        

        var geometry = new THREE.SphereGeometry(min, 50, 50, 50)
        var vShader = `
            precision highp float;
            uniform float camerax;
            uniform float cameray;
            uniform float cameraz;
            uniform float lasttime;
            uniform vec3 color;

            attribute vec3 translate;

            varying vec2 vUv;

            varying vec3 v_normal;

            varying float v_camerax;
            varying float v_cameray;
            varying float v_cameraz;
            varying float v_lasttime;
            varying vec3 v_color;
            varying vec3 v_position;

            void main() {

                vUv = uv;

                v_normal = normal;

                v_camerax = camerax;
                v_cameray = cameray;
                v_cameraz = cameraz;
                v_color = color;
                v_position = position;
                v_lasttime = lasttime;

                gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

            }
        `
        var fShader = `
            precision highp float;

            uniform sampler2D map;

            // varying vec3 v_color;

            varying vec3 v_normal;

            varying float v_camerax;
            varying float v_cameray;
            varying float v_cameraz;
            varying vec3 v_color;
            varying vec3 v_position;
            varying float v_lasttime;

            

            void main() {
                float sint = (sin(v_lasttime) + 1.)/2.;
                vec3 _color = vec3(0.4392, 0.9412, 0.9843);
                float _a = pow((dot(v_normal, vec3( v_camerax, v_cameray, v_cameraz ))), 5.);
                float a_ = 1.-step(_a, 0.6);
                gl_FragColor = vec4( a_*v_color + (1.-a_)*_color, _a*sint + a_);
            }
        `
        var material = new THREE.ShaderMaterial({
            uniforms: {
                color: { value: new THREE.Color(color) },
                camerax: { value: 0.0 },
                cameray: { value: 0.0 },
                cameraz: { value: 0.0 },
                lasttime : { value: 0.0 }
            },
            vertexShader: vShader,
            fragmentShader: fShader,
            transparent: true,
            // side: THREE.DoubleSide,
            depthTest: false,
            depthWrite: false,

        })
        this.mesh = new THREE.Mesh(geometry, material)
        this.mesh.renderOrder = -1
        this.mesh.position.set(position[0], position[1], position[2])
        this.pointLight = new THREE.PointLight(color, 0.9, min)
        // this.pointLight.castShadow = true
        this.mesh.add(this.pointLight)
    }

    
    animate(){
        var lastTime = Date.now()

        var pos = this.camera.position.clone()
        var unitPosition = pos.sub(new THREE.Vector3(this.position[0], this.position[1], this.position[2])).normalize()

        this.mesh.material.uniforms[ "camerax" ].value = unitPosition.x;
        this.mesh.material.uniforms[ "cameray" ].value = unitPosition.y;
        this.mesh.material.uniforms[ "cameraz" ].value = unitPosition.z;
        this.mesh.material.uniforms[ "lasttime" ].value = (lastTime - this.firstTime) / 500 ;
    }

}

class CyclinderEffect {
    constructor(position, radius, height, color, camera){

        this.position = position
        this.radius = radius
        this.height = height
        this.color = color
        this.camera = camera
        this.timeBase = Date.now()
        this.expNum = 6.0
        this.orignLightAngle = Math.atan(this.radius / this.height / 2) * 3

        var vShader = `
            precision highp float;
            uniform float height;
            uniform vec3 color;
            uniform float time;

            uniform float camerax;
            uniform float cameray;
            uniform float cameraz;

            varying float v_height;

            varying vec3 v_normal;

            varying vec3 v_position;

            varying float v_camerax;
            varying float v_cameray;
            varying float v_cameraz;
            varying vec3 v_color;
            varying float v_time;

            void main() {

                v_camerax = camerax;
                v_cameray = cameray;
                v_cameraz = cameraz;


                v_normal = normal;

                v_position = position;

                v_height = height;

                v_color = color;

                v_time = time;

                gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0  );

            }
        `
        var fShader = `
            precision highp float;

            uniform sampler2D map;

            varying float v_camerax;
            varying float v_cameray;
            varying float v_cameraz;

            varying vec3 v_position;

            varying vec3 v_color;

            varying vec3 v_normal;

            varying float v_time;

            varying float v_height;

            void main() {
                float outLight = pow((v_height - v_position.y*2.0)/v_height * dot(v_normal, vec3( v_camerax, v_cameray, v_cameraz )) / 1.4, 2.0);
                float inLight = pow(dot(v_normal, vec3( v_camerax, v_cameray, v_cameraz ))/1.2, 4.0 - sin(v_time/2.)*2.0);
                float outLightMuti = pow((v_height - v_position.y*2.0)/v_height, 2.0);
                float wave = pow(sin(v_position.y - v_time)/1.2, 2.0);

                gl_FragColor = vec4( v_color, wave * outLightMuti * 0.03 + inLight*outLightMuti*0.2 + outLight * 0.1);
                // gl_FragColor = vec4( v_color, inLight*outLightMuti*0.2 );
            }
        `
    
        var geometry = new THREE.CylinderGeometry(this.radius, this.radius, this.height, 50, 50, 50)

        var material = new THREE.ShaderMaterial({
            uniforms: {
                color: {value: new THREE.Color(this.color)},
                height: {value: this.height},
                time: {value: 0.0},
                camerax: { value: 0.0 },
                cameray: { value: 0.0 },
                cameraz: { value: 0.0 },
                expNum: { value: this.expNum }
            },
            vertexShader: vShader,
            fragmentShader: fShader,
            transparent: true,
            depthTest: false,
            // side: THREE.DoubleSide
        })

        var mesh = new THREE.Mesh(geometry, material)
        this.mesh = mesh
        this.mesh.position.set(this.position[0], this.position[1], this.position[2])
        this.mesh.position.y += this.height / 2


        var spotLight = new THREE.SpotLight( this.color, 1 );
        spotLight.position.set(this.position[0], this.height, this.position[2])
        spotLight.angle = this.orignLightAngle
        spotLight.lookAt(new THREE.Vector3(this.position[0], 0, this.position[2]))
        spotLight.distance = this.height * 4
        spotLight.penumbra = 1;
        spotLight.intensity = 4
        this.mesh.add(spotLight)
    }

    animate(){
        var t = (Date.now() - this.timeBase) / 200
        this.mesh.material.uniforms[ "time" ].value = t
        var pos = this.camera.position.clone()
        pos.y = 0
        var unitPosition = pos.sub(new THREE.Vector3(this.position[0], this.position[1], this.position[2])).normalize()
        this.mesh.material.uniforms[ "camerax" ].value = unitPosition.x;
        this.mesh.material.uniforms[ "cameray" ].value = unitPosition.y;
        this.mesh.material.uniforms[ "cameraz" ].value = unitPosition.z;
        this.mesh.children[0].angle = (0.2 * Math.sin(t/2) + 0.8) * this.orignLightAngle
    }

}

class roadEffect{
    constructor(width, height, pointList, color, lightColor){
        this.width = width
        this.height = height
        this.pointList = pointList
        this.color = color
        this.lightColor = lightColor
        this.timeBase = Date.now()

    var vShader = `
        precision highp float;
        uniform float height;
        uniform vec3 color;
        uniform float time;

        varying float v_height;

        varying vec3 v_normal;

        varying vec3 v_position;

        varying vec3 v_color;
        varying float v_time;

        varying vec2 vUv;

        void main() {

            v_normal = normal;

            v_position = position;

            v_height = height;

            v_color = color;

            vUv = uv;

            v_time = time;

            gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0  );

        }
    `
    var fShader = `
        precision highp float;

        uniform sampler2D map;

        varying vec3 v_position;

        varying vec3 v_color;

        varying vec3 v_normal;

        varying float v_time;

        varying float v_height;

        varying vec2 vUv;

        void main() {
            // gl_FragColor = vec4( v_time, v_time, v_time, 1.0 );
            gl_FragColor = texture2D( map, vec2(vUv.x, vUv.y - v_time - floor(vUv.y - v_time)) );
        }
    `
    var dash_fShader = `
        precision highp float;

        uniform sampler2D map;

        varying vec3 v_position;

        varying vec3 v_color;

        varying vec3 v_normal;

        varying float v_time;

        varying float v_height;

        varying vec2 vUv;

        void main() {
            gl_FragColor = vec4(v_color.x,v_color.y,v_color.z,step(sin(vUv.y*2000.), 0.5));
        }
    `

    var shape = new THREE.Shape();

    shape.moveTo(0, -this.width/2);
    shape.lineTo(0, this.width/2);

    var Spline = new THREE.CatmullRomCurve3( this.pointList, false );
    
    this.lengthInAll = 0
    for (var i=1; i<this.pointList.length; i++){
        this.lengthInAll += new THREE.Vector3().subVectors(this.pointList[i], this.pointList[i-1]).length()
    }
    // console.log(lengthInAll);

    var steps = parseInt(2 * this.lengthInAll)

    var extrudeSettings = {
        steps: steps,
        bevelEnabled: false,
        extrudePath: Spline
    };

    var geometry = new THREE.ExtrudeBufferGeometry( shape, extrudeSettings );
    var newArray = []

    for ( var i = 0; i < steps; i++ ){
            newArray.push(0)
            newArray.push(i/steps)

            newArray.push(1)
            newArray.push(i/steps)

            newArray.push(0)
            newArray.push((i+1)/steps)

            newArray.push(1)
            newArray.push(i/steps)

            newArray.push(1)
            newArray.push((i+1)/steps)

            newArray.push(0)
            newArray.push((i+1)/steps)
    }

    for ( var i = 0; i < steps; i++ ){

        newArray.push(0)
        newArray.push(i/steps)

        newArray.push(1)
        newArray.push(i/steps)

        newArray.push(0)
        newArray.push((i+1)/steps)

        newArray.push(1)
        newArray.push(i/steps)

        newArray.push(1)
        newArray.push((i+1)/steps)

        newArray.push(0)
        newArray.push((i+1)/steps)
    }


    var newUv = Object.create(geometry.attributes.uv)
    newUv.array = new Float32Array(newArray)
    // console.log(newUv);
    geometry.setAttribute("uv", newUv)

    
    
    // material.uniforms.map.value.wrapS = material.uniforms.map.value.wrapT = THREE.RepeatWrapping

    var material = new THREE.MeshLambertMaterial()

    if( color == "flow" ){
        this.texture = new THREE.TextureLoader().load( "../static/img/arrow.png" )
        material = new THREE.ShaderMaterial({
            uniforms: {
                // color: { value: new THREE.Color(color) },
                time: { value: 0.0 },
                map: { value: this.texture }
            },
            vertexShader: vShader,
            fragmentShader: fShader,
            transparent: true
        })
    } else if ( color == "border" ) {
        this.texture = new THREE.TextureLoader().load( "../static/img/border.png" )
        material = new THREE.ShaderMaterial({
            uniforms: {
                // color: { value: new THREE.Color(color) },
                time: { value: 0.0 },
                map: { value: this.texture }
            },
            vertexShader: vShader,
            fragmentShader: dash_fShader,
            transparent: true
        })
    } else {
        material = new THREE.MeshLambertMaterial({color: color})
    }
    
    this.mesh = new THREE.Mesh( geometry, material );
    this.mesh.renderOrder = -2
    this.mesh.position.y += this.height
}


    animate(){
        var t = ((Date.now() - this.timeBase) / (20 * this.lengthInAll)  )%1
        this.mesh.material.uniforms[ "time" ].value = t

    }

}

