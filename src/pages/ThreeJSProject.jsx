import { useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

function ThreeJSProject() {
  const navigate = useNavigate();
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Créez un canvas dynamiquement et attachez-le à `mountRef`
    const canvas = document.createElement('canvas');
    canvas.classList.add('webgl');
    mountRef.current.appendChild(canvas);

    // Initialisation de Three.js
    const scene = new THREE.Scene();

    // Charger un modèle GLTF
    const loader = new GLTFLoader();
    loader.load('/bottle.glb', (gltf) => {
      const model = gltf.scene;

      // Si nécessaire, ajustez les matériaux ici
      model.traverse((child) => {
        if (child.isMesh) {
          child.material.transparent = true;
          child.material.opacity = 0.7; // Ajustez la transparence
          child.material.roughness = 0.1;
          child.material.metalness = 0.5;
        }
      });

      scene.add(model);
    });
    // Lumières
    const ambientLight = new THREE.AmbientLight(0xffffff, 1); // Lumière ambiante douce
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // Dimensions
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    window.addEventListener('resize', () => {
      // Met à jour les tailles
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;

      // Met à jour la caméra
      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();

      // Met à jour le renderer
      renderer.setSize(sizes.width, sizes.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });

    // Caméra
    const camera = new THREE.PerspectiveCamera(35, sizes.width / sizes.height, 0.1, 100);
    camera.position.set(3, 5, 10); // Ajustez la position selon votre modèle
    scene.add(camera);

    // Contrôles
    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Animation
    const animate = () => {
      controls.update();
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      mountRef.current?.removeChild(canvas);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-white">
      <div ref={mountRef} className="fixed inset-0" />
      <div className="relative z-10 container mx-auto px-4 py-16">
        <button
          onClick={() => navigate('/', { state: { scrollToProjects: true } })}
          className="mb-8 py-3 text-white/80 hover:text-white transition-all duration-300"
        >
          ← Retour aux projets
        </button>
      </div>
    </div>
  );
}

export default ThreeJSProject;
