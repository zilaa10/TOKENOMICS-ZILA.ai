const bg = document.getElementById("bg");
const sceneBG = new THREE.Scene();

const cameraBG = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  1,
  1000
);
cameraBG.position.z = 100;

const rendererBG = new THREE.WebGLRenderer({ canvas: bg, alpha: true });
rendererBG.setSize(window.innerWidth, window.innerHeight);

const points = [];
const geometry = new THREE.BufferGeometry();
const vertices = [];

for (let i = 0; i < 400; i++) {
  const x = (Math.random() - 0.5) * 200;
  const y = (Math.random() - 0.5) * 200;
  const z = (Math.random() - 0.5) * 200;
  vertices.push(x, y, z);
  points.push({ x, y, z, vx: Math.random() * 0.02, vy: Math.random() * 0.02 });
}

geometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));

const material = new THREE.PointsMaterial({
  color: 0x00ffff,
  size: 1.5
});

const particles = new THREE.Points(geometry, material);
sceneBG.add(particles);

function animateBG() {
  requestAnimationFrame(animateBG);
  const pos = geometry.attributes.position.array;

  for (let i = 0; i < points.length; i++) {
    pos[i * 3] += points[i].vx;
    pos[i * 3 + 1] += points[i].vy;
  }

  geometry.attributes.position.needsUpdate = true;
  rendererBG.render(sceneBG, cameraBG);
}
animateBG();
