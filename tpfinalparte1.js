//Alumnas: Amel Peralta y Delfina Silva, Profesor: Leo Garay
//Comisión 5

//VARIABLES GLOBALES DE NAVEGACIÓN Y CONTENIDO
let imagenes = [];            
let lineasCreditos = ["Autor: Edward Packard", "Alumnas: Amel Peralta y Delfina Silva"];      
let estado = 0;              
let creditosY = 0;           
let frameInicio = 0;         
let finY = -50;              
let Y_FINAL_FIN = 80;       
let finalAlcanzado = ""; 

//Narrativa de 15 pantallas (índice = estado - 1)
let frases = [
  'Washington D.C. Obbard te asigna investigar el nuevo canto de las ballenas.', // ESTADO 1
  'Llegas al aeropuerto Logan en Boston. Tienes tres pistas principales.', // ESTADO 2
  'Visita a la casa del Dr. Hans Klein en Cambridge. La grabacion fue borrada.', // ESTADO 3
  'Centro de Estudios Marinos. Te informan sobre la carta robada del Presidente.', // ESTADO 4
  'Residencia de la Sra. DuMont. Te interroga sobre el valor de las ballenas.', // ESTADO 5
  'Centro de Computos - MIT: Quedan atrapados en el auto con gas lacrimogeno.', // ESTADO 6
  'Sede de la KGB en Nueva York: Infiltracion en la guarida de Ivan Ivenko.', // ESTADO 7
  'La Sra. DuMont te confiesa la existencia de la Caverna en Isla Deception.', // ESTADO 8
  'Faro Galey Point: Los espias suben la cinta a una balsa de rescate.', // ESTADO 9
  'Persecucion Maritima: La lancha queda inutilizada en aguas congeladas.', // ESTADO 10
  'FINAL 1: TRATADO ECOLOGICO - EE.UU. y URSS declaran reserva protegida.', // ESTADO 11
  'FINAL 2: SALVADO POR LA BALLENA - Una ballena te lleva a la playa.', // ESTADO 12
  'FINAL 3: CAPTURA Y FRACASO - Quedas encarcelado en un submarino.', // ESTADO 13
  '' // ESTADO 14 (Pantalla Final de Créditos)
];

// Lista de imágenes asignadas exactamente a cada estado (0 al 14)
let nombresImagenes = [
  "1casablanca.jpg",                 // ESTADO 0 (Portada / Casablanca)
  "2primerpantallaintermedia.jpg",   // ESTADO 1 (Washington D.C.)
  "3segundapantallaintermedia.jpg",   // ESTADO 2 (Aeropuerto Logan)
  "5drkleinvisitacasa.jpg",           // ESTADO 3 (Casa Dr. Hans Klein)
  "6entrevistarueff.jpg",             // ESTADO 4 (Centro Estudios Marinos)
  "7entrevistasradumont.jpg",         // ESTADO 5 (Residencia Sra. DuMont)
  "23comoreaccionas.jpg",             // ESTADO 6 (MIT Gas lacrimógeno / ¿Cómo reaccionas?)
  "25queestrategiausas.jpg",          // ESTADO 7 (Sede KGB / ¿Qué estrategia usas?)
  "16pantallaintermediasecreto.jpg",  // ESTADO 8 (Caverna Isla Deception)
  "32comointervienes.jpg",            // ESTADO 9 (Faro Galey Point / ¿Cómo intervienes?)
  "34congelado.jpg",                  // ESTADO 10 (Aguas congeladas)
  "36primerfinal.jpg",                // ESTADO 11 (Final 1)
  "37segundofinal.jpg",               // ESTADO 12 (Final 2)
  "38tercerfinal.jpg",                // ESTADO 13 (Final 3)
  "39pantallacredito.jpg"             // ESTADO 14 (Créditos)
];

function preload() {
  for (let i = 0; i < nombresImagenes.length; i++) {
    imagenes[i] = loadImage(
      "data/" + nombresImagenes[i],
      () => console.log("Cargada correctamente: " + nombresImagenes[i]),
      () => console.warn("Error de carga en: " + nombresImagenes[i])
    ); 
  } 
} 

function setup() {
  createCanvas(800, 450);    
  textAlign(CENTER, CENTER);  
  textSize(20);              
  frameInicio = frameCount;  
}

function draw() {
  background(0); 

  // Dibuja la imagen alineada con el estado actual
  let imgIndex = constrain(estado, 0, imagenes.length - 1);

  if (imagenes[imgIndex] && imagenes[imgIndex].width > 0) {
    image(imagenes[imgIndex], 0, 0, width, height); 
  }

  ///LÓGICA DEL ESTADO INICIO (estado === 0)
  if (estado === 0) {
    let framesTranscurridos = frameCount - frameInicio; 
    let opacidad = map(framesTranscurridos, 0, 50, 0, 255);  
    opacidad = constrain(opacidad, 0, 255);                   

    rectMode(CORNER);
    noStroke();
    fill(0, 0, 0, 180);
    rect(0, height / 2 - 90, width, 180);

    fill(255, opacidad);   
    stroke(0, opacidad);
    strokeWeight(3);
    textSize(52);          
    textStyle(BOLD);       
    text("TU CLAVE ES JONÁS", width / 2, height / 2 - 45); 

    if (opacidad >= 250) { 
      botonilli(width / 2 - 90, height / 2 + 35, 180, 45, "INICIAR"); 
    }

  } else {

    ///NARRATIVA DE PANTALLAS
    let indiceFrase = estado - 1; 

    if (indiceFrase >= 0 && indiceFrase < frases.length && frases[indiceFrase] !== '') {
      rectMode(CORNER);
      noStroke();
      fill(0, 0, 0, 190);
      rect(0, height - 60, width, 60);

      fill(255);            
      stroke(0);
      strokeWeight(2);
      textSize(18);        
      textStyle(BOLD);
      text(frases[indiceFrase], width / 2, height - 30); 
    }

    //Última pantalla: Créditos y FIN (Estado 14)
    if (estado === 14) {
      let Y_FINAL_CREDITOS = 210; 
      let velocidad_creditos = 1; 
      let velocidad_fin = 5;

      if (finY < Y_FINAL_FIN) {
        finY += velocidad_fin;
        if (finY > Y_FINAL_FIN) finY = Y_FINAL_FIN;
      }

      creditosY = manejarCreditos(creditosY, Y_FINAL_CREDITOS, velocidad_creditos); 
      let currentY_creditos = creditosY; 

      fill(255);
      stroke(0);
      strokeWeight(3);

      let centroX = width / 2;
      let separacion = 30; 

      textSize(64); 
      textStyle(BOLD);
      text("FIN", centroX, finY);

      textSize(22);
      textStyle(BOLD);
      fill(126, 153, 255);
      text(finalAlcanzado, centroX, currentY_creditos);

      fill(255);
      textSize(18);
      textStyle(NORMAL);
      if (lineasCreditos.length > 0) { 
        text(lineasCreditos[0], centroX, currentY_creditos + separacion); 
      }
      if (lineasCreditos.length > 1) { 
        text(lineasCreditos[1], centroX, currentY_creditos + separacion * 2); 
      }

      if (finY === Y_FINAL_FIN) {
        botonilli(width / 2 - 120, 370, 240, 50, "VOLVER AL INICIO"); 
      }
    }
  }

  ///BOTONES DE DECISIÓN

  //Estado 2: Pistas principales
  if (estado === 2) {
    let botonAncho = 210; 
    let botonAlto = 50;
    let separacion = 20; 
    let posY = 330;

    botonilli(width / 2 - botonAncho / 2 - botonAncho - separacion, posY, botonAncho, botonAlto, "Dr. Hans Klein"); 
    botonilli(width / 2 - botonAncho / 2, posY, botonAncho, botonAlto, "Centro Estudios"); 
    botonilli(width / 2 + botonAncho / 2 + separacion, posY, botonAncho, botonAlto, "Sra. DuMont"); 
  }

  //Estado 6: Gas MIT
  if (estado === 6) {
    let botonAncho = 220; 
    let botonAlto = 50;
    let separacion = 20; 
    let posXIzquierda = width / 2 - separacion / 2 - botonAncho;
    let posXDerecha = width / 2 + separacion / 2;

    botonilli(posXIzquierda, 330, botonAncho, botonAlto, "Aguantar"); 
    botonilli(posXDerecha, 330, botonAncho, botonAlto, "Rendirse");
  }

  //Estado 7: KGB Nueva York
  if (estado === 7) {
    let botonAncho = 220; 
    let botonAlto = 50;
    let separacion = 20; 
    let posXIzquierda = width / 2 - separacion / 2 - botonAncho;
    let posXDerecha = width / 2 + separacion / 2;

    botonilli(posXIzquierda, 330, botonAncho, botonAlto, "Bomba de humo"); 
    botonilli(posXDerecha, 330, botonAncho, botonAlto, "Falsa identidad");
  }

  //Estado 9: Faro Galey Point
  if (estado === 9) {
    let botonAncho = 220; 
    let botonAlto = 50;
    let separacion = 20; 
    let posXIzquierda = width / 2 - separacion / 2 - botonAncho;
    let posXDerecha = width / 2 + separacion / 2;

    botonilli(posXIzquierda, 330, botonAncho, botonAlto, "Perseguir lancha"); 
    botonilli(posXDerecha, 330, botonAncho, botonAlto, "Infiltrar casa de te");
  }

  let estadosDecision = [0, 2, 6, 7, 9, 14];
  if (!estadosDecision.includes(estado)) { 
    let flechaTamCirculo = 46; 
    let margen = 25; 
    let flechaY = height - 90; 
    let flechaXDerecha = width - margen - flechaTamCirculo / 2;

    dibujarFlecha(flechaXDerecha, flechaY, flechaTamCirculo); 
  }
}

///INTERACCIONES
function mousePressed() {

  let flechaTamCirculo = 46; 
  let margen = 25; 
  let flechaY = height - 90; 
  let flechaXDerecha = width - margen - flechaTamCirculo / 2;
  let flechaDerechaClickada = overMouseFlecha(flechaXDerecha, flechaY, flechaTamCirculo);

  //Estado 14: VOLVER AL INICIO
  if (estado === 14) {
    if (finY === Y_FINAL_FIN) { 
      if (overMouse(width / 2 - 120, 370, 240, 50)) {
        estado = 0;           
        creditosY = 0;   
        finY = -50; 
        frameInicio = frameCount; 
        return; 
      }
    }
    return; 
  }

  //Estado 0: INICIAR
  if (estado === 0) {
    if (overMouse(width / 2 - 90, height / 2 + 35, 180, 45)) {
      let framesTranscurridos = frameCount - frameInicio;
      let opacidad = map(framesTranscurridos, 0, 50, 0, 255); 

      if (opacidad >= 250) {
        estado = 1; 
        return; 
      }
      return; 
    }
  }

  //Estado 2: 3 Pistas
  if (estado === 2) {
    let botonAncho = 210; 
    let botonAlto = 50;
    let separacion = 20; 
    let posY = 330;

    let posA = width / 2 - botonAncho / 2 - botonAncho - separacion;
    let posB = width / 2 - botonAncho / 2;
    let posC = width / 2 + botonAncho / 2 + separacion;

    if (overMouse(posA, posY, botonAncho, botonAlto)) { 
      estado = 3; // Dr. Klein
      return; 
    } else if (overMouse(posB, posY, botonAncho, botonAlto)) { 
      estado = 4; // Centro Estudios
      return; 
    } else if (overMouse(posC, posY, botonAncho, botonAlto)) { 
      estado = 5; // Sra. DuMont
      return; 
    }
  }

  //Estado 6: Gas MIT
  if (estado === 6) {
    let botonAncho = 220; 
    let botonAlto = 50;
    let separacion = 20; 
    let posXIzquierda = width / 2 - separacion / 2 - botonAncho;
    let posXDerecha = width / 2 + separacion / 2;

    if (overMouse(posXIzquierda, 330, botonAncho, botonAlto)) {
      estado = 11; // FINAL 1
      return;
    } else if (overMouse(posXDerecha, 330, botonAncho, botonAlto)) {
      estado = 13; // FINAL 3
      return;
    }
  }

  //Estado 7: KGB Nueva York
  if (estado === 7) {
    let botonAncho = 220; 
    let botonAlto = 50;
    let separacion = 20; 
    let posXIzquierda = width / 2 - separacion / 2 - botonAncho;
    let posXDerecha = width / 2 + separacion / 2;

    if (overMouse(posXIzquierda, 330, botonAncho, botonAlto)) {
      estado = 11; // FINAL 1
      return;
    } else if (overMouse(posXDerecha, 330, botonAncho, botonAlto)) {
      estado = 13; // FINAL 3
      return;
    }
  }

  //Estado 9: Faro Galey Point
  if (estado === 9) {
    let botonAncho = 220; 
    let botonAlto = 50;
    let separacion = 20; 
    let posXIzquierda = width / 2 - separacion / 2 - botonAncho;
    let posXDerecha = width / 2 + separacion / 2;

    if (overMouse(posXIzquierda, 330, botonAncho, botonAlto)) {
      estado = 10; // Perseguir lancha -> Aguas congeladas
      return;
    } else if (overMouse(posXDerecha, 330, botonAncho, botonAlto)) {
      estado = 13; // Infiltrar casa de té -> FINAL 3
      return;
    }
  }

  if (flechaDerechaClickada) {
    if (estado === 1) { estado = 2; }
    else if (estado === 3) { estado = 6; }
    else if (estado === 4) { estado = 7; }
    else if (estado === 5) { estado = 8; }
    else if (estado === 8) { estado = 9; }
    else if (estado === 10) { estado = 12; } // Aguas congeladas -> FINAL 2
    else if (estado === 11 || estado === 12 || estado === 13) {
      if (estado === 11) finalAlcanzado = "FINAL 1: TRATADO ECOLÓGICO";
      else if (estado === 12) finalAlcanzado = "FINAL 2: SALVADO POR LA BALLENA";
      else if (estado === 13) finalAlcanzado = "FINAL 3: CAPTURA Y FRACASO";

      estado = 14; 
      creditosY = -50; 
      finY = -50; 
    }
  }
}

function manejarCreditos(yActual, yFinal, vel) { 
  if (yActual >= yFinal) { 
    yActual = yFinal;    
    return yFinal;       
  } else {                   
    yActual += vel;      
    return yActual;      
  }
}

function botonilli(posX, posY, tamX, tamY, textoB) { 
  rectMode(CORNER);
  let fontSize = 15; 
  let isHoverAllowed = true; 

  if (isHoverAllowed && overMouse(posX, posY, tamX, tamY)) { 
    fill(126, 153, 255); 
  } else {                                                   
    fill(200, 120, 0, 220); 
  }
  
  stroke(255);
  strokeWeight(2);
  rect(posX, posY, tamX, tamY, tamY / 4); 

  textSize(fontSize); 
  textStyle(BOLD);    

  fill(255); 
  stroke(0);
  strokeWeight(2);
  textAlign(CENTER, CENTER); 
  text(textoB, posX + tamX / 2, posY + tamY / 2); 
}

function dibujarFlecha(cX, cY, diam) { 
  let colorBase = color(200, 120, 0, 220); 
  let colorHover = color(126, 153, 255);   

  let tam = diam * 0.55;         
  let desp = tam * 0.15;         

  if (overMouseFlecha(cX, cY, diam)) { 
    fill(colorHover); 
  } else {                                           
    fill(colorBase);  
  }

  stroke(255);
  strokeWeight(2);                                       
  circle(cX, cY, diam); 

  fill(255); 
  stroke(0);
  strokeWeight(1);

  triangle(
    cX - tam / 2 + desp, cY - tam / 2, 
    cX - tam / 2 + desp, cY + tam / 2, 
    cX + tam / 2 + desp, cY                    
  );
}

function overMouse(posX, posY, tamX, tamY) { 
  return mouseX > posX && mouseX < posX + tamX && mouseY > posY && mouseY < posY + tamY;
}

function overMouseFlecha(centerX, centerY, diameter) { 
  let d = dist(mouseX, mouseY, centerX, centerY);
  return d < diameter / 2;
}
