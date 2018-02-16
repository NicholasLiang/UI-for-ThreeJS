var scene, camera, renderer, container;

var WIDTH  = window.innerWidth;
var HEIGHT = window.innerHeight;

function init() {
    scene = new THREE.Scene();

    initMesh();
    initCurve();
    initCamera();
    initLights();
    initRenderer();

    container = document.getElementById('threeJS-container');
    container.appendChild(renderer.domElement);
}

function initCurve() {
  // Create a sine-like wave
  var curve = new THREE.SplineCurve( [
  	new THREE.Vector2( -100, 0 ),
  	new THREE.Vector2( -50, 50 ),
  	new THREE.Vector2( 0, 0 ),
  	new THREE.Vector2( 50, -50 ),
  	new THREE.Vector2( 100, 0 )
  ] );

  var points = curve.getPoints( 500 );
  var geometry = new THREE.BufferGeometry().setFromPoints( points );

  var material = new THREE.LineBasicMaterial( { color : 0xff0000 } );

  // Create the final object to add to the scene
  var splineObject = new THREE.Line( geometry, material );
  scene.add(splineObject);
}

function initCamera() {
    camera = new THREE.PerspectiveCamera(50, WIDTH / HEIGHT, 1, 1000);
    camera.position.set(0, 100, 100);
    camera.lookAt(scene.position);
}


function initRenderer() {
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(WIDTH, HEIGHT);
}

function initLights() {
    var light = new THREE.AmbientLight(0xffffff, 1);
    scene.add(light);

    var light2 = new THREE.PointLight(0xffffff, 0.5);
    light2.position.set(20,30,10)
    scene.add(light2);
}

var mesh = null;
function initMesh() {
    var loader = new THREE.JSONLoader();
    loader.load('3dmodels/blender-logos.json', function(geometry, materials) {
        mesh = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(materials));
        mesh.scale.x = mesh.scale.y = mesh.scale.z = 8;
        mesh.translation = THREE.GeometryUtils.center(geometry);
        scene.add(mesh);
	      mesh.position.set(10/4,10/3,10/2)
    });
}

function animate() {
}

function onResize(){
	window.addEventListener('resize', function() {
		var WIDTH = window.innerWidth,
				HEIGHT = window.innerHeight;
		renderer.setSize(WIDTH, HEIGHT);
		camera.aspect = WIDTH / HEIGHT;
		camera.updateProjectionMatrix();
	});
}

function render() {
	onResize();
  requestAnimationFrame(render);
  animate();
  renderer.render(scene, camera);
}

init();
render();
