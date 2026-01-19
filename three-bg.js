const canvas=document.getElementById('bg');
const scene=new THREE.Scene();
const camera=new THREE.PerspectiveCamera(
  75,
  window.innerWidth/window.innerHeight,
  0.1,
  1000
);

const renderer=new THREE.WebGLRenderer({canvas,alpha:true});
renderer.setSize(window.innerWidth,window.innerHeight);
camera.position.z=5;

const geometry=new THREE.BufferGeometry();
const points=[];

for(let i=0;i<1200;i++){
  points.push(
    (Math.random()-0.5)*20,
    (Math.random()-0.5)*20,
    (Math.random()-0.5)*20
  );
}

geometry.setAttribute(
  'position',
  new THREE.Float32BufferAttribute(points,3)
);

const material=new THREE.PointsMaterial({
  color:0x66ccff,
  size:0.04
});

const mesh=new THREE.Points(geometry,material);
scene.add(mesh);

function animate(){
  requestAnimationFrame(animate);
  mesh.rotation.y+=0.0008;
  renderer.render(scene,camera);
}
animate();
