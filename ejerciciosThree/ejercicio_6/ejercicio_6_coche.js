import { MeshLambertMaterial } from 'three';
import { Vector3 } from 'three';
import { MeshNormalMaterial } from 'three';
import * as THREE from '../libs/three.module.js'
import { MTLLoader } from '../libs/MTLLoader.js'
import { OBJLoader } from '../libs/OBJLoader.js'
import * as TWEEN from '../libs/tween.esm.js'

class Car extends THREE.Object3D {
  constructor() {
    super();
    
    var mtld = new MTLLoader();
    var objld = new OBJLoader();
    var group = new THREE.Group();
    mtld.load("../models/porsche911/911.mtl", 
      (materials) => {
        objld.setMaterials(materials);
        objld.load("../models/porsche911/Porsche_911_GT2.obj",
          (object) => {
            group.add(object);
          }, null, null
        );
      }
    );
    
    var spline = new THREE.CatmullRomCurve3([new THREE.Vector3(0, 10, 0)
                                            ,new THREE.Vector3(20, 0, 2)
                                            ,new THREE.Vector3(10, 0, 14)
                                            ,new THREE.Vector3(0, 0, 12)
                                            ,new THREE.Vector3(0, 0, 0) ], true);
    var geometryLine = new THREE.BufferGeometry();
    geometryLine.setFromPoints(spline.getPoints(50));
    var material = new THREE.LineBasicMaterial({color: 0xff0000, linewidth: 2});
    var visibleSpline = new THREE.Line(geometryLine, material);
    //this.add(visibleSpline);
   
    var origen = {t:1};
    var final = {t:0};

    var anim = new TWEEN.Tween(origen).to(final, 4000)
               .onUpdate(() => {
                var posicion =  spline.getPointAt(origen.t);
                group.position.copy(posicion);
                var tangente = spline.getTangentAt(origen.t);
                posicion.add(tangente);
                group.lookAt(posicion);
               })
               .repeat(Infinity)
               .start();
    this.add(group);

  }
  
  
  update () {
    TWEEN.update();
  }
}

export { Car };
