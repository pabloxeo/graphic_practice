import { CubicBezierCurve3 } from 'three';
import { MeshLambertMaterial } from 'three';
import { Vector3 } from 'three';
import { MeshNormalMaterial } from 'three';
import * as THREE from '../libs/three.module.js'
 
class Pawn extends THREE.Object3D {
  constructor(gui,boxGui) {
    super();
    
    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui,boxGui);
    
    // Para crear la figura por revolución
    /*
    const points = [];
    for ( let i = 0; i < 10; i ++ ) {
      points.push( new THREE.Vector3(i, i));
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute( 0, new THREE.BufferAttribute( vertices, 3 ) );
    geometry = new THREE.LatheGeometry( points, 3, 0);
    const material = new THREE.MeshBasicMaterial({color :0xFFFFFF}); 
    const lathe = new THREE.Mesh( geometry, material );

    this.add( lathe );
    */

    var points = [];
    // Se añaden puntos al array
    //for ( let i = 8; i <= 8*2*Math.PI; i+=0.01 ) {
    //}
    const curve = new THREE.CubicBezierCurve3(new THREE.Vector3(2.5, 1, 0),
                                              new THREE.Vector3(1, 2, 0), 
                                              new THREE.Vector3(1, 2, 0), 
                                              new THREE.Vector3(1, 5, 0));
    const curve2 = new THREE.CubicBezierCurve3(new THREE.Vector3(1, 5, 0),
                                               new THREE.Vector3(2, 6, 0),
                                               new THREE.Vector3(1, 7, 0),
                                               new THREE.Vector3(0, 7, 0));
    var points1 = curve.getPoints(10);
    var points2 = curve2.getPoints(10);
    points = points1.concat(points2);
    points.reverse();
    points.push(new Vector3(2.5, 0, 0));
    points.push(new Vector3(0, 0, 0));
    points.reverse();
    // mediante unas cuantas instrucciones como la siguiente
    // definimos el contorno a revolucionar
    // Para crear la figura por revolución
    var mat = new MeshLambertMaterial();
    mat.flatShading = true;
    mat.needsUpdate = true;
    // Para crear una línea visible, como en el vídeo
    var lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
    var line = new THREE.Line (lineGeometry, mat);
    var latheObject = new THREE.Mesh (new THREE.LatheGeometry (points), mat);
    latheObject.translateX(20);
    var latheObject_var = new THREE.Mesh (new THREE.LatheGeometry (points), mat);
    latheObject_var.translateX(10);


    this.add(latheObject);
    this.add(latheObject_var);
    this.add(line);
      
  }
  
  createGUI (gui,boxGui) {
    // Controles para el tamaño, la orientación y la posición de la caja
    this.guiControls = {
      resolution : 3.0,
      phi : 2.0,
      
      // Un botón para dejarlo todo en su posición inicial
      // Cuando se pulse se ejecutará esta función.
      reset : () => {
        this.guiControls.phi = 2.0;
      }
    } 
    
    // Se crea una sección para los controles de la caja
    var folder = gui.addFolder (boxGui);
    // Estas lineas son las que añaden los componentes de la interfaz
    // Las tres cifras indican un valor mínimo, un máximo y el incremento
    // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
    folder.add (this.guiControls, 'resolution', 3.0, 20.0, 1.0).name ('Resolucion : ').listen();
    folder.add (this.guiControls, 'phi', 0.0, 2*Math.PI, 0.1).name ('Phi : ').listen();
    
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
    var points = [];
    // Se añaden puntos al array
    //for ( let i = 8; i <= 8*2*Math.PI; i+=0.01 ) {
    //}
    const curve = new THREE.CubicBezierCurve3(new THREE.Vector3(2.5, 1, 0),
                                              new THREE.Vector3(1, 2, 0), 
                                              new THREE.Vector3(1, 2, 0), 
                                              new THREE.Vector3(1, 5, 0));
    const curve2 = new THREE.CubicBezierCurve3(new THREE.Vector3(1, 5, 0),
                                               new THREE.Vector3(2, 6, 0),
                                               new THREE.Vector3(1, 7, 0),
                                               new THREE.Vector3(0, 7, 0));
    var points1 = curve.getPoints(10);
    var points2 = curve2.getPoints(10);
    points = points1.concat(points2);
    points.reverse();
    points.push(new Vector3(2.5, 0, 0));
    points.push(new Vector3(0, 0, 0));
    points.reverse();
    // mediante unas cuantas instrucciones como la siguiente
    // definimos el contorno a revolucionar
    // Para crear la figura por revolución
    var mat = new MeshNormalMaterial();
    mat.flatShading = true;
    mat.needsUpdate = true;
    // Para crear una línea visible, como en el vídeo
    var lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
    var line = new THREE.Line (lineGeometry, mat);
    var latheObject = new THREE.Mesh (new THREE.LatheGeometry (points), mat);
    latheObject.translateX(20);
    var latheObject_var = new THREE.Mesh (new THREE.LatheGeometry (points, this.guiControls.resolution,0 , this.guiControls.phi)
                                          , mat);
    latheObject_var.translateX(10);


    this.add(latheObject);
    this.add(latheObject_var);
    this.add(line);

  }
}

export { Pawn };
