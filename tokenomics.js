const container = document.getElementById("chart");
const tooltip = document.getElementById("tooltip");
const detail = document.getElementById("detail");
const dTitle = document.getElementById("detail-title");
const dText = document.getElementById("detail-text");

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / container.clientHeight, 0.1, 1000);
camera.position.set(0, 7, 10);

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(window.innerWidth, container.clientHeight);
container.appendChild(renderer.domElement);

scene.add(new THREE.AmbientLight(0x00ffff, 0.6));
const light = new THREE.PointLight(0x00ffff, 1);
light.position.set(5, 8, 5);
scene.add(light);

const data = [
  { label: "Staking", value: 40, desc: "40% allocated for staking rewards (APR 5%)", color: 0x00ffd5 },
  { label: "Ecosystem & Community", value: 25, desc: "Community, partnerships, airdrops", color: 0x4d7cff },
  { label: "Presale & Private Sale", value: 15, desc: "Vested sale allocation", color: 0xffc107 },
  { label: "Team & Burn", value: 10, desc: "Team vesting & burn reserve", color: 0xff4d4d },
  { label: "Liquidity", value: 10, desc: "Locked liquidity", color: 0x9b59b6 }
];

const group = new THREE.Group();
scene.add(group);

let start = 0;
const total = data.reduce((a,b)=>a+b.value,0);
const radius = 3;

data.forEach(d => {
  const angle = (d.value / total) * Math.PI * 2;
  const shape = new THREE.Shape();
  shape.moveTo(0,0);
  shape.absarc(0,0,radius,start,start+angle);

  const geo = new THREE.ExtrudeGeometry(shape,{ depth:0.8, bevelEnabled:false });
  const mat = new THREE.MeshStandardMaterial({
    color:d.color,
    emissive:d.color,
    emissiveIntensity:0.3
  });

  const mesh = new THREE.Mesh(geo,mat);
  mesh.rotation.x = -Math.PI/2;
  mesh.userData = d;
  group.add(mesh);

  start += angle;
});

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

window.addEventListener("mousemove", e => {
  mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const hit = raycaster.intersectObjects(group.children);

  if (hit.length) {
    const d = hit[0].object.userData;
    tooltip.style.display = "block";
    tooltip.innerHTML = `${d.label} — ${d.value}%`;
    tooltip.style.left = e.clientX + 12 + "px";
    tooltip.style.top = e.clientY + 12 + "px";
  } else {
    tooltip.style.display = "none";
  }
});

window.addEventListener("click", () => {
  raycaster.setFromCamera(mouse, camera);
  const hit = raycaster.intersectObjects(group.children);
  if (hit.length) {
    const d = hit[0].object.userData;
    dTitle.textContent = d.label;
    dText.textContent = d.desc;
    detail.style.display = "block";
  }
});

window.addEventListener("scroll", () => {
  group.rotation.y = window.scrollY * 0.002;
});

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene,camera);
}
animate();
