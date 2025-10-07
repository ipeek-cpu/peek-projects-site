// heroScene.js — Orbital Core
export function initHeroScene(canvas){
  const renderer = new THREE.WebGLRenderer({canvas, antialias:true, alpha:true});
  const DPR = Math.min(window.devicePixelRatio || 1, 1.75);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(55, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
  camera.position.set(0, 0, 6);

  const amb = new THREE.AmbientLight(0xffffff, .9); scene.add(amb);
  const dir = new THREE.DirectionalLight(0xffffff, .6); dir.position.set(2,3,4); scene.add(dir);

  const coreGeo = new THREE.IcosahedronGeometry(1.0, 2);
  const coreMat = new THREE.MeshStandardMaterial({color:0x10141a, metalness:.3, roughness:.35, envMapIntensity:.6});
  const core = new THREE.Mesh(coreGeo, coreMat); scene.add(core);

  const group = new THREE.Group(); scene.add(group);
  const nodeGeo = new THREE.SphereGeometry(0.06, 16, 16);
  const nodeMat = new THREE.MeshStandardMaterial({color:0xFF7B00, emissive:0x351a00, emissiveIntensity:.4});
  const N = 80;
  for(let i=0;i<N;i++){
    const m = new THREE.Mesh(nodeGeo, nodeMat.clone());
    const r = 2.0 + Math.random()*1.2;
    const t = Math.random()*Math.PI*2;
    const p = Math.acos(2*Math.random()-1);
    m.userData = {r, t, p, speed: 0.1 + Math.random()*0.25};
    m.position.set(r*Math.sin(p)*Math.cos(t), r*Math.sin(p)*Math.sin(t), r*Math.cos(p));
    group.add(m);
  }

  function resize(){
    const w = canvas.clientWidth; const h = canvas.clientHeight || canvas.parentElement.clientHeight;
    renderer.setPixelRatio(DPR); renderer.setSize(w, h, false);
    camera.aspect = w/h; camera.updateProjectionMatrix();
  }
  resize(); window.addEventListener('resize', resize);

  const target = new THREE.Vector2(); const lerp = (a,b,t)=>a+(b-a)*t;
  window.addEventListener('pointermove', (e)=>{
    const x = (e.clientX / window.innerWidth) * 2 - 1;
    const y = (e.clientY / window.innerHeight) * 2 - 1;
    target.set(x*0.5, -y*0.4);
  });

  let rafId; const clock = new THREE.Clock();
  function tick(){
    const t = clock.getElapsedTime();
    core.rotation.y += 0.0035;
    group.children.forEach((m,i)=>{
      const d = m.userData; d.t += d.speed*0.0025; d.p += Math.sin(t*0.2 + i)*0.0005;
      const r = d.r; const ct = Math.cos(d.t), st = Math.sin(d.t); const sp = Math.sin(d.p), cp = Math.cos(d.p);
      m.position.set(r*sp*ct, r*sp*st, r*cp);
    });
    camera.position.x = lerp(camera.position.x, target.x, 0.04);
    camera.position.y = lerp(camera.position.y, target.y, 0.04);
    camera.lookAt(0,0,0);
    renderer.render(scene, camera);
    rafId = requestAnimationFrame(tick);
  }

  const io = new IntersectionObserver(entries=>{
    entries.forEach(entry=>{ if(entry.isIntersecting){ if(!rafId) tick(); } else { cancelAnimationFrame(rafId); rafId = undefined; } })
  }, {threshold: .05});
  io.observe(canvas); tick();
}
