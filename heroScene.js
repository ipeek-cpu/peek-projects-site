/**
 * Hero Scene - Three.js Orbital Core
 * Creates a 3D orbital visualization with floating nodes
 */

export function initHeroScene() {
    // Check for WebGL support
    if (!window.THREE) {
        console.warn('Three.js not loaded');
        return null;
    }

    const container = document.getElementById('hero-3d-container');
    if (!container) return null;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Check for disable-3d attribute
    const disable3D = document.body.hasAttribute('data-disable-3d');
    
    if (disable3D) {
        console.log('3D disabled via data attribute');
        return null;
    }

    // Scene setup
    const scene = new THREE.Scene();
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(
        60,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.z = 8;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
        alpha: true, 
        antialias: true,
        powerPreference: 'high-performance'
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0xFF7B00, 1, 100);
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xffffff, 0.8, 100);
    pointLight2.position.set(-5, -5, 5);
    scene.add(pointLight2);

    // Create orbital core group
    const orbitalGroup = new THREE.Group();
    scene.add(orbitalGroup);

    // Central core sphere
    const coreGeometry = new THREE.SphereGeometry(1, 32, 32);
    const coreMaterial = new THREE.MeshPhongMaterial({
        color: 0x2d3748,
        emissive: 0x1a202c,
        shininess: 100,
        specular: 0x444444
    });
    const coreSphere = new THREE.Mesh(coreGeometry, coreMaterial);
    orbitalGroup.add(coreSphere);

    // Create orbital nodes
    const nodes = [];
    const nodeCount = 8;
    const orbitRadius = 3;

    for (let i = 0; i < nodeCount; i++) {
        const angle = (i / nodeCount) * Math.PI * 2;
        const nodeGroup = new THREE.Group();
        
        // Alternate between different shapes
        let nodeGeometry;
        let nodeMaterial;
        
        if (i % 3 === 0) {
            // Orange cubes
            nodeGeometry = new THREE.BoxGeometry(0.3, 0.3, 0.3);
            nodeMaterial = new THREE.MeshPhongMaterial({
                color: 0xFF7B00,
                emissive: 0xFF7B00,
                emissiveIntensity: 0.3
            });
        } else if (i % 3 === 1) {
            // Dark spheres
            nodeGeometry = new THREE.SphereGeometry(0.15, 16, 16);
            nodeMaterial = new THREE.MeshPhongMaterial({
                color: 0x4a5568,
                shininess: 80
            });
        } else {
            // Gray tetrahedrons
            nodeGeometry = new THREE.TetrahedronGeometry(0.2);
            nodeMaterial = new THREE.MeshPhongMaterial({
                color: 0x718096,
                shininess: 60
            });
        }
        
        const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
        
        // Position nodes in orbit
        const x = Math.cos(angle) * orbitRadius;
        const y = Math.sin(angle) * orbitRadius * 0.5;
        const z = Math.sin(angle * 2) * 0.5;
        
        node.position.set(x, y, z);
        nodeGroup.add(node);
        orbitalGroup.add(nodeGroup);
        
        nodes.push({
            mesh: node,
            group: nodeGroup,
            angle: angle,
            speed: 0.2 + Math.random() * 0.3,
            orbitRadius: orbitRadius
        });
    }

    // Create orbital rings
    const ringGeometry = new THREE.TorusGeometry(orbitRadius, 0.01, 16, 100);
    const ringMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.15
    });
    
    const ring1 = new THREE.Mesh(ringGeometry, ringMaterial);
    ring1.rotation.x = Math.PI / 2;
    orbitalGroup.add(ring1);
    
    const ring2 = new THREE.Mesh(ringGeometry, ringMaterial.clone());
    ring2.rotation.y = Math.PI / 3;
    orbitalGroup.add(ring2);

    // Mouse interaction
    const mouse = { x: 0, y: 0 };
    const targetRotation = { x: 0, y: 0 };
    const currentRotation = { x: 0, y: 0 };

    function onMouseMove(event) {
        if (prefersReducedMotion) return;
        
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        
        targetRotation.x = mouse.y * 0.3;
        targetRotation.y = mouse.x * 0.3;
    }

    window.addEventListener('mousemove', onMouseMove);

    // Animation loop
    let animationId;
    const clock = new THREE.Clock();

    function animate() {
        animationId = requestAnimationFrame(animate);
        
        const elapsedTime = clock.getElapsedTime();
        
        // Rotate orbital group slowly
        if (!prefersReducedMotion) {
            orbitalGroup.rotation.y += 0.001;
            
            // Smooth mouse parallax
            currentRotation.x += (targetRotation.x - currentRotation.x) * 0.05;
            currentRotation.y += (targetRotation.y - currentRotation.y) * 0.05;
            
            camera.position.x = currentRotation.y * 2;
            camera.position.y = currentRotation.x * 2;
            camera.lookAt(scene.position);
            
            // Animate nodes in orbit
            nodes.forEach((nodeData, index) => {
                nodeData.angle += nodeData.speed * 0.005;
                
                const x = Math.cos(nodeData.angle) * nodeData.orbitRadius;
                const y = Math.sin(nodeData.angle) * nodeData.orbitRadius * 0.5;
                const z = Math.sin(nodeData.angle * 2) * 0.5;
                
                nodeData.mesh.position.set(x, y, z);
                
                // Rotate individual nodes
                nodeData.mesh.rotation.x += 0.01;
                nodeData.mesh.rotation.y += 0.01;
            });
            
            // Pulse core
            const scale = 1 + Math.sin(elapsedTime * 0.5) * 0.05;
            coreSphere.scale.set(scale, scale, scale);
        }
        
        renderer.render(scene, camera);
    }

    // Handle window resize
    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    window.addEventListener('resize', onWindowResize);

    // Start animation
    animate();

    // Cleanup function
    return function cleanup() {
        cancelAnimationFrame(animationId);
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('resize', onWindowResize);
        
        // Dispose of Three.js resources
        scene.traverse((object) => {
            if (object.geometry) object.geometry.dispose();
            if (object.material) {
                if (Array.isArray(object.material)) {
                    object.material.forEach(material => material.dispose());
                } else {
                    object.material.dispose();
                }
            }
        });
        
        renderer.dispose();
        if (container.contains(renderer.domElement)) {
            container.removeChild(renderer.domElement);
        }
    };
}
