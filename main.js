// main.js — motion + optional hydration + 3D lazy-load
const canvas = document.getElementById('hero-canvas');
const fallbackImg = document.querySelector('.hero .fallback');
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function supportsWebGL(){
  try{ const c = document.createElement('canvas'); return !!(window.WebGLRenderingContext && (c.getContext('webgl') || c.getContext('experimental-webgl'))); } catch(e){ return false }
}

window.addEventListener('load', async () => {
  if (window.gsap){
    gsap.from('.hero-overlay .kicker', {y:10, opacity:0, duration:.6, ease:'power1.out'});
    gsap.from('.hero-overlay h1', {y:10, opacity:0, duration:.7, delay:.1, ease:'power1.out'});
    gsap.from('.hero-overlay .sub', {y:10, opacity:0, duration:.7, delay:.2, ease:'power1.out'});
    gsap.from('.hero-overlay .cta', {y:10, opacity:0, duration:.7, delay:.3, ease:'power1.out'});
    gsap.utils.toArray('section .section-title').forEach((el) => {
      gsap.from(el, {opacity:0, y:12, duration:.7, scrollTrigger:{trigger:el, start:'top 85%'}});
    });
  }

  // Optional hydration from content.json (safe if missing)
  try {
    const res = await fetch('content.json', {cache: 'no-store'});
    if (res.ok) {
      const c = await res.json();
      document.querySelector('.kicker').textContent = c.hero.kicker;
      document.querySelector('h1').textContent = c.hero.headline;
      document.querySelector('.sub').textContent = c.hero.subtext;
    }
  } catch(e){}

  // 3D
  if (!supportsWebGL() || prefersReduced) { canvas.style.display='none'; fallbackImg.style.display='block'; return; }
  fallbackImg.style.display='none'; canvas.style.display='block';
  const start = () => import('./heroScene.js').then(m => m.initHeroScene(canvas));
  if ('requestIdleCallback' in window){ requestIdleCallback(start, {timeout: 1000}); } else { setTimeout(start, 250); }
});
