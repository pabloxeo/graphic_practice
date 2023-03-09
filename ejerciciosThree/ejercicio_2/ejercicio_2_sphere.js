import { MeshNormalMaterial } from 'three';
import * as THREE from '../libs/three.module.js'
 
class Sphere extends THREE.Object3D {
  constructor(gui,sphereGui) {
    super();
    
    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui,sphereGui);
    
    // Un Mesh se compone de geometría y material
    var sphereGeom = new THREE.SphereGeometry(1, 3, 2);
    // Como material se crea uno a partir de un color
    var sphereMat = new THREE.MeshNormalMaterial();
  
    // Ya podemos construir el Mesh
    var sphere = new THREE.Mesh (sphereGeom, sphereMat);
    // Y añadirlo como hijo del Object3D (el this)
    this.add (sphere);
    
    // Las geometrías se crean centradas en el origen.
    // Como queremos que el sistema de referencia esté en la base,
    // subimos el Mesh de la caja la mitad de su altura 
  }
  
  createGUI (gui,sphereGui) {
    // Controles para el tamaño, la orientación y la posición de la caja
    this.guiControls = {
      radio : 1.0,
      res_v: 3.0,
      res_h : 2.0,
      
      // Un botón para dejarlo todo en su posición inicial
      // Cuando se pulse se ejecutará esta función.
      reset : () => {
        this.guiControls.radio = 1.0;
        this.guiControls.res_v = 3.0;
        this.guiControls.res_h = 2.0;
      }
    } 
    
    // Se crea una sección para los controles de la caja
    var folder = gui.addFolder (sphereGui);
    // Estas lineas son las que añaden los componentes de la interfaz
    // Las tres cifras indican un valor mínimo, un máximo y el incremento
    // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
    folder.add (this.guiControls, 'radio', 0.1, 10, 0.1).name ('Radio: ').listen();
    folder.add (this.guiControls, 'res_v', 3, 32.0, 1).name ('Res. Vertical : ').listen();
    
    folder.add (this.guiControls, 'res_h', 2, 32.0, 1.0).name ('Res. Horizontal : ').listen();

    folder.add (this.guiControls, 'reset').name ('[ Reset ]');
  }
  
  update () {
    // Con independencia de cómo se escriban las 3 siguientes líneas, el orden en el que se aplican las transformaciones es:
    // Primero, el escalado
    // Segundo, la rotación en Z
    // Después, la rotación en Y
    // Luego, la rotación en X
    // Y por último la traslación
  
    this.clear();
    var sphereGeom = new THREE.SphereGeometry(this.guiControls.radio, this.guiControls.res_v, this.guiControls.res_h);
    // Como material se crea uno a partir de un color
    var sphereMat = new THREE.MeshNormalMaterial();
  
    // Ya podemos construir el Mesh
    var sphere = new THREE.Mesh (sphereGeom, sphereMat);
    // Y añadirlo como hijo del Object3D (el this)
    this.add (sphere);
    
    this.rotation.set (this.guiControls.rotX+=0.01,this.guiControls.rotY+=0.01,this.guiControls.rotZ+=0.01);
  }
}

export { Sphere };
