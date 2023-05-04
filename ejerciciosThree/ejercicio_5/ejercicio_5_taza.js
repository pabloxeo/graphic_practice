import { MeshLambertMaterial } from 'three';
import { Vector3 } from 'three';
import { MeshNormalMaterial } from 'three';
import * as THREE from '../libs/three.module.js'
import { CSG } from '../libs/CSG-v2.js'
 
class Taza extends THREE.Object3D {
  constructor() {
    super();
    
    var cylindGeom = new THREE.CylinderGeometry (5, 5, 10, 100);
    // Como material se crea uno a partir de un color
    var cylindMat = new THREE.MeshBasicMaterial( { color: 0xffffff } );
    cylindMat.flatShading = true;
    cylindMat.needsUpdate = true;
    var cylind = new THREE.Mesh (cylindGeom, cylindMat);

    var cylindRest = new THREE.CylinderGeometry (4, 4, 10, 100);
    // Como material se crea uno a partir de un color
    var cylindR = new THREE.Mesh (cylindRest, cylindMat);
    cylindR.translateY(1);

    

    var torusGeom = new THREE.TorusGeometry(3, 0.8, 20, 100);
    var torusMat = new THREE.MeshBasicMaterial( { color: 0xfffff } );
    torusMat.flatShading = true;
    torusMat.needsUpdate = true;
    
    var csg = new CSG();

    
   
    
    // Ya podemos construir el Mesh
    var torus = new THREE.Mesh (torusGeom, torusMat);
    torus.translateX(4.5);
    // Ya podemos construir el Mesh
    csg.union([cylind, torus])
    csg.subtract([cylindR]);
    var mesh = csg.toMesh();
    var geometry = new THREE.EdgesGeometry(mesh.geometry);

    var material = new THREE.LineBasicMaterial( { color: 0xff0000 } );

    var wireframe = new THREE.LineSegments( geometry, material );
    this.add(wireframe);
    
    this.add(mesh);
    
   
  }
  
  
  update () {


  }
}

export { Taza };
