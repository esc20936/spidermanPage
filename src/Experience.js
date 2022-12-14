import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import model from "./assets/Model/spiderman.glb?url";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { GlitchPass } from "three/addons/postprocessing/GlitchPass.js";
import { HalftonePass } from "three/examples/jsm/postprocessing/HalftonePass.js";

const loadingManager = new THREE.LoadingManager();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 1;
camera.position.y = 3.5;
camera.position.z = -1;

scene.add(camera);

let animations = [];

const lerp = (x, y, a) => {
  return (1 - a) * x + a * y;
};

const scalePercent = (start, end) => {
  return (scrollY - start) / (end - start);
};

let plane2 = new THREE.Mesh(
  new THREE.PlaneGeometry(10, 10, 10, 10),
  new THREE.MeshBasicMaterial({ color: 0x000000 })
);
plane2.position.z = -0.7;
plane2.position.y = -5;
scene.add(plane2);

let plane3 = new THREE.Mesh(
  new THREE.PlaneGeometry(10, 10, 10, 10),
  new THREE.MeshBasicMaterial({ color: 0xff0000 })
);
plane3.position.z = -1.5;
plane3.position.y = -4;
scene.add(plane3);

// load spiderman  glb model
let spiderman = null;
const gltfLoader = new GLTFLoader(loadingManager);
gltfLoader.load(model, (gltf) => {
  gltf.scene.traverse((child) => {
    if (child.type == "SkinnedMesh") {
      child.frustumCulled = false;
    }
  });
  spiderman = gltf.scene;
  spiderman.scale.set(2, 2, 2);
  spiderman.position.set(1, 0, -1);

  scene.add(spiderman);
});
const toRadians = (angle) => {
  return angle * (Math.PI / 180);
};

animations.push({
  start: 0,
  end: 20,
  func: () => {
    camera.position.z = lerp(-1, -0.5, scalePercent(0, 20));
    camera.position.y = lerp(3.5, 2.7, scalePercent(0, 20));
  },
});
animations.push({
  start: 20,
  end: 45,
  func: () => {
    camera.position.y = lerp(2.7, 3.2, scalePercent(20, 45));
    camera.position.x = lerp(1, 1.2, scalePercent(20, 45));
  },
});

animations.push({
  start: 45,
  end: 70,
  func: () => {
    camera.position.y = lerp(3.2, 3.4, scalePercent(45, 70));
    camera.position.x = lerp(1.2, 1, scalePercent(45, 70));
  },
});

animations.push({
  start: 70,
  end: 99,
  func: () => {
    plane3.position.y = lerp(-4, 3.5, scalePercent(70, 99));
    plane2.position.y = lerp(-5, 3, scalePercent(70, 99));
  },
});

// load texture

let scrollY = 0;
window.addEventListener("scroll", () => {
  scrollY =
    ((document.documentElement.scrollTop || document.body.scrollTop) /
      ((document.documentElement.scrollHeight || document.body.scrollHeight) -
        document.documentElement.clientHeight)) *
    100;

});

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// add light to model
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const directionLight = new THREE.DirectionalLight(0xffffff, 1);
directionLight.position.set(0, 0, 1);
directionLight.lookAt(0, 0, 2);
scene.add(directionLight);

const pointLight1 = new THREE.PointLight(0xffffff, 1);
pointLight1.position.set(0, 0, 1);
scene.add(pointLight1);

// red light
const pointLight = new THREE.PointLight(0xff0000, 1);
pointLight.position.set(1, -1, 2.5);
scene.add(pointLight);

const playAnimations = () => {
  animations.forEach((anim) => {
    if (scrollY >= anim.start && scrollY <= anim.end) {
      anim.func();
    }
  });
};

let composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));

let glitchPass = new GlitchPass();
composer.addPass(glitchPass);

let dotScreenPass = new HalftonePass();
composer.addPass(dotScreenPass);

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  composer.setSize(sizes.width, sizes.height);
  composer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

const clock = new THREE.Clock();
const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // controls.update()
  renderer.render(scene, camera);

  playAnimations();

  composer.render();

  window.requestAnimationFrame(tick);
};

tick();
