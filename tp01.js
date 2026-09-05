const ESTADO_CORRER        = 0;
const ESTADO_SALTAR        = 1;
const ESTADO_SERIO         = 2;
const ESTADO_ENOJADO       = 3;
const ESTADO_POSE          = 4;
const ESTADO_CORRER_VOLVER = 5;

let estadoActual;

let imgFondo;

let nombresCorrer  = ["guerrero1.png", "guerrero6.png", "guerrero7.png", "guerrero8.png"];
let nombresSaltar  = ["guerrero2.png"];
let nombresSerio   = ["guerrero5.png"];
let nombresEnojado = ["guerrero3.png"];
let nombresPose    = ["guerrero4.png"];

let animCorrer  = new Array(nombresCorrer.length);
let animSaltar  = new Array(nombresSaltar.length);
let animSerio   = new Array(nombresSerio.length);
let animEnojado = new Array(nombresEnojado.length);
let animPose    = new Array(nombresPose.length);

let contadorTiempo = 0;
let velocidadAnimacion = 8; 

let posX, posY;
let posYBase = 380;
let anchoSprite = 150;
let altoSprite = 150;

function preload() {
  imgFondo = cargarSeguro("castillo.jpg");

  for (let i = 0; i < animCorrer.length; i++) {
    animCorrer[i] = cargarSeguro(nombresCorrer[i]);
  }

  for (let i = 0; i < animSaltar.length; i++) {
    animSaltar[i] = cargarSeguro(nombresSaltar[i]);
  }

  for (let i = 0; i < animSerio.length; i++) {
    animSerio[i] = cargarSeguro(nombresSerio[i]);
  }

  for (let i = 0; i < animEnojado.length; i++) {
    animEnojado[i] = cargarSeguro(nombresEnojado[i]);
  }

  for (let i = 0; i < animPose.length; i++) {
    animPose[i] = cargarSeguro(nombresPose[i]);
  }
}

function cargarSeguro(nombre) {
  let rutaSinEspacio = "assets/" + nombre;
  let ext = nombre.endsWith(".jpg") ? ".jpg" : ".png";
  let base = nombre.replace("guerrero", "").replace(ext, "");
  let rutaConEspacio = "assets/guerrero " + base + ext;

  return loadImage(
    rutaSinEspacio,
    () => {},
    () => {
      return loadImage(rutaConEspacio);
    }
  );
}

function setup() {
  createCanvas(800, 600);
  reiniciarEscena(); // Arranca directo a correr
}

function draw() {
  background(220); 

  // Dibujar el fondo castillo.jpg
  if (imgFondo) {
    image(imgFondo, 0, 0, width, height);
  }
  
  contadorTiempo++;

  switch (estadoActual) {
    case ESTADO_CORRER:
      posX -= 3;
      dibujarAnimacion(animCorrer, posX, posY, anchoSprite, altoSprite, true);
      if (posX <= 350) {
        cambiarEstado(ESTADO_SALTAR);
      }
      break;
      
    case ESTADO_SALTAR:
      if (contadorTiempo < 40) {
        posY = posYBase - sin(radians(contadorTiempo * 4.5)) * 100;
      } else {
        posY = posYBase;
        cambiarEstado(ESTADO_SERIO);
      }
      dibujarAnimacion(animSaltar, posX, posY, anchoSprite, altoSprite, true);
      break;
      
    case ESTADO_SERIO:
      dibujarAnimacion(animSerio, posX, posY, anchoSprite, altoSprite, true);
      if (contadorTiempo > 60) {
        cambiarEstado(ESTADO_ENOJADO);
      }
      break;
      
    case ESTADO_ENOJADO:
      dibujarAnimacion(animEnojado, posX, posY, anchoSprite, altoSprite, true);
      if (contadorTiempo > 60) {
        cambiarEstado(ESTADO_POSE);
      }
      break;
      
    case ESTADO_POSE:
      dibujarAnimacion(animPose, posX, posY, anchoSprite, altoSprite, true);
      if (contadorTiempo > 30) { 
        cambiarEstado(ESTADO_CORRER_VOLVER);
      }
      break;

    case ESTADO_CORRER_VOLVER:
      posX += 5;
      dibujarAnimacion(animCorrer, posX, posY, anchoSprite, altoSprite, false);
      // Al salir de la pantalla por la derecha, se reinicia el ciclo directamente
      if (posX > width) {
        reiniciarEscena();
      }
      break;
  }
}

function keyPressed() {
 
  if (key === 'r' || key === 'R') {
    reiniciarEscena();
  }
}


function dibujarAnimacion(frames, x, y, ancho, alto, espejar) {
  let indice = obtenerFrameActual(frames.length);
  
  push();
  if (espejar) {
    translate(x + ancho, y);
    scale(-1, 1);
    if (frames[indice]) image(frames[indice], 0, 0, ancho, alto);
  } else {
    if (frames[indice]) image(frames[indice], x, y, ancho, alto);
  }
  pop();
}

function cambiarEstado(nuevoEstado) {
  estadoActual = nuevoEstado;
  contadorTiempo = 0;
}

function obtenerFrameActual(totalFrames) {
  return floor(contadorTiempo / velocidadAnimacion) % totalFrames;
}

function reiniciarEscena() {
  posX = 750;
  posY = posYBase;
  cambiarEstado(ESTADO_CORRER);
}
