import { MeshNormalMaterial } from 'three';
import * as THREE from '../libs/three.module.js'
 
class Cone extends THREE.Object3D {
  constructor(gui,coneGui) {
    super();
    
    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui,coneGui);
    
    // Un Mesh se compone de geometría y material
    var coneGeom = new THREE.ConeGeometry (1, 1, 3);
    // Como material se crea uno a partir de un color
    var coneMat = new THREE.MeshNormalMaterial();
  
    // Ya podemos construir el Mesh
    var cone = new THREE.Mesh (coneGeom, coneMat);
    this.position.set(10, 10, 0);
    // Y añadirlo como hijo del Object3D (el this)
    this.add (cone);
    
    // Las geometrías se crean centradas en el origen.
    // Como queremos que el sistema de referencia esté en la base,
    // subimos el Mesh de la caja la mitad de su altura 
  }
  
  createGUI (gui,coneGui) {
    // Controles para el tamaño, la orientación y la posición de la caja
    this.guiControls = {
      sizeX : 1.0,
      sizeY : 1.0,
      sizeZ : 1.0,
      
      rotX : 0.0,
      rotY : 0.0,
      rotZ : 0.0,

      resolution : 3.0,
      
      // Un botón para dejarlo todo en su posición inicial
      // Cuando se pulse se ejecutará esta función.
      reset : () => {
        this.guiControls.sizeX = 1.0;
        this.guiControls.sizeY = 1.0;
        this.guiControls.sizeZ = 1.0;

        this.guiControls.resolution = 3.0;
      }
    } 
    
    // Se crea una sección para los controles de la caja
    var folder = gui.addFolder (coneGui);
    // Estas lineas son las que añaden los componentes de la interfaz
    // Las tres cifras indican un valor mínimo, un máximo y el incremento
    // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
    folder.add (this.guiControls, 'sizeX', 0.1, 5.0, 0.1).name ('Tamaño X : ').listen();
    folder.add (this.guiControls, 'sizeY', 0.1, 5.0, 0.1).name ('Tamaño Y : ').listen();
    folder.add (this.guiControls, 'sizeZ', 0.1, 5.0, 0.1).name ('Tamaño Z : ').listen();
    
    folder.add (this.guiControls, 'resolution', 3.0, 20.0, 1.0).name ('Resolucion : ').listen();

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
    var coneGeom = new THREE.ConeGeometry (1, 1, this.guiControls.resolution);
    // Como material se crea uno a partir de un color
    var coneMat = new THREE.MeshNormalMaterial();
  
    // Ya podemos construir el Mesh
    var cone = new THREE.Mesh (coneGeom, coneMat);
    this.position.set(10, 10, 0);
    // Y añadirlo como hijo del Object3D (el this)
    this.add (cone);
    
    this.rotation.set (this.guiControls.rotX+=0.01,this.guiControls.rotY+=0.01,this.guiControls.rotZ+=0.01);
    this.scale.set (this.guiControls.sizeX,this.guiControls.sizeY,this.guiControls.sizeZ);
  }
}

export { Cone };
