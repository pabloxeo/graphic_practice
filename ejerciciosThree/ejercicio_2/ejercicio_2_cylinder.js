import * as THREE from '../libs/three.module.js'
 
class Cylind extends THREE.Object3D {
  constructor(gui,cylindGui) {
    super();
    
    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui,cylindGui);
    
    // Un Mesh se compone de geometría y material
    var cylindGeom = new THREE.CylinderGeometry (3, 3, 1, 3);
    // Como material se crea uno a partir de un color
    var cylindMat = new THREE.MeshNormalMaterial();
  
    // Ya podemos construir el Mesh
    var cylind = new THREE.Mesh (cylindGeom, cylindMat);
    // Y añadirlo como hijo del Object3D (el this)
    this.add (cylind);
    
    // Las geometrías se crean centradas en el origen.
    // Como queremos que el sistema de referencia esté en la base,
    // subimos el Mesh de la caja la mitad de su altura 
  }
  
  createGUI (gui,cylindGui) {
    // Controles para el tamaño, la orientación y la posición de la caja
    this.guiControls = {
      radio_top : 1,
      radio_bot : 1,
      altura : 1,
      
      rotX : 0.0,
      rotY : 0.0,
      rotZ : 0.0,

      resolution : 3.0,
      
      // Un botón para dejarlo todo en su posición inicial
      // Cuando se pulse se ejecutará esta función.
      reset : () => {
        this.guiControls.radio_top = 1.0;
        this.guiControls.radio_bot = 1.0;
        this.guiControls.altura = 1.0;

        this.guiControls.resolution = 3.0;
      }
    } 
    
    // Se crea una sección para los controles de la caja
    var folder = gui.addFolder (cylindGui);
    // Estas lineas son las que añaden los componentes de la interfaz
    // Las tres cifras indican un valor mínimo, un máximo y el incremento
    // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
    folder.add (this.guiControls, 'radio_top', 0.1, 5.0, 0.1).name ('Radio arriba: ').listen();
    folder.add (this.guiControls, 'radio_bot', 0.1, 5.0, 0.1).name ('Radio abajo : ').listen();
    folder.add (this.guiControls, 'altura', 0.1, 5.0, 0.1).name ('Altura : ').listen();
    
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
    var cylindGeom = new THREE.CylinderGeometry (this.guiControls.radio_top, this.guiControls.radio_bot, this.guiControls.altura, this.guiControls.resolution);
    // Como material se crea uno a partir de un color
    var cylindMat = new THREE.MeshNormalMaterial();
  
    // Ya podemos construir el Mesh
    var cylind = new THREE.Mesh (cylindGeom, cylindMat);
    this.position.set(0, 10, 0);
    // Y añadirlo como hijo del Object3D (el this)
    this.add (cylind);
    
    this.rotation.set (this.guiControls.rotX+=0.01,this.guiControls.rotY+=0.01,this.guiControls.rotZ+=0.01);
  }
}

export { Cylind };
