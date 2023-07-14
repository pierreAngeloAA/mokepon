const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
const sectionReiniciar = document.getElementById('reiniciar')
const botonMascotaJugador = document.getElementById('boton-mascota')
const botonReniciar = document.getElementById('boton-reiniciar')
sectionReiniciar.style.display = 'none'

const sectionSeleccionarMascota = document.getElementById('seleccionar-mascota')
const spanMascotaJugador =document.getElementById('mascota-jugador')

const spanMascotaEnemigo = document.getElementById('mascota-enemigo')

const spanVidasJugador = document.getElementById('vidas-jugador')
const spanVidasEnemigo = document.getElementById('vidas-enemigo')

const sectionMensajes = document.getElementById('resultado')

const ataquesDelJugador = document.getElementById('ataques-del-jugador')
const ataquesDelEnemigo = document.getElementById('ataques-del-enemigo')
const contenedorTarjetas = document.getElementById('contenedorTarjetas')  
const contenedorAtaques = document.getElementById('contenedorAtaques')  

const sectionVerMapa = document.getElementById("ver-mapa")
const mapa = document.getElementById("mapa")

let mokepones = []
let ataqueJugador = []
let ataqueEnemigo = []
let opcionDeMokepones
let inputHipodoge 
let inputCapipepo 
let inputRatigueya 
let mascotaJugador
let mascotaDeJugadorObjeto
let ataquesMokepon 
let ataquesMokeponEnemigo
let botonFuego 
let botonAgua 
let botonTierra 
let botones = []
let indexAtaqueJugador
let indexAtaqueEnemigo 
let victoriasJugador = 0
let victoriasEnemigo = 0
let vidasJugador = 3
let vidasEnemigo = 3
let lienzo = mapa.getContext("2d")
let intervalo 
let mapaBackgraund = new Image()
mapaBackgraund.src = './assets/mokemap.png'

//CLASE MOKEPON

class Mokepon{
    constructor(nombre, foto, vida) {
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
        this.x = 20
        this.y = 30
        this.ancho = 80
        this.alto = 80
        this.mapaFoto = new Image()
        this.mapaFoto.src = foto
        this.velocidadX = 0
        this.velocidadY = 0
    }
}


// SEMILLAS
let hipodoge = new Mokepon('Hipodoge','./assets/mokepons_mokepon_hipodoge_attack.webp',5)
let capipepo = new Mokepon('Capipepo','./assets/mokepons_mokepon_capipepo_attack.webp',5)
let ratigueya = new Mokepon('Ratigueya','./assets/mokepons_mokepon_ratigueya_attack.webp',5)

hipodoge.ataques.push(
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '🌱', id: 'boton-tierra'},
)
ratigueya.ataques.push(
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '🌱', id: 'boton-tierra'},
)
capipepo.ataques.push(
    {nombre: '🌱', id: 'boton-tierra'},
    {nombre: '🌱', id: 'boton-tierra'},
    {nombre: '🌱', id: 'boton-tierra'},
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '💧', id: 'boton-agua'},
)

mokepones.push(hipodoge,capipepo,ratigueya)

function iniciarJuego(){

    sectionSeleccionarAtaque.style.display = 'none'
    sectionVerMapa.style.display = 'none'

    mokepones.forEach((mokepon) => {
        opcionDeMokepones = `
            <input type="radio" name="mascota" id=${mokepon.nombre}>
            <label class="tarjeta-de-mokepon" for=${mokepon.nombre}>
                <p>${mokepon.nombre}</p>
                <img src=${mokepon.foto} alt=${mokepon.nombre}>
            </label>
        `
        contenedorTarjetas.innerHTML += opcionDeMokepones

        // por que la creacion de los input estan dentro del ciclo?
        inputHipodoge = document.getElementById('Hipodoge');
        inputCapipepo = document.getElementById('Capipepo');
        inputRatigueya = document.getElementById('Ratigueya');
    });

    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)
       
    botonReniciar.addEventListener('click',reiniciarJuego) 
}

function seleccionarMascotaJugador(){
    sectionSeleccionarMascota.style.display = 'none'

    //sectionSeleccionarAtaque.style.display = 'flex'
    
    if (inputHipodoge.checked) {
        spanMascotaJugador.innerHTML= inputHipodoge.id
        mascotaJugador = inputHipodoge.id
    }else if (inputCapipepo.checked) {
        spanMascotaJugador.innerHTML= inputCapipepo.id
        mascotaJugador = inputCapipepo.id
    }else if (inputRatigueya.checked) {
        spanMascotaJugador.innerHTML= inputRatigueya.id
        mascotaJugador = inputRatigueya.id
    }else{
        alert("¡Seleccione Una Opccion!") 
    }
    
    extraerAtaques(mascotaJugador)
    sectionVerMapa.style.display = 'flex'
    iniciarMapa()
    seleccionarMascotaEnemigo()-   
}

function extraerAtaques(mascotaJugador){
    let ataques
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador == mokepones[i].nombre){
            ataques = mokepones[i].ataques
        }
    }
    mostrarAtaques(ataques)
}

function mostrarAtaques(ataques){
    ataques.forEach((ataque) => {
       ataquesMokepon = `
       <button id=${ataque.id} class="boton-de-ataque BAtaques">${ataque.nombre}</button>
       `
       contenedorAtaques.innerHTML += ataquesMokepon
    })
    botonFuego = document.getElementById('boton-fuego')
    botonAgua = document.getElementById('boton-agua')
    botonTierra = document.getElementById('boton-tierra')

    botones = document.querySelectorAll('.BAtaques')
}

function secuenciaAtaque(){
    botones.forEach((boton) => {
        boton.addEventListener('click',(e) => {
            if (e.target.textContent === '🔥') {
                ataqueJugador.push('FUEGO')
                console.log(ataqueJugador)  
                boton.style.background = '#112758'
                boton.disabled=true
            }else if (e.target.textContent === '💧'){
                ataqueJugador.push('AGUA')
                console.log(ataqueJugador)  
                boton.style.background = '#112758'
                boton.disabled=true   
            }else{
                ataqueJugador.push('TIERRA')
                console.log(ataqueJugador)  
                boton.style.background = '#112758'
                boton.disabled=true
            }
            ataqueAleatorioEnemigo()
        })
    })
   
}

function seleccionarMascotaEnemigo(){
    let mascotaAleatorio = aleatorio(0, mokepones.length - 1 ) 
    
    spanMascotaEnemigo.innerHTML = mokepones[mascotaAleatorio].nombre
    ataquesMokeponEnemigo = mokepones[mascotaAleatorio].ataques
    secuenciaAtaque()
}

function ataqueAleatorioEnemigo() {
    let ataqueAleatorio = aleatorio(0, ataquesMokeponEnemigo.length - 1)
    
    if (ataqueAleatorio == 0 || ataqueAleatorio == 1) {
        ataqueEnemigo.push('FUEGO')
    } else if (ataqueAleatorio == 1 || ataqueAleatorio == 4) {
        ataqueEnemigo.push('AGUA')
    } else {
        ataqueEnemigo.push('TIERRA')
    }
    console.log(ataqueEnemigo)
    iniciarPelea()
}

function iniciarPelea(){
    if(ataqueJugador.length === 5){
        combate()
    }
}

function indexAmbosOponentes(jugador,enemigo){
     indexAtaqueJugador = ataqueJugador[jugador]
     indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}

function combate() { 
    
    for (let index = 0; index < ataqueJugador.length; index++) {
        if(ataqueJugador[index] === ataqueEnemigo[index]){
            indexAmbosOponentes(index,index)
            crearMensaje("Empate!")
        }else if(ataqueJugador[index] === 'FUEGO' && ataqueEnemigo[index] === 'TIERRA') {
            indexAmbosOponentes(index,index)
            crearMensaje("GANASTE")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        } else if(ataqueJugador[index] === 'AGUA' && ataqueEnemigo[index] === 'FUEGO') {
            indexAmbosOponentes(index,index)
            crearMensaje("GANASTE")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        } else if(ataqueJugador[index] === 'TIERRA' && ataqueEnemigo[index] === 'AGUA') {
            indexAmbosOponentes(index,index)
            crearMensaje("GANASTE")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        } else {
            indexAmbosOponentes(index,index)
            crearMensaje("PERDISTE")
            victoriasEnemigo++
            spanVidasEnemigo.innerHTML = victoriasEnemigo
        }
        
    }
    revisarVidas()
}

function revisarVidas(){
    if(victoriasJugador == victoriasEnemigo){
        crearMensajeFinal('Esto fue un empate!🎉')
    }else if (victoriasJugador > victoriasEnemigo){
        crearMensajeFinal('Felicitaciones Ganaste!🎉')
    }else{  
        crearMensajeFinal('Lo sentimos Perdiste 🥴!')
    }
}


function crearMensaje(resultado) {
    let nuevoAtaqueDelJugador = document.createElement('p');
    let nuevoAtaqueDelEnemigo = document.createElement('p');

    sectionMensajes.innerHTML = resultado
    nuevoAtaqueDelJugador.innerHTML = ataqueJugador
    nuevoAtaqueDelEnemigo.innerHTML = ataqueEnemigo 

    ataquesDelJugador.appendChild(nuevoAtaqueDelJugador);
    ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo);
}

function crearMensajeFinal(resultadoFinal){

    sectionMensajes.innerHTML=resultadoFinal

    sectionReiniciar.style.display='block'
}

function reiniciarJuego(){
    location.reload()
}

function aleatorio(min,max){
    return Math.floor(Math.random()*(max - min + 1) + min)
}

function pintarCanvas(){

    mascotaDeJugadorObjeto.x = mascotaDeJugadorObjeto.x + mascotaDeJugadorObjeto.velocidadX
    mascotaDeJugadorObjeto.y = mascotaDeJugadorObjeto.y + mascotaDeJugadorObjeto.velocidadY
    lienzo.clearRect(0, 0, mapa.width, mapa.height)
    lienzo.drawImage(
        mapaBackgraund,
        0,
        0,
        mapa.width,
        mapa.height
    )
    lienzo.drawImage(
        mascotaDeJugadorObjeto.mapaFoto,
        mascotaDeJugadorObjeto.x,
        mascotaDeJugadorObjeto.y,
        mascotaDeJugadorObjeto.ancho,
        mascotaDeJugadorObjeto.alto
    )
}



// un boton en html puede llamar directamente una funcion en javascript
function moverDerecha(){
    mascotaDeJugadorObjeto.velocidadX = 5
}

function moverIzquierda(){
    mascotaDeJugadorObjeto.velocidadX = -5
}

function moverArriba(){
    mascotaDeJugadorObjeto.velocidadY = -5
}

function moverAbajo(){
    mascotaDeJugadorObjeto.velocidadY = 5
}

function detenerMovimiento(){
    mascotaDeJugadorObjeto.velocidadX = 0
    mascotaDeJugadorObjeto.velocidadY = 0
}


function sePresionoUnaTecla(event){
    switch(event.key){
        case 'ArrowUp':
            moverArriba()
            break
        case 'ArrowLeft':
            moverIzquierda()
            break
        case 'ArrowRight':
            moverDerecha()
            break
        case 'ArrowDown':
            moverAbajo()
            break

         default:
            break
    }
}

function iniciarMapa(){
    mapa.width = 400
    mapa.height = 300
    mascotaDeJugadorObjeto = obtenerObjetoMascota()
    console.log(mascotaDeJugadorObjeto,mascotaJugador);
    intervalo = setInterval(pintarCanvas(), 50)

    window.addEventListener('keydown',sePresionoUnaTecla)
    window.addEventListener('keyup',detenerMovimiento)
}

function obtenerObjetoMascota(){
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador == mokepones[i].nombre){
            return mokepones[i]
        }
    }
}

window.addEventListener('load', iniciarJuego)