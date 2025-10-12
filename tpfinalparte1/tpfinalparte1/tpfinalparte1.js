//link al video de youtube: https://youtu.be/shN-5zAYl7E

let imagenes = [];
let pantallaActual = 0;
let botones = [];
let pantallas = [];
let musicFondo;

class Boton {
    constructor(x, y, ancho, alto, texto, destino) {
        this.x = x;
        this.y = y;
        this.ancho = ancho;
        this.alto = alto;
        this.texto = texto;
        this.destino = destino;
    }
    
    mostrar() {
        fill(147, 51, 234);
        stroke(255);
        strokeWeight(2);
        rect(this.x, this.y, this.ancho, this.alto, 15);

        fill(255);
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(14);
        text(this.texto, this.x + this.ancho/2, this.y + this.alto/2);
    }
    
    clickeado(mx, my) {
        return mx > this.x && mx < this.x + this.ancho &&
               my > this.y && my < this.y + this.alto;
    }
}

class Pantalla {
    constructor(titulo, texto, opciones, numImagen) {
        this.titulo = titulo;
        this.texto = texto;
        this.opciones = opciones;
        this.numImagen = numImagen;
    }
    
    mostrar() {
        for (let i = 0; i < height; i++) {
            let c = lerpColor(color(25, 25, 60), color(60, 25, 60), i / height);
            stroke(c);
            line(0, i, width, i);
        }

        image(imagenes[this.numImagen], width/2 - 150, 30, 300, 220);
    
        noFill();
        stroke(255, 215, 0);
        strokeWeight(3);
        rect(width/2 - 150, 30, 300, 220);
      
        fill(255, 215, 0);
        noStroke();
        textAlign(CENTER);
        textSize(24);
        text(this.titulo, width/2, 270);
        
        stroke(255, 105, 180);
        strokeWeight(2);
        line(120, 290, width - 120, 290);
        
        fill(255);
        textSize(14);
        textAlign(CENTER, TOP);
        text(this.texto, 40, 305, 560, 100);
    }
}


function preload() {
    for (let i = 1; i <= 22; i++) {
        imagenes[i] = loadImage('data/winx' + i + '.png');
    }
     musicFondo = loadSound('data/music.mp3');
}

function setup() {
  createCanvas(640, 480);
  inicializarHistoria();
  crearBotones();
  musicFondo.setVolume(1.0);
}


function draw() {
    pantallas[pantallaActual].mostrar();
    for (let boton of botones) {
        boton.mostrar();
    }
  
}

function mousePressed() {
  if (!musicFondo.isPlaying()) {
    userStartAudio(); 
    musicFondo.loop();
  }
    for (let boton of botones) {
        if (boton.clickeado(mouseX, mouseY)) {
            pantallaActual = boton.destino;
            crearBotones();
            break;
        }
    }
}

function inicializarHistoria() {
    pantallas[0] = new Pantalla(
        'WINX CLUB',
        'Sombras de Realix\n\nUna historia interactiva\nTus decisiones cambiarán el destino de Bloom',
        [{texto: 'Comenzar', destino: 1}],
        1
    );
    
    pantallas[1] = new Pantalla(
        'Entrenamiento Dimensional',
        'Bloom y Avalon viajan entre dimensiones.\nUna sombra se adhiere a la Llama del Dragón.\n\nAvalon: "Mantén el control, Bloom"\nBloom: "Siento algo oscuro dentro de mí"',
        [
            {texto: 'Resistir la energía', destino: 2},
            {texto: 'Ignorar la sensación', destino: 3}
        ],
        2
    );
    
    pantallas[2] = new Pantalla(
        'El Regreso a Alfea',
        'Bloom resiste y contiene la oscuridad.\nDe vuelta en Alfea, se siente extraña.\n\nLockette: "Tu luz brilla distinto"\nBloom: "Necesito ayuda"',
        [
            {texto: 'Contarle a las Winx', destino: 4},
            {texto: 'Mantenerlo en secreto', destino: 5}
        ],
        3
    );
    
    pantallas[3] = new Pantalla(
        'El Regreso a Alfea',
        'Bloom ignora la sensación oscura.\nEl virus gana fuerza silenciosamente.\n\nLockette: "Tu luz brilla más fría"\nBloom: "Solo estoy cansada"',
        [{texto: 'Continuar', destino: 5}],
        22
    );
    
    pantallas[4] = new Pantalla(
        'Confianza',
        'Bloom confía en sus amigas.\nLas Winx prometen ayudarla.\n\nStella: "No estás sola"\nFlora: "Juntas somos más fuertes"',
        [{texto: 'Continuar', destino: 6}],
        4
    );
    
    pantallas[5] = new Pantalla(
        'Cambio de Look',
        'Las Winx intentan animar a Bloom.\nPero el brillo de sus ojos se apaga.\n\nFlora: "¿Hacemos jardinería?"\nBloom: "Mejor caminaré sola"',
        [
            {texto: 'Ir con Flora', destino: 7},
            {texto: 'Salir sola', destino: 8}
        ],
        5
    );
    
    pantallas[6] = new Pantalla(
        'Transformación Oscura',
        'Bloom practica su transformación.\nUn aura oscura aparece.\n\nBloom: "¿Qué me pasa?"\nStella: "¡Bloom, resiste!"',
        [
            {texto: 'Las Winx la detienen', destino: 9},
            {texto: 'Dejar fluir la energía', destino: 10}
        ],
        6
    );
    
    pantallas[7] = new Pantalla(
        'Momento de Calma',
        'Bloom va al jardín con Flora.\nLas plantas se marchitan a su paso.\n\nFlora: "Las plantas sienten tu oscuridad"\nBloom: "Tengo miedo"',
        [{texto: 'Volver a Alfea', destino: 9}],
        7
    );
    
    pantallas[8] = new Pantalla(
        'Archivos de Alfea',
        'Bloom camina hipnotizada a los Archivos.\nConcorda intenta detenerla.\n\nConcorda: "¡Detente!"\nBloom: "¡Nadie me detendrá!"',
        [
            {texto: 'Robar el Códex', destino: 11},
            {texto: 'Dudar', destino: 10}
        ],
        8
    );
    
    pantallas[9] = new Pantalla(
        'Diagnóstico',
        'Avalon examina la energía de Bloom.\n\nAvalon: "Es un virus de sombras"\nStella: "¿Y si no puede volver?"\nBloom: "Siento su voz en mi cabeza"',
        [
            {texto: 'Aceptar tratamiento', destino: 12},
            {texto: 'Rechazar ayuda', destino: 11}
        ],
        9
    );
    
    pantallas[10] = new Pantalla(
        'Duda',
        'Bloom lucha contra la oscuridad.\nPero es demasiado tarde.\n\nBloom: "No, esto no está bien"\nVoz: "Es tu destino"',
        [{texto: 'La oscuridad gana', destino: 11}],
        10
    );
    
    pantallas[11] = new Pantalla(
        'La Caída - Dark Bloom',
        'Kerborg aparece. Bloom entrega el Códex.\nSu cabello se enciende en rojo y violeta.\n\nKerborg: "Bienvenida"\nDark Bloom: "Yo elijo mi destino"',
        [{texto: 'Continuar', destino: 13}],
        11
    );
    
    pantallas[12] = new Pantalla(
        'El Antídoto',
        'Avalon dispara un rayo purificador.\nBloom cae exhausta pero consciente.\n\nBloom: "Les fallé"\nStella: "Te perdonamos"',
        [
            {texto: 'Aceptar perdón', destino: 14},
            {texto: 'Alejarse', destino: 13}
        ],
        12
    );
    
    pantallas[13] = new Pantalla(
        'Fortaleza de Darkar',
        'Bloom es secuestrada por Avalon falso.\nDarkar la ata con cadenas de sombra.\n\nDarkar: "Tú eres la llave"\nDark Bloom: "¿Y si te traiciono?"',
        [{texto: 'Continuar', destino: 15}],
        13
    );
    
    pantallas[14] = new Pantalla(
        'Preparación',
        'Las Winx se preparan para el rescate.\n\nStella: "Vamos por ti, Bloom"\nSky: "Te encontraremos"\nBloom: "Por favor, apúrense"',
        [{texto: 'Las Winx parten', destino: 15}],
        14
    );
    
    pantallas[15] = new Pantalla(
        'Camino a Realix',
        'Bloom y Darkar van hacia Realix.\nLas Winx los siguen.\n\nDarkar: "Seremos invencibles"\nDark Bloom: "O condenados"',
        [
            {texto: 'Enviar señal', destino: 16},
            {texto: 'Rendirse', destino: 17}
        ],
        15
    );
    
    pantallas[16] = new Pantalla(
        'El Ritual',
        'Bloom envía una señal. Las Winx llegan.\n\nSky: "¡Bloom, no sos esto!"\nBloom: "No puedo controlarlo"\nStella: "¡Sí podés!"',
        [{texto: 'Decidir destino', destino: 18}],
        16
    );
    
    pantallas[17] = new Pantalla(
        'El Ritual',
        'Bloom se rinde. Las Winx llegan tarde.\n\nDarkar: "¡Es mía!"\nBloom: (silencio)\nFlora: "¡Recordá quién sos!"',
        [{texto: 'Convergencia Final', destino: 18}],
        17
    );
    
    pantallas[18] = new Pantalla(
        'Convergencia Final',
        'El momento decisivo ha llegado.\nTres caminos se abren ante Bloom.\n\n¿Qué elegirá?',
        [
            {texto: 'Destruir Códex', destino: 19},
            {texto: 'Esperar a las Trix', destino: 20},
            {texto: 'Aceptar oscuridad', destino: 21}
        ],
        6
    );
    
    pantallas[19] = new Pantalla(
        '★ FINAL: Sacrificio ★',
        'Bloom destruye el Códex.\nPierde parte de su magia pero salva a todos.\n\nBloom: "Prefiero perder mi poder\nantes que perderme a mí misma"\n\n¡FINAL HEROICO!',
        [
            {texto: 'Reiniciar', destino: 0},
            {texto: 'Créditos', destino: 22}
        ],
        20
    );
    
    pantallas[20] = new Pantalla(
        '★ FINAL: Redención ★',
        'Las Trix atacan a Darkar.\nBloom es liberada y purificada.\n\nStella: "¡Sabía que volverías!"\n\n¡FINAL DE ESPERANZA!',
        [
            {texto: 'Reiniciar', destino: 0},
            {texto: 'Créditos', destino: 22}
        ],
        18
    );
    
    pantallas[21] = new Pantalla(
        '★ FINAL: Reina de Realix ★',
        'Bloom elige el poder absoluto.\nDestruye a Darkar y reina sola.\n\nDark Bloom: "Ahora Realix me pertenece"\n\n¡FINAL OSCURO!',
        [
            {texto: 'Reiniciar', destino: 0},
            {texto: 'Créditos', destino: 22}
        ],
        19
    );
    
    pantallas[22] = new Pantalla(
        '★ CRÉDITOS ★',
        'Desarrollado por: Lucas Meza & Delfina Silva \n\nBasado en: Winx Club Temporada 2\nCreador: Iginio Straffi\n',
        [{texto: 'Volver al inicio', destino: 0}],
        21
    );
}

function crearBotones() {
    botones = [];
    let opciones = pantallas[pantallaActual].opciones;
    
    if (opciones.length === 1) {
        botones.push(new Boton(220, 400, 200, 45, 
            opciones[0].texto, opciones[0].destino));
    } else if (opciones.length === 2) {
        botones.push(new Boton(100, 400, 200, 45,
            opciones[0].texto, opciones[0].destino));
        botones.push(new Boton(340, 400, 200, 45,
            opciones[1].texto, opciones[1].destino));
    } else if (opciones.length === 3) {
        botones.push(new Boton(40, 400, 180, 45,
            opciones[0].texto, opciones[0].destino));
        botones.push(new Boton(230, 400, 180, 45,
            opciones[1].texto, opciones[1].destino));
        botones.push(new Boton(420, 400, 180, 45,
            opciones[2].texto, opciones[2].destino));
    }
}
