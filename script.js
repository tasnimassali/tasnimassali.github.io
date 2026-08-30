// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Scroll-reveal for sections
const revealTargets = document.querySelectorAll(".section > *");
revealTargets.forEach(el => el.classList.add("reveal"));

const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealTargets.forEach(el => io.observe(el));

// Hero network canvas: nodes representing distributed compute units,
// with periodic "sync packets" traveling along edges (BSP synchronization).
const canvas = document.getElementById("network-canvas");
const ctx = canvas.getContext("2d");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

let width, height, nodes, edges, packets;
const NODE_COUNT_BASE = 42;

function seedGraph() {
  const area = width * height;
  const count = Math.max(18, Math.min(NODE_COUNT_BASE, Math.round(area / 26000)));

  nodes = Array.from({ length: count }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.15,
    vy: (Math.random() - 0.5) * 0.15,
    r: 1.4 + Math.random() * 1.6
  }));

  edges = [];
  const maxDist = Math.min(width, height) * 0.22;
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dx = nodes[i].x - nodes[j].x;
      const dy = nodes[i].y - nodes[j].y;
      const d = Math.sqrt(dx * dx + dy * dy);
      if (d < maxDist) edges.push([i, j, d / maxDist]);
    }
  }

  packets = [];
}

function resize() {
  const hero = canvas.parentElement;
  width = canvas.width = hero.clientWidth;
  height = canvas.height = hero.clientHeight;
  seedGraph();
}

function spawnPacket() {
  if (!edges.length) return;
  const [a, b] = edges[Math.floor(Math.random() * edges.length)];
  packets.push({ a, b, t: 0, speed: 0.006 + Math.random() * 0.006 });
}

let lastSpawn = 0;

function tick(ts) {
  ctx.clearRect(0, 0, width, height);

  // drift nodes
  for (const n of nodes) {
    n.x += n.vx;
    n.y += n.vy;
    if (n.x < 0 || n.x > width) n.vx *= -1;
    if (n.y < 0 || n.y > height) n.vy *= -1;
  }

  // edges
  ctx.lineWidth = 1;
  for (const [i, j, ratio] of edges) {
    const a = nodes[i], b = nodes[j];
    ctx.strokeStyle = `rgba(85, 70, 216, ${(1 - ratio) * 0.22})`;
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.stroke();
  }

  // nodes
  for (const n of nodes) {
    ctx.beginPath();
    ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(24, 21, 40, 0.35)";
    ctx.fill();
  }

  // sync packets
  if (!lastSpawn || ts - lastSpawn > 550) {
    spawnPacket();
    lastSpawn = ts;
  }
  packets = packets.filter(p => p.t <= 1);
  for (const p of packets) {
    p.t += p.speed * 16;
    const a = nodes[p.a], b = nodes[p.b];
    if (!a || !b) continue;
    const x = a.x + (b.x - a.x) * p.t;
    const y = a.y + (b.y - a.y) * p.t;
    ctx.beginPath();
    ctx.arc(x, y, 2.2, 0, Math.PI * 2);
    ctx.fillStyle = "#E8623F";
    ctx.shadowColor = "#E8623F";
    ctx.shadowBlur = 6;
    ctx.fill();
    ctx.shadowBlur = 0;
  }

  requestAnimationFrame(tick);
}

function drawStatic() {
  // single quiet frame for reduced-motion users
  ctx.clearRect(0, 0, width, height);
  ctx.lineWidth = 1;
  for (const [i, j, ratio] of edges) {
    const a = nodes[i], b = nodes[j];
    ctx.strokeStyle = `rgba(85, 70, 216, ${(1 - ratio) * 0.16})`;
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.stroke();
  }
  for (const n of nodes) {
    ctx.beginPath();
    ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(24, 21, 40, 0.28)";
    ctx.fill();
  }
}

window.addEventListener("resize", () => {
  resize();
  if (prefersReducedMotion) drawStatic();
});

resize();
if (prefersReducedMotion) {
  drawStatic();
} else {
  requestAnimationFrame(tick);
}
