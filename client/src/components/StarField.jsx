import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { createStarField, createNebulaCloud, lerp } from '../utils/three-helpers';

const StarField = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    const isMobile = window.innerWidth < 768;
    const starCount = isMobile ? 800 : 2000;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x020010, 1);
    mount.appendChild(renderer.domElement);

    // Scene & Camera
    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 5;

    // Stars
    const stars = createStarField(starCount);
    scene.add(stars);

    // Nebula clouds
    const nebula1 = createNebulaCloud('#7F77DD', 300, 20);
    const nebula2 = createNebulaCloud('#5DCAA5', 200, 25);
    const nebula3 = createNebulaCloud('#EF9F27', 150, 18);
    nebula1.position.set(5, 3, -5);
    nebula2.position.set(-6, -2, -8);
    nebula3.position.set(2, -5, -3);
    scene.add(nebula1, nebula2, nebula3);

    // Mouse tracking
    let targetX = 0, targetY = 0, currentX = 0, currentY = 0;
    const onMouseMove = (e) => {
      targetX = (e.clientX / window.innerWidth  - 0.5) * 0.5;
      targetY = (e.clientY / window.innerHeight - 0.5) * 0.5;
    };
    window.addEventListener('mousemove', onMouseMove);

    // Pause when tab hidden
    const onVisibility = () => {
      if (document.hidden) renderer.setAnimationLoop(null);
      else renderer.setAnimationLoop(animate);
    };
    document.addEventListener('visibilitychange', onVisibility);

    // Resize
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    // Animation loop
    const animate = () => {
      stars.rotation.y   += 0.0003;
      stars.rotation.x   += 0.0001;
      nebula1.rotation.y -= 0.0002;
      nebula2.rotation.y += 0.0001;
      nebula3.rotation.x -= 0.0002;

      currentX = lerp(currentX, targetX, 0.03);
      currentY = lerp(currentY, targetY, 0.03);
      camera.position.x = currentX;
      camera.position.y = -currentY;

      renderer.render(scene, camera);
    };

    renderer.setAnimationLoop(animate);

    return () => {
      renderer.setAnimationLoop(null);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibility);
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}
    />
  );
};

export default StarField;
