import { MeshLambertMaterial } from 'three';
import { Vector3 } from 'three';
import { MeshNormalMaterial } from 'three';
import * as THREE from '../libs/three.module.js'
import { MTLLoader } from '../libs/MTLLoader.js'
import { OBJLoader } from '../libs/OBJLoader.js'
 
class Reloj extends THREE.Object3D {
  constructor() {
    super();
    
    var sphereGeom = new THREE.SphereGeometry(1, 20, 20);
    sphereGeom.translate(10, 0, 0);
    var sphereMat = new THREE.MeshNormalMaterial();
    sphereMat.flatShading = true;
    sphereMat.needsUpdate = true;
  
    // Ya podemos construir el Mesh
    var sphere = new THREE.Mesh (sphereGeom, sphereMat);

    this.add(sphere);
    
    
   
  }
  
  
  update () {
    this.rotateY(0.01);
  }
}

export { Reloj };
