import * as THREE from '../libs/three.module.js'
 
class Icos extends THREE.Object3D {
  constructor(gui,icosGui) {
    super();
    
    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui,icosGui);
    
    // Un Mesh se compone de geometría y material
    var icosGeom = new THREE.IcosahedronGeometry(1, 0);
    // Como material se crea uno a partir de un color
    var icosMat = new THREE.MeshNormalMaterial();
    icosMat.flatShading = true;
    icosMat.needsUpdate = true;
  
    // Ya podemos construir el Mesh
    var icos = new THREE.Mesh (icosGeom, icosMat);
    // Y añadirlo como hijo del Object3D (el this)
    this.add (icos);
    
    // Las geometrías se crean centradas en el origen.
    // Como queremos que el sistema de referencia esté en la base,
    // subimos el Mesh de la caja la mitad de su altura 
  }
  
  createGUI (gui,icosGui) {
    // Controles para el tamaño, la orientación y la posición de la caja
    this.guiControls = {
      radio : 1.0,
      detail : 0.0,

      rotX : 0.0,
      rotY : 0.0,
      rotZ : 0.0,
      
      // Un botón para dejarlo todo en su posición inicial
      // Cuando se pulse se ejecutará esta función.
      reset : () => {
        this.guiControls.radio = 1.0;
        this.guiControls.detail = 0.0;
      }
    }
    
    // Se crea una sección para los controles de la caja
    var folder = gui.addFolder (icosGui);
    // Estas lineas son las que añaden los componentes de la interfaz
    // Las tres cifras indican un valor mínimo, un máximo y el incremento
    // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
    folder.add (this.guiControls, 'radio', 1.0, 5.0, 0.1).name ('Radio: ').listen();
    folder.add (this.guiControls, 'detail', 0.0, 5.0, 1.0).name ('Detalle: ').listen();

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
    var icosGeom = new THREE.IcosahedronGeometry(this.guiControls.radio, this.guiControls.detail);
    // Como material se crea uno a partir de un color
    var icosMat = new THREE.MeshNormalMaterial();
    icosMat.flatShading = true;
    icosMat.needsUpdate = true;
  
    // Ya podemos construir el Mesh
    var icos = new THREE.Mesh (icosGeom, icosMat);
    this.position.set(10, 0, 10);
    // Y añadirlo como hijo del Object3D (el this)
    this.add (icos);
    
    this.rotation.set (this.guiControls.rotX+=0.01,this.guiControls.rotY+=0.01,this.guiControls.rotZ+=0.01);
  }
}

export { Icos };