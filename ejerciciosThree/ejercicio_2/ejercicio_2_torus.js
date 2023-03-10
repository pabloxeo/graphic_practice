import * as THREE from '../libs/three.module.js'
 
class Torus extends THREE.Object3D {
  constructor(gui,torusGui) {
    super();
    
    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui,torusGui);
    
    // Un Mesh se compone de geometría y material
    var torusGeom = new THREE.TorusGeometry(1, 0.2, 3, 3);
    // Como material se crea uno a partir de un color
    var torusMat = new THREE.MeshNormalMaterial();
    torusMat.flatShading = true;
    torusMat.needsUpdate = true;
  
    // Ya podemos construir el Mesh
    var torus = new THREE.Mesh (torusGeom, torusMat);
    // Y añadirlo como hijo del Object3D (el this)
    this.add (torus);
    
    // Las geometrías se crean centradas en el origen.
    // Como queremos que el sistema de referencia esté en la base,
    // subimos el Mesh de la caja la mitad de su altura 
  }
  
  createGUI (gui,torusGui) {
    // Controles para el tamaño, la orientación y la posición de la caja
    this.guiControls = {
      radio : 1.0,
      tubo : 0.2,
      res_tr : 3.0,
      res_tb : 3.0,

      rotX : 0.0,
      rotY : 0.0,
      rotZ : 0.0,
      
      // Un botón para dejarlo todo en su posición inicial
      // Cuando se pulse se ejecutará esta función.
      reset : () => {
        this.guiControls.radio = 1.0;
        this.guiControls.tubo = 0.2;
        this.guiControls.res_tr = 3.0;
        this.guiControls.res_tb = 3.0;
      }
    }
    
    // Se crea una sección para los controles de la caja
    var folder = gui.addFolder (torusGui);
    // Estas lineas son las que añaden los componentes de la interfaz
    // Las tres cifras indican un valor mínimo, un máximo y el incremento
    // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
    folder.add (this.guiControls, 'radio', 1.0, 5.0, 0.1).name ('Radio: ').listen();
    folder.add (this.guiControls, 'tubo', 0.2, 5.0, 0.1).name ('Tamaño tubo: ').listen();
    folder.add (this.guiControls, 'res_tr', 3.0, 20.0, 1.0).name ('Res Toro: ').listen();
    folder.add (this.guiControls, 'res_tb', 3.0, 20.0, 1.0).name ('Res Tubo: ').listen();

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
    var torusGeom = new THREE.TorusGeometry(this.guiControls.radio, this.guiControls.tubo, this.guiControls.res_tr, this.guiControls.res_tb);
    // Como material se crea uno a partir de un color
    var torusMat = new THREE.MeshNormalMaterial();
    torusMat.flatShading = true;
    torusMat.needsUpdate = true;
  
    // Ya podemos construir el Mesh
    var torus = new THREE.Mesh (torusGeom, torusMat);
    this.position.set(0, 0, 10);
    // Y añadirlo como hijo del Object3D (el this)
    this.add (torus);
    
    this.rotation.set (this.guiControls.rotX+=0.01,this.guiControls.rotY+=0.01,this.guiControls.rotZ+=0.01);
  }
}

export { Torus };