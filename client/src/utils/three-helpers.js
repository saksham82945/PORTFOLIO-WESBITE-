import * as THREE from 'three';

/**
 * Create the main starfield Points mesh
 * @param {number} count - number of stars
 * @returns {THREE.Points}
 */
export const createStarField = (count = 2000) => {
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);
  const colors    = new Float32Array(count * 3);

  const palette = [
    new THREE.Color('#7F77DD'),
    new THREE.Color('#5DCAA5'),
    new THREE.Color('#FFFFFF'),
    new THREE.Color('#EF9F27'),
    new THREE.Color('#FFFFFF'),
    new THREE.Color('#FFFFFF'),
  ];

  for (let i = 0; i < count; i++) {
    positions[i * 3]     = (Math.random() - 0.5) * 60;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 60;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 60;

    const color = palette[Math.floor(Math.random() * palette.length)];
    colors[i * 3]     = color.r;
    colors[i * 3 + 1] = color.g;
    colors[i * 3 + 2] = color.b;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color',    new THREE.BufferAttribute(colors,    3));

  const material = new THREE.PointsMaterial({
    size:         0.12,
    vertexColors: true,
    transparent:  true,
    opacity:      0.9,
    sizeAttenuation: true,
  });

  return new THREE.Points(geometry, material);
};

/**
 * Create a nebula particle cloud
 */
export const createNebulaCloud = (color = '#7F77DD', count = 300, spread = 15) => {
  const geometry  = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    positions[i * 3]     = (Math.random() - 0.5) * spread;
    positions[i * 3 + 1] = (Math.random() - 0.5) * spread;
    positions[i * 3 + 2] = (Math.random() - 0.5) * spread;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const material = new THREE.PointsMaterial({
    size:        0.25,
    color:       new THREE.Color(color),
    transparent: true,
    opacity:     0.18,
    sizeAttenuation: true,
  });

  return new THREE.Points(geometry, material);
};

/**
 * Linear interpolation helper
 */
export const lerp = (a, b, t) => a + (b - a) * t;
